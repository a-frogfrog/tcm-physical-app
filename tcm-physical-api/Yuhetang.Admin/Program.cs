using IGeekFan.AspNetCore.Knife4jUI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Text;
using Yuhetang.Repository.Instance;
using Yuhetang.Repository.Interface;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;
using Yuhetang.Infrastructure.EFCore.MySql;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://*:5000"); //ָ�����ж˿� ��������������

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ������������
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// ��������...
builder.Services.AddControllers();
builder.Services.AddMemoryCache(); // ����ڴ滺��

builder.Services.AddScoped(typeof(I_MySql_Repository<>), typeof(MySql_Repository<>));//Ĭ�ϲִ�ע��                                                         
builder.Services.AddScoped<DbContext, yuhetangContext>();//���ݿ�ע��
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();//��ȡIPע��

builder.Services.AddScoped(Assembly.Load("Yuhetang.Service.Interface"),
    Assembly.Load("Yuhetang.Service.Instance"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Infrastructure.Redis"),
    Assembly.Load("Yuhetang.Infrastructure.Redis"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Service.EFCore"),
    Assembly.Load("Yuhetang.Service.EFCore"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Infrastructure.IOC"),
    Assembly.Load("Yuhetang.Infrastructure.IOC"));

var provider = builder.Services.BuildServiceProvider();//�ֶ�ע��

#region ���ݿ�����
builder.Services.AddDbContextPool<yuhetangContext>
    (options =>
    {
        options.UseMySQL(builder.Configuration.GetConnectionString("Default"), provider =>
        {
            provider.CommandTimeout(20);
        });
        options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    }, poolSize: 64);
#endregion

#region JWT Auth
string jwtKey = builder.Configuration["JWT:issuer"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuer = true,//�Ƿ���֤Issuer
         ValidateAudience = true,//�Ƿ���֤Audience
         ValidateLifetime = true,//�Ƿ���֤ʧЧʱ��
         ValidateIssuerSigningKey = true,//�Ƿ���֤SecurityKey
         ValidAudience = jwtKey,//Audience
         ValidIssuer = jwtKey,//Issuer��������ͺ���ǩ��jwt������һ��
         ClockSkew = TimeSpan.FromSeconds(60),
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecurityKey"]))//�õ�SecurityKey
     };
     options.Events = new JwtBearerEvents
     {
         OnMessageReceived = context =>
         {
             string url = context.Request.Path;
             if (url.ToLower() == "/api/Logins/Check_Login" || url.ToLower() == "/api/Logins/Customer_Check_Login")
             {
                 if (!StringValues.IsNullOrEmpty(context.Request.Headers["Authorization"]))
                 {
                     try
                     {
                         var startLength = "Bearer ".Length;
                         var tokenStr = context.Request.Headers["Authorization"].ToString();
                         var token = new JwtSecurityTokenHandler().ReadJwtToken(tokenStr.Substring(startLength, tokenStr.Length - startLength));
                         string code = token.Claims.First(o => o.Type == System.Security.Claims.ClaimTypes.Name).Value;
                         string account = token.Claims.First(o => o.Type == System.Security.Claims.ClaimTypes.Actor).Value;

                         var _loginService = provider.GetService<I_Logins_Service>();
                         if (_loginService!.Check_Login(code, account) == null)
                         {
                             context.Request.Headers["Authorization"] = string.Empty;
                         }
                     }
                     catch (System.Exception ex)
                     {
                         context.Request.Headers["Authorization"] = string.Empty;
                     }
                 }
             }
             return Task.CompletedTask;
         }
     };
 });
#endregion

#region Cors��������
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllRequests", policy =>
    {
        policy.AllowAnyOrigin()    // ����������Դ
            .AllowAnyMethod()    // ��������HTTP����
            .AllowAnyHeader();   // ������������ͷ
    });
});
#endregion

#region Swagger
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo()
    {
        Title = "������.Api",
        Version = "v1.0",
        Description = "������.�ӿ��ĵ�",
        Contact = new OpenApiContact
        {
            Name = "XiongYu.Did",
        }
    });

    string basePath = Path.GetDirectoryName(typeof(Program).Assembly.Location)!;
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "Yuhetang.Admin.xml"), true);
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "Yuhetang.Infrastructure.Dto.xml"), true);
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";


    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT��Ȩ(���ݽ�������ͷ�н��д���) ֱ�����¿�������Bearer {token}��ע������֮����һ���ո�",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference()
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            }, Array.Empty<string>()
        }
    });
});
#endregion
var app = builder.Build();

app.UseStaticFiles();

//������� UploadFiles �ļ���
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(
       Path.Combine(Directory.GetCurrentDirectory(), @"Yuhetang")), //���ڶ�λ��Դ���ļ�ϵͳ
    RequestPath = new PathString("/DaShuaiBi.XY") //����·��
});

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllRequests");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseKnife4UI(d =>
{
    d.RoutePrefix = String.Empty;
    d.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
});

app.Run();
