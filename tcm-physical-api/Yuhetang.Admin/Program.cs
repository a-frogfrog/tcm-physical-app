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

builder.WebHost.UseUrls("http://*:5000"); //指定运行端口 并允许外网访问

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 配置邮箱设置
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// 其他服务...
builder.Services.AddControllers();
builder.Services.AddMemoryCache(); // 添加内存缓存

builder.Services.AddScoped(typeof(I_MySql_Repository<>), typeof(MySql_Repository<>));//默认仓储注入                                                         
builder.Services.AddScoped<DbContext, yuhetangContext>();//数据库注入
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();//获取IP注入

builder.Services.AddScoped(Assembly.Load("Yuhetang.Service.Interface"),
    Assembly.Load("Yuhetang.Service.Instance"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Infrastructure.Redis"),
    Assembly.Load("Yuhetang.Infrastructure.Redis"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Service.EFCore"),
    Assembly.Load("Yuhetang.Service.EFCore"));
builder.Services.AddScoped(Assembly.Load("Yuhetang.Infrastructure.IOC"),
    Assembly.Load("Yuhetang.Infrastructure.IOC"));

var provider = builder.Services.BuildServiceProvider();//手动注入

#region 数据库配置
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
         ValidateIssuer = true,//是否验证Issuer
         ValidateAudience = true,//是否验证Audience
         ValidateLifetime = true,//是否验证失效时间
         ValidateIssuerSigningKey = true,//是否验证SecurityKey
         ValidAudience = jwtKey,//Audience
         ValidIssuer = jwtKey,//Issuer，这两项和后面签发jwt的设置一致
         ClockSkew = TimeSpan.FromSeconds(60),
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecurityKey"]))//拿到SecurityKey
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

#region Cors跨域配置
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllRequests", policy =>
    {
        policy.AllowAnyOrigin()    // 允许所有来源
            .AllowAnyMethod()    // 允许所有HTTP方法
            .AllowAnyHeader();   // 允许所有请求头
    });
});
#endregion

#region Swagger
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo()
    {
        Title = "御和堂.Api",
        Version = "v1.0",
        Description = "御和堂.接口文档",
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
        Description = "JWT授权(数据将在请求头中进行传输) 直接在下框中输入Bearer {token}（注意两者之间是一个空格）",
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

//允许访问 UploadFiles 文件夹
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(
       Path.Combine(Directory.GetCurrentDirectory(), @"Yuhetang")), //用于定位资源的文件系统
    RequestPath = new PathString("/DaShuaiBi.XY") //虚拟路径
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
