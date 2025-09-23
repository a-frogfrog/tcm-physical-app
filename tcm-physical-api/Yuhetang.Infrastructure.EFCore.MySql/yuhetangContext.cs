using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    public partial class yuhetangContext : DbContext
    {
        public yuhetangContext()
        {
        }

        public yuhetangContext(DbContextOptions<yuhetangContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Appointment> Appointments { get; set; } = null!;
        public virtual DbSet<Article> Articles { get; set; } = null!;
        public virtual DbSet<Custom> Customs { get; set; } = null!;
        public virtual DbSet<CustomFollow> CustomFollows { get; set; } = null!;
        public virtual DbSet<CustomerVipCpsCommission> CustomerVipCpsCommissions { get; set; } = null!;
        public virtual DbSet<CustomerVipRecord> CustomerVipRecords { get; set; } = null!;
        public virtual DbSet<CustomsVip> CustomsVips { get; set; } = null!;
        public virtual DbSet<CustomsVipCp> CustomsVipCps { get; set; } = null!;
        public virtual DbSet<MembershipCard> MembershipCards { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderPayment> OrderPayments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductInventory> ProductInventories { get; set; } = null!;
        public virtual DbSet<ProductPackage> ProductPackages { get; set; } = null!;
        public virtual DbSet<ProductPackageDetail> ProductPackageDetails { get; set; } = null!;
        public virtual DbSet<ProductSpec> ProductSpecs { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<SysDepartment> SysDepartments { get; set; } = null!;
        public virtual DbSet<SysDictionary> SysDictionaries { get; set; } = null!;
        public virtual DbSet<SysDuty> SysDuties { get; set; } = null!;
        public virtual DbSet<SysEmployee> SysEmployees { get; set; } = null!;
        public virtual DbSet<SysEmployeeSchedule> SysEmployeeSchedules { get; set; } = null!;
        public virtual DbSet<SysLoginLog> SysLoginLogs { get; set; } = null!;
        public virtual DbSet<SysPeriodDay> SysPeriodDays { get; set; } = null!;
        public virtual DbSet<SysPeriodSchedule> SysPeriodSchedules { get; set; } = null!;
        public virtual DbSet<SysScheduleCycle> SysScheduleCycles { get; set; } = null!;
        public virtual DbSet<SysShift> SysShifts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=8.134.187.124;database=yuhetang;user=root;password=Wsx0628.", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.43-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.AId)
                    .HasName("PRIMARY");

                entity.ToTable("appointment");

                entity.HasComment("预约信息表");

                entity.HasIndex(e => e.AcId, "FK_booking_customer");

                entity.HasIndex(e => e.AeId, "FK_booking_employee");

                entity.HasIndex(e => e.ApId, "FK_booking_package");

                entity.HasIndex(e => e.ArId, "FK_booking_room");

                entity.Property(e => e.AId)
                    .HasMaxLength(32)
                    .HasColumnName("A_id")
                    .HasComment("预约ID");

                entity.Property(e => e.AcId)
                    .HasMaxLength(32)
                    .HasColumnName("Ac_id")
                    .HasComment("客户ID");

                entity.Property(e => e.AeId)
                    .HasMaxLength(32)
                    .HasColumnName("Ae_id")
                    .HasComment("员工ID");

                entity.Property(e => e.ApId)
                    .HasMaxLength(32)
                    .HasColumnName("Ap_id")
                    .HasComment("产品ID");

                entity.Property(e => e.AppId)
                    .HasMaxLength(32)
                    .HasColumnName("App_id")
                    .HasComment("套餐ID");

                entity.Property(e => e.ArId)
                    .HasColumnName("Ar_id")
                    .HasComment("房间ID");

                entity.Property(e => e.BookingEndTime)
                    .HasColumnType("datetime")
                    .HasColumnName("booking_end_time")
                    .HasComment("预约结束时间");

                entity.Property(e => e.BookingStartTime)
                    .HasColumnType("datetime")
                    .HasColumnName("booking_start_time")
                    .HasComment("预约开始时间");

                entity.Property(e => e.BookingStatus)
                    .HasColumnName("booking_status")
                    .HasDefaultValueSql("'0'")
                    .HasComment("预约状态：0-待确认，1-已确认，2-已取消，3-已完成");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("create_time")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.Remark)
                    .HasMaxLength(255)
                    .HasColumnName("remark")
                    .HasComment("备注");

                entity.HasOne(d => d.Ac)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.AcId)
                    .HasConstraintName("FK_booking_customer");

                entity.HasOne(d => d.Ae)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.AeId)
                    .HasConstraintName("FK_booking_employee");

                entity.HasOne(d => d.Ap)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.ApId)
                    .HasConstraintName("FK_booking_package");

                entity.HasOne(d => d.Ar)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.ArId)
                    .HasConstraintName("FK_booking_room");
            });

            modelBuilder.Entity<Article>(entity =>
            {
                entity.ToTable("articles");

                entity.Property(e => e.Id)
                    .HasMaxLength(32)
                    .HasColumnName("id")
                    .HasComment("文章ID");

                entity.Property(e => e.Content)
                    .HasColumnType("text")
                    .HasColumnName("content")
                    .HasComment("内容");

                entity.Property(e => e.CreatedTime)
                    .HasColumnType("datetime")
                    .HasColumnName("created_time")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title")
                    .HasComment("标题");

                entity.Property(e => e.Visitors)
                    .HasColumnName("visitors")
                    .HasComment("浏览人数");
            });

            modelBuilder.Entity<Custom>(entity =>
            {
                entity.HasKey(e => e.CId)
                    .HasName("PRIMARY");

                entity.ToTable("customs");

                entity.HasComment("客户信息表");

                entity.HasIndex(e => e.CId, "C_ID");

                entity.HasIndex(e => e.CPhone, "C_Phone")
                    .IsUnique();

                entity.Property(e => e.CId)
                    .HasMaxLength(32)
                    .HasColumnName("C_ID")
                    .HasComment("客户ID");

                entity.Property(e => e.CAge)
                    .HasColumnName("C_Age")
                    .HasComment("年龄");

                entity.Property(e => e.CConsumptionTime)
                    .HasColumnType("datetime")
                    .HasColumnName("C_ConsumptionTime‌")
                    .HasComment("近期消费时间");

                entity.Property(e => e.CCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("C_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CEmail)
                    .HasMaxLength(255)
                    .HasColumnName("C_Email")
                    .HasComment("客户邮箱");

                entity.Property(e => e.CGender)
                    .HasColumnName("C_Gender")
                    .HasComment("性别：0-女，1-男");

                entity.Property(e => e.CName)
                    .HasMaxLength(50)
                    .HasColumnName("C_Name")
                    .HasComment("客户姓名");

                entity.Property(e => e.CPhone)
                    .HasMaxLength(20)
                    .HasColumnName("C_Phone")
                    .HasComment("手机号码");

                entity.Property(e => e.CResource)
                    .HasColumnName("C_Resource")
                    .HasComment("客户来源：1-广告，2-介绍，3-自行上门");

                entity.Property(e => e.CStatus)
                    .HasColumnName("C_Status")
                    .HasComment("0-禁用,1-启动");

                entity.Property(e => e.CTotalSpending)
                    .HasColumnName("C_TotalSpending")
                    .HasComment("累计消费");

                entity.Property(e => e.CUserName)
                    .HasMaxLength(255)
                    .HasColumnName("C_UserName")
                    .HasComment("客户用户名");

                entity.Property(e => e.CvcCode)
                    .HasMaxLength(255)
                    .HasColumnName("CVC_Code")
                    .HasComment("推广码");

                entity.Property(e => e.CvcVipid)
                    .HasMaxLength(32)
                    .HasColumnName("CVC_VIPID")
                    .HasComment("推广人id");

                entity.Property(e => e.IsConvert)
                    .HasColumnName("Is_Convert")
                    .HasComment("是否转换：0-未转换，1-已转换");
            });

            modelBuilder.Entity<CustomFollow>(entity =>
            {
                entity.HasKey(e => e.CfId)
                    .HasName("PRIMARY");

                entity.ToTable("custom_follow");

                entity.HasComment("客户跟进记录表");

                entity.HasIndex(e => e.CfCustomerId, "CF_CustomerID");

                entity.Property(e => e.CfId)
                    .HasMaxLength(32)
                    .HasColumnName("CF_ID")
                    .HasComment("跟进记录ID");

                entity.Property(e => e.CfContent)
                    .HasColumnType("text")
                    .HasColumnName("CF_Content")
                    .HasComment("跟进内容");

                entity.Property(e => e.CfCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CF_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CfCustomerId)
                    .HasMaxLength(32)
                    .HasColumnName("CF_CustomerID")
                    .HasComment("客户ID");

                entity.Property(e => e.CfNextTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CF_NextTime")
                    .HasComment("下次跟进时间");

                entity.Property(e => e.CfOperator)
                    .HasMaxLength(32)
                    .HasColumnName("CF_Operator")
                    .HasComment("跟进人");

                entity.Property(e => e.CfType)
                    .HasColumnName("CF_Type")
                    .HasComment("跟进类型：1-电话，2-微信，3-面谈");

                entity.HasOne(d => d.CfCustomer)
                    .WithMany(p => p.CustomFollows)
                    .HasForeignKey(d => d.CfCustomerId)
                    .HasConstraintName("custom_follow_ibfk_1");
            });

            modelBuilder.Entity<CustomerVipCpsCommission>(entity =>
            {
                entity.HasKey(e => e.CvccId)
                    .HasName("PRIMARY");

                entity.ToTable("customer_vip_cps_commission");

                entity.HasComment("推广佣金记录表");

                entity.HasIndex(e => e.CvccCpsid, "CVCC_CPSID");

                entity.HasIndex(e => e.CvccNewVipid, "CVCC_NewVIPID");

                entity.Property(e => e.CvccId)
                    .HasMaxLength(32)
                    .HasColumnName("CVCC_ID")
                    .HasComment("佣金记录ID");

                entity.Property(e => e.CvccAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("CVCC_Amount")
                    .HasComment("佣金金额");

                entity.Property(e => e.CvccCpsid)
                    .HasMaxLength(32)
                    .HasColumnName("CVCC_CPSID")
                    .HasComment("推广链接ID");

                entity.Property(e => e.CvccCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CVCC_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CvccNewVipid)
                    .HasMaxLength(32)
                    .HasColumnName("CVCC_NewVIPID")
                    .HasComment("新注册VIP ID");

                entity.Property(e => e.CvccSettleTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CVCC_SettleTime")
                    .HasComment("结算时间");

                entity.Property(e => e.CvccStatus)
                    .HasColumnName("CVCC_Status")
                    .HasDefaultValueSql("'0'")
                    .HasComment("状态：0-未结算，1-已结算");

                entity.Property(e => e.CvccVipid)
                    .HasMaxLength(32)
                    .HasColumnName("CVCC_VIPID")
                    .HasComment("VIPid");

                entity.HasOne(d => d.CvccCps)
                    .WithMany(p => p.CustomerVipCpsCommissions)
                    .HasForeignKey(d => d.CvccCpsid)
                    .HasConstraintName("customer_vip_cps_commission_ibfk_1");

                entity.HasOne(d => d.CvccNewVip)
                    .WithMany(p => p.CustomerVipCpsCommissions)
                    .HasForeignKey(d => d.CvccNewVipid)
                    .HasConstraintName("customer_vip_cps_commission_ibfk_2");
            });

            modelBuilder.Entity<CustomerVipRecord>(entity =>
            {
                entity.HasKey(e => e.CvrId)
                    .HasName("PRIMARY");

                entity.ToTable("customer_vip_record");

                entity.HasComment("VIP行为记录表");

                entity.HasIndex(e => e.CvrVipid, "CVR_VIPID");

                entity.Property(e => e.CvrId)
                    .HasMaxLength(32)
                    .HasColumnName("CVR_ID")
                    .HasComment("行为记录ID");

                entity.Property(e => e.CvrAfterBalance)
                    .HasPrecision(10, 2)
                    .HasColumnName("CVR_AfterBalance")
                    .HasComment("操作后余额");

                entity.Property(e => e.CvrAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("CVR_Amount")
                    .HasComment("金额");

                entity.Property(e => e.CvrBeforeBalance)
                    .HasPrecision(10, 2)
                    .HasColumnName("CVR_BeforeBalance")
                    .HasComment("操作前余额");

                entity.Property(e => e.CvrCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CVR_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CvrDescription)
                    .HasMaxLength(200)
                    .HasColumnName("CVR_Description")
                    .HasComment("描述");

                entity.Property(e => e.CvrOperator)
                    .HasMaxLength(32)
                    .HasColumnName("CVR_Operator")
                    .HasComment("操作人");

                entity.Property(e => e.CvrOrderId)
                    .HasMaxLength(100)
                    .HasColumnName("CVR_OrderID")
                    .HasComment("关联订单ID");

                entity.Property(e => e.CvrSatus)
                    .HasColumnName("CVR_Satus")
                    .HasComment("0=冻结 1=可提现 2=已提现 3=退回");

                entity.Property(e => e.CvrType)
                    .HasColumnName("CVR_Type")
                    .HasComment("行为类型：1-推广奖励，2-佣金");

                entity.Property(e => e.CvrVipid)
                    .HasMaxLength(32)
                    .HasColumnName("CVR_VIPID")
                    .HasComment("VIP ID");

                entity.HasOne(d => d.CvrVip)
                    .WithMany(p => p.CustomerVipRecords)
                    .HasForeignKey(d => d.CvrVipid)
                    .HasConstraintName("customer_vip_record_ibfk_1");
            });

            modelBuilder.Entity<CustomsVip>(entity =>
            {
                entity.HasKey(e => e.CvId)
                    .HasName("PRIMARY");

                entity.ToTable("customs_vip");

                entity.HasComment("VIP会员信息表");

                entity.HasIndex(e => e.CvCustomerId, "CV_CustomerID")
                    .IsUnique();

                entity.Property(e => e.CvId)
                    .HasMaxLength(32)
                    .HasColumnName("CV_ID")
                    .HasComment("VIPID");

                entity.Property(e => e.CvBalance)
                    .HasPrecision(10, 2)
                    .HasColumnName("CV_Balance")
                    .HasDefaultValueSql("'0.00'")
                    .HasComment("账户余额");

                entity.Property(e => e.CvCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CV_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CvCustomerId)
                    .HasMaxLength(32)
                    .HasColumnName("CV_CustomerID")
                    .HasComment("客户ID");

                entity.Property(e => e.CvLevel)
                    .HasColumnName("CV_Level")
                    .HasDefaultValueSql("'1'")
                    .HasComment("VIP等级");

                entity.Property(e => e.CvStatus)
                    .HasColumnName("CV_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-冻结，1-正常");

                entity.Property(e => e.CvTotalConsume)
                    .HasPrecision(10, 2)
                    .HasColumnName("CV_TotalConsume")
                    .HasDefaultValueSql("'0.00'")
                    .HasComment("累计消费金额");

                entity.Property(e => e.CvTotalRecharge)
                    .HasPrecision(10, 2)
                    .HasColumnName("CV_TotalRecharge")
                    .HasDefaultValueSql("'0.00'")
                    .HasComment("累计充值金额");

                entity.Property(e => e.CvUpdateTime)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("CV_UpdateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("最后更新时间");

                entity.HasOne(d => d.CvCustomer)
                    .WithOne(p => p.CustomsVip)
                    .HasForeignKey<CustomsVip>(d => d.CvCustomerId)
                    .HasConstraintName("customs_vip_ibfk_1");
            });

            modelBuilder.Entity<CustomsVipCp>(entity =>
            {
                entity.HasKey(e => e.CvcId)
                    .HasName("PRIMARY");

                entity.ToTable("customs_vip_cps");

                entity.HasComment("VIP推广链接表");

                entity.HasIndex(e => e.CvcVipid, "CVC_VIPID");

                entity.Property(e => e.CvcId)
                    .HasMaxLength(32)
                    .HasColumnName("CVC_ID")
                    .HasComment("推广链接ID");

                entity.Property(e => e.CvcCode)
                    .HasMaxLength(255)
                    .HasColumnName("CVC_Code")
                    .HasComment("推广码");

                entity.Property(e => e.CvcCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("CVC_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.CvcLongUrl)
                    .HasMaxLength(200)
                    .HasColumnName("CVC_LongUrl")
                    .HasComment("推广长链接URL");

                entity.Property(e => e.CvcShortUrl)
                    .HasMaxLength(255)
                    .HasColumnName("CVC_ShortUrl")
                    .HasComment("推广短链接URL");

                entity.Property(e => e.CvcStatus)
                    .HasColumnName("CVC_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-停用，1-启用");

                entity.Property(e => e.CvcVipid)
                    .HasMaxLength(32)
                    .HasColumnName("CVC_VIPID")
                    .HasComment("VIP ID");
            });

            modelBuilder.Entity<MembershipCard>(entity =>
            {
                entity.HasKey(e => e.CardId)
                    .HasName("PRIMARY");

                entity.ToTable("membership_card");

                entity.HasComment("会员卡表");

                entity.HasIndex(e => e.CId, "C_ID");

                entity.Property(e => e.CardId)
                    .HasMaxLength(32)
                    .HasColumnName("Card_ID")
                    .HasComment("会员卡ID");

                entity.Property(e => e.Balance)
                    .HasPrecision(10, 2)
                    .HasComment("余额");

                entity.Property(e => e.CId)
                    .HasMaxLength(32)
                    .HasColumnName("C_ID")
                    .HasComment("客户ID");

                entity.Property(e => e.CardStatus)
                    .HasColumnName("Card_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("会员卡状态: 0-无效, 1-有效");

                entity.Property(e => e.CreatedTime)
                    .HasColumnType("datetime")
                    .HasComment("会员卡创建时间");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasComment("支付密码(加密存储)");

                entity.Property(e => e.Salt)
                    .HasMaxLength(255)
                    .HasComment("盐值");

                entity.HasOne(d => d.CIdNavigation)
                    .WithMany(p => p.MembershipCards)
                    .HasForeignKey(d => d.CId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("membership_card_ibfk_1");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OId)
                    .HasName("PRIMARY");

                entity.ToTable("orders");

                entity.HasComment("订单表");

                entity.HasIndex(e => e.OVip, "O_VIP");

                entity.Property(e => e.OId)
                    .HasMaxLength(100)
                    .HasColumnName("O_ID")
                    .HasComment("订单ID");

                entity.Property(e => e.OAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("O_Amount")
                    .HasComment("订单金额");

                entity.Property(e => e.OCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("O_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.ODiscount)
                    .HasPrecision(10, 2)
                    .HasColumnName("O_Discount")
                    .HasDefaultValueSql("'0.00'")
                    .HasComment("折扣金额");

                entity.Property(e => e.OPayAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("O_PayAmount")
                    .HasComment("实际支付金额");

                entity.Property(e => e.ORemark)
                    .HasMaxLength(200)
                    .HasColumnName("O_Remark")
                    .HasComment("备注");

                entity.Property(e => e.OStatus)
                    .HasColumnName("O_Status")
                    .HasComment("状态：1-待支付，2-已支付，3-已完成，4-已取消");

                entity.Property(e => e.OType)
                    .HasColumnName("O_Type")
                    .HasComment("订单类型：1-商品订单，2-服务订单");

                entity.Property(e => e.OUpdateTime)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("O_UpdateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("最后更新时间");

                entity.Property(e => e.OVip)
                    .HasMaxLength(32)
                    .HasColumnName("O_VIP")
                    .HasComment("VIP ID");

                entity.HasOne(d => d.OVipNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OVip)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("orders_ibfk_1");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OdId)
                    .HasName("PRIMARY");

                entity.ToTable("order_details");

                entity.HasComment("订单详情表");

                entity.HasIndex(e => e.OdOrderId, "OD_OrderID");

                entity.HasIndex(e => e.OdProductId, "OD_ProductID");

                entity.HasIndex(e => e.OdSpecsId, "OD_SpecsID");

                entity.Property(e => e.OdId)
                    .HasMaxLength(32)
                    .HasColumnName("OD_ID")
                    .HasComment("订单明细ID");

                entity.Property(e => e.OdCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("OD_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.OdOrderId)
                    .HasMaxLength(100)
                    .HasColumnName("OD_OrderID")
                    .HasComment("订单ID");

                entity.Property(e => e.OdPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("OD_Price")
                    .HasComment("单价");

                entity.Property(e => e.OdProductId)
                    .HasMaxLength(32)
                    .HasColumnName("OD_ProductID")
                    .HasComment("产品ID");

                entity.Property(e => e.OdQuantity)
                    .HasColumnName("OD_Quantity")
                    .HasComment("数量");

                entity.Property(e => e.OdSpecsId)
                    .HasMaxLength(32)
                    .HasColumnName("OD_SpecsID")
                    .HasComment("规格ID");

                entity.Property(e => e.OdTotalAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("OD_TotalAmount")
                    .HasComment("总金额");

                entity.HasOne(d => d.OdOrder)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OdOrderId)
                    .HasConstraintName("order_details_ibfk_1");

                entity.HasOne(d => d.OdProduct)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OdProductId)
                    .HasConstraintName("order_details_ibfk_2");

                entity.HasOne(d => d.OdSpecs)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OdSpecsId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("order_details_ibfk_3");
            });

            modelBuilder.Entity<OrderPayment>(entity =>
            {
                entity.HasKey(e => e.OpId)
                    .HasName("PRIMARY");

                entity.ToTable("order_payment");

                entity.HasComment("支付记录表");

                entity.HasIndex(e => e.OpOrderId, "OP_OrderID");

                entity.Property(e => e.OpId)
                    .HasMaxLength(32)
                    .HasColumnName("OP_ID")
                    .HasComment("支付记录ID");

                entity.Property(e => e.OpAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("OP_Amount")
                    .HasComment("支付金额");

                entity.Property(e => e.OpCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("OP_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.OpOrderId)
                    .HasMaxLength(100)
                    .HasColumnName("OP_OrderID")
                    .HasComment("订单ID");

                entity.Property(e => e.OpPayTime)
                    .HasColumnType("datetime")
                    .HasColumnName("OP_PayTime")
                    .HasComment("支付时间");

                entity.Property(e => e.OpStatus)
                    .HasColumnName("OP_Status")
                    .HasComment("支付状态：1-支付中，2-支付成功，3-支付失败");

                entity.Property(e => e.OpTransactionNo)
                    .HasMaxLength(100)
                    .HasColumnName("OP_TransactionNo")
                    .HasComment("交易流水号");

                entity.Property(e => e.OpType)
                    .HasColumnName("OP_Type")
                    .HasComment("支付方式：1-现金，2-微信，3-支付宝，4-银行卡");

                entity.HasOne(d => d.OpOrder)
                    .WithMany(p => p.OrderPayments)
                    .HasForeignKey(d => d.OpOrderId)
                    .HasConstraintName("order_payment_ibfk_1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.PId)
                    .HasName("PRIMARY");

                entity.ToTable("product");

                entity.HasComment("产品信息表");

                entity.Property(e => e.PId)
                    .HasMaxLength(32)
                    .HasColumnName("P_ID")
                    .HasComment("产品ID");

                entity.Property(e => e.PCategory)
                    .HasMaxLength(32)
                    .HasColumnName("P_Category")
                    .HasComment("产品分类ID");

                entity.Property(e => e.PCostPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("P_CostPrice")
                    .HasComment("产品成本价");

                entity.Property(e => e.PCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("P_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.PDescription)
                    .HasColumnType("text")
                    .HasColumnName("P_Description")
                    .HasComment("产品描述");

                entity.Property(e => e.PName)
                    .HasMaxLength(100)
                    .HasColumnName("P_Name")
                    .HasComment("产品名称");

                entity.Property(e => e.PPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("P_Price")
                    .HasComment("产品价格");

                entity.Property(e => e.PStatus)
                    .HasColumnName("P_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-下架，1-上架");

                entity.Property(e => e.PType)
                    .HasColumnName("P_Type")
                    .HasComment("产品类型：1-实物，2-服务");

                entity.Property(e => e.PUpdateTime)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("P_UpdateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("最后更新时间");
            });

            modelBuilder.Entity<ProductInventory>(entity =>
            {
                entity.HasKey(e => e.PiId)
                    .HasName("PRIMARY");

                entity.ToTable("product_inventory");

                entity.HasComment("库存记录表");

                entity.HasIndex(e => e.PiProductId, "PI_ProductID");

                entity.HasIndex(e => e.PiSpecsId, "PI_SpecsID");

                entity.Property(e => e.PiId)
                    .HasMaxLength(32)
                    .HasColumnName("PI_ID")
                    .HasComment("库存记录ID");

                entity.Property(e => e.PiAfterStock)
                    .HasColumnName("PI_AfterStock")
                    .HasComment("变更后库存");

                entity.Property(e => e.PiBeforeStock)
                    .HasColumnName("PI_BeforeStock")
                    .HasComment("变更前库存");

                entity.Property(e => e.PiCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("PI_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.PiOperator)
                    .HasMaxLength(32)
                    .HasColumnName("PI_Operator")
                    .HasComment("操作人");

                entity.Property(e => e.PiProductId)
                    .HasMaxLength(32)
                    .HasColumnName("PI_ProductID")
                    .HasComment("产品ID");

                entity.Property(e => e.PiQuantity)
                    .HasColumnName("PI_Quantity")
                    .HasComment("变动数量");

                entity.Property(e => e.PiReason)
                    .HasMaxLength(200)
                    .HasColumnName("PI_Reason")
                    .HasComment("变动原因");

                entity.Property(e => e.PiSpecsId)
                    .HasMaxLength(32)
                    .HasColumnName("PI_SpecsID")
                    .HasComment("规格ID");

                entity.Property(e => e.PiType)
                    .HasColumnName("PI_Type")
                    .HasComment("变动类型：1-入库，2-出库，3-调整");

                entity.HasOne(d => d.PiProduct)
                    .WithMany(p => p.ProductInventories)
                    .HasForeignKey(d => d.PiProductId)
                    .HasConstraintName("product_inventory_ibfk_1");

                entity.HasOne(d => d.PiSpecs)
                    .WithMany(p => p.ProductInventories)
                    .HasForeignKey(d => d.PiSpecsId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("product_inventory_ibfk_2");
            });

            modelBuilder.Entity<ProductPackage>(entity =>
            {
                entity.HasKey(e => e.PpId)
                    .HasName("PRIMARY");

                entity.ToTable("product_package");

                entity.HasComment("产品套餐表");

                entity.Property(e => e.PpId)
                    .HasMaxLength(32)
                    .HasColumnName("PP_ID")
                    .HasComment("套餐ID");

                entity.Property(e => e.PpCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("PP_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.PpDescription)
                    .HasColumnType("text")
                    .HasColumnName("PP_Description")
                    .HasComment("套餐描述");

                entity.Property(e => e.PpDiscount)
                    .HasPrecision(5, 2)
                    .HasColumnName("PP_Discount")
                    .HasComment("折扣率");

                entity.Property(e => e.PpName)
                    .HasMaxLength(100)
                    .HasColumnName("PP_Name")
                    .HasComment("套餐名称");

                entity.Property(e => e.PpPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("PP_Price")
                    .HasComment("套餐价格");

                entity.Property(e => e.PpStatus)
                    .HasColumnName("PP_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-下架，1-上架");
            });

            modelBuilder.Entity<ProductPackageDetail>(entity =>
            {
                entity.HasKey(e => e.PpdId)
                    .HasName("PRIMARY");

                entity.ToTable("product_package_details");

                entity.HasComment("套餐明细表");

                entity.HasIndex(e => e.PpdPackageId, "PPD_PackageID");

                entity.HasIndex(e => e.PpdProductId, "PPD_ProductID");

                entity.Property(e => e.PpdId)
                    .HasMaxLength(32)
                    .HasColumnName("PPD_ID")
                    .HasComment("套餐明细ID");

                entity.Property(e => e.PpdCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("PPD_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.PpdPackageId)
                    .HasMaxLength(32)
                    .HasColumnName("PPD_PackageID")
                    .HasComment("套餐ID");

                entity.Property(e => e.PpdPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("PPD_Price")
                    .HasComment("明细价格");

                entity.Property(e => e.PpdProductId)
                    .HasMaxLength(32)
                    .HasColumnName("PPD_ProductID")
                    .HasComment("产品ID");

                entity.Property(e => e.PpdQuantity)
                    .HasColumnName("PPD_Quantity")
                    .HasDefaultValueSql("'1'")
                    .HasComment("产品数量");

                entity.HasOne(d => d.PpdPackage)
                    .WithMany(p => p.ProductPackageDetails)
                    .HasForeignKey(d => d.PpdPackageId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("product_package_details_ibfk_1");

                entity.HasOne(d => d.PpdProduct)
                    .WithMany(p => p.ProductPackageDetails)
                    .HasForeignKey(d => d.PpdProductId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("product_package_details_ibfk_2");
            });

            modelBuilder.Entity<ProductSpec>(entity =>
            {
                entity.HasKey(e => e.PsId)
                    .HasName("PRIMARY");

                entity.ToTable("product_specs");

                entity.HasComment("产品规格表");

                entity.HasIndex(e => e.PsProductId, "PS_ProductID");

                entity.Property(e => e.PsId)
                    .HasMaxLength(32)
                    .HasColumnName("PS_ID")
                    .HasComment("规格ID");

                entity.Property(e => e.PsCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("PS_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.PsName)
                    .HasMaxLength(100)
                    .HasColumnName("PS_Name")
                    .HasComment("规格名称");

                entity.Property(e => e.PsPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("PS_Price")
                    .HasComment("规格价格");

                entity.Property(e => e.PsProductId)
                    .HasMaxLength(32)
                    .HasColumnName("PS_ProductID")
                    .HasComment("产品ID");

                entity.Property(e => e.PsStatus)
                    .HasColumnName("PS_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-停用，1-启用");

                entity.Property(e => e.PsStock)
                    .HasColumnName("PS_Stock")
                    .HasDefaultValueSql("'0'")
                    .HasComment("库存数量");

                entity.Property(e => e.PsValue)
                    .HasMaxLength(100)
                    .HasColumnName("PS_Value")
                    .HasComment("规格值");

                entity.HasOne(d => d.PsProduct)
                    .WithMany(p => p.ProductSpecs)
                    .HasForeignKey(d => d.PsProductId)
                    .HasConstraintName("product_specs_ibfk_1");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("rooms");

                entity.HasIndex(e => e.RoomNumber, "room_number")
                    .IsUnique();

                entity.Property(e => e.RoomId)
                    .HasColumnName("room_id")
                    .HasComment("房间ID");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("create_time")
                    .HasComment("创建时间");

                entity.Property(e => e.Remark)
                    .HasMaxLength(255)
                    .HasColumnName("remark")
                    .HasComment("备注");

                entity.Property(e => e.RoomName)
                    .HasMaxLength(100)
                    .HasColumnName("room_name")
                    .HasComment("房间名称");

                entity.Property(e => e.RoomNumber)
                    .HasMaxLength(50)
                    .HasColumnName("room_number")
                    .HasComment("房间号");

                entity.Property(e => e.RoomStatus)
                    .HasColumnName("room_status")
                    .HasComment("房间状态:0-可用,1-停用,2-维修");
            });

            modelBuilder.Entity<SysDepartment>(entity =>
            {
                entity.HasKey(e => e.DId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_department");

                entity.HasComment("部门信息表");

                entity.Property(e => e.DId)
                    .HasMaxLength(32)
                    .HasColumnName("D_ID")
                    .HasComment("部门ID");

                entity.Property(e => e.DCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("D_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.DManager)
                    .HasMaxLength(32)
                    .HasColumnName("D_Manager")
                    .HasComment("部门经理员工ID");

                entity.Property(e => e.DName)
                    .HasMaxLength(50)
                    .HasColumnName("D_Name")
                    .HasComment("部门名称");

                entity.Property(e => e.DParentId)
                    .HasMaxLength(32)
                    .HasColumnName("D_ParentID")
                    .HasComment("上级部门ID");

                entity.Property(e => e.DStatus)
                    .HasColumnName("D_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-停用，1-启用");
            });

            modelBuilder.Entity<SysDictionary>(entity =>
            {
                entity.HasKey(e => e.DId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_dictionary");

                entity.HasComment("系统字典表");

                entity.HasIndex(e => new { e.DType, e.DValue }, "uk_type_value")
                    .IsUnique();

                entity.Property(e => e.DId)
                    .HasMaxLength(32)
                    .HasColumnName("D_ID")
                    .HasComment("字典ID");

                entity.Property(e => e.DCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("D_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.DDescription)
                    .HasMaxLength(200)
                    .HasColumnName("D_Description")
                    .HasComment("字典描述");

                entity.Property(e => e.DSort)
                    .HasColumnName("D_Sort")
                    .HasDefaultValueSql("'0'")
                    .HasComment("排序号");

                entity.Property(e => e.DStatus)
                    .HasColumnName("D_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-停用，1-启用");

                entity.Property(e => e.DType)
                    .HasMaxLength(50)
                    .HasColumnName("D_Type")
                    .HasComment("字典类型");

                entity.Property(e => e.DValue)
                    .HasMaxLength(100)
                    .HasColumnName("D_Value")
                    .HasComment("字典值");
            });

            modelBuilder.Entity<SysDuty>(entity =>
            {
                entity.HasKey(e => e.DId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_duty");

                entity.HasComment("岗位信息表");

                entity.Property(e => e.DId)
                    .HasMaxLength(32)
                    .HasColumnName("D_ID")
                    .HasComment("岗位ID");

                entity.Property(e => e.DCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("D_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.DDescription)
                    .HasColumnType("text")
                    .HasColumnName("D_Description")
                    .HasComment("岗位描述");

                entity.Property(e => e.DName)
                    .HasMaxLength(50)
                    .HasColumnName("D_Name")
                    .HasComment("岗位名称");

                entity.Property(e => e.DStatus)
                    .HasColumnName("D_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-停用，1-启用");
            });

            modelBuilder.Entity<SysEmployee>(entity =>
            {
                entity.HasKey(e => e.EId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_employees");

                entity.HasComment("系统员工信息表");

                entity.HasIndex(e => e.EAccount, "E_Account")
                    .IsUnique();

                entity.Property(e => e.EId)
                    .HasMaxLength(32)
                    .HasColumnName("E_ID")
                    .HasComment("员工ID");

                entity.Property(e => e.EAccount)
                    .HasMaxLength(11)
                    .HasColumnName("E_Account")
                    .HasComment("员工登录账号");

                entity.Property(e => e.EAvatar)
                    .HasMaxLength(255)
                    .HasColumnName("E_Avatar")
                    .HasComment("头像url");

                entity.Property(e => e.ECreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("E_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.EDept)
                    .HasMaxLength(32)
                    .HasColumnName("E_Dept")
                    .HasComment("所属部门ID");

                entity.Property(e => e.EDuty)
                    .HasMaxLength(32)
                    .HasColumnName("E_Duty")
                    .HasComment("岗位ID");

                entity.Property(e => e.EEmail)
                    .HasMaxLength(255)
                    .HasColumnName("E_Email")
                    .HasComment("邮箱");

                entity.Property(e => e.EGender)
                    .HasMaxLength(2)
                    .HasColumnName("E_Gender")
                    .HasComment("性别");

                entity.Property(e => e.EIsBan)
                    .HasColumnName("E_IsBan")
                    .HasComment("0-正常,1-禁用,");

                entity.Property(e => e.EName)
                    .HasMaxLength(50)
                    .HasColumnName("E_Name")
                    .HasComment("员工姓名");

                entity.Property(e => e.EPassword)
                    .HasMaxLength(32)
                    .HasColumnName("E_Password")
                    .HasComment("登录密码");

                entity.Property(e => e.EPhone)
                    .HasMaxLength(20)
                    .HasColumnName("E_Phone")
                    .HasComment("联系电话");

                entity.Property(e => e.ESalt)
                    .HasMaxLength(32)
                    .HasColumnName("E_Salt")
                    .HasComment("盐");

                entity.Property(e => e.EStatus)
                    .HasColumnName("E_Status")
                    .HasDefaultValueSql("'1'")
                    .HasComment("状态：0-离职，1-在职");
            });

            modelBuilder.Entity<SysEmployeeSchedule>(entity =>
            {
                entity.HasKey(e => e.SesId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_employee_schedule");

                entity.HasComment("员工排班表");

                entity.Property(e => e.SesId)
                    .HasMaxLength(32)
                    .HasColumnName("SES_ID")
                    .HasComment("排班记录ID");

                entity.Property(e => e.ScId)
                    .HasMaxLength(32)
                    .HasColumnName("SC_ID")
                    .HasComment("规则ID");

                entity.Property(e => e.SesCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SES_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("排班创建时间");

                entity.Property(e => e.SesCreatorId)
                    .HasMaxLength(32)
                    .HasColumnName("SES_CreatorID")
                    .HasComment("排班创建人ID");

                entity.Property(e => e.SesDepartmentId)
                    .HasMaxLength(32)
                    .HasColumnName("SES_DepartmentID")
                    .HasComment("关联部门ID");

                entity.Property(e => e.SesEmployeeId)
                    .HasMaxLength(32)
                    .HasColumnName("SES_EmployeeID")
                    .HasComment("关联员工ID");

                entity.Property(e => e.SesRemark)
                    .HasMaxLength(200)
                    .HasColumnName("SES_Remark")
                    .HasComment("排班备注");

                entity.Property(e => e.SesScheduleDate)
                    .HasColumnType("datetime")
                    .HasColumnName("SES_ScheduleDate")
                    .HasComment("排班日期");

                entity.Property(e => e.SesShiftId)
                    .HasMaxLength(32)
                    .HasColumnName("SES_ShiftID")
                    .HasComment("关联班次ID");

                entity.Property(e => e.SesWeek)
                    .HasMaxLength(255)
                    .HasColumnName("SES_Week")
                    .HasComment("星期几");
            });

            modelBuilder.Entity<SysLoginLog>(entity =>
            {
                entity.HasKey(e => e.Llid)
                    .HasName("PRIMARY");

                entity.ToTable("sys_login_logs");

                entity.HasComment("登录日志表")
                    .UseCollation("utf8mb4_unicode_ci");

                entity.Property(e => e.Llid)
                    .HasMaxLength(32)
                    .HasColumnName("LLId")
                    .HasComment("日志ID");

                entity.Property(e => e.LlEid)
                    .HasMaxLength(32)
                    .HasColumnName("LL_EId")
                    .HasComment("员工ID");

                entity.Property(e => e.LlEname)
                    .HasMaxLength(50)
                    .HasColumnName("LL_EName")
                    .HasComment("员工名");

                entity.Property(e => e.Llbrowser)
                    .HasMaxLength(50)
                    .HasColumnName("LLBrowser")
                    .HasComment("浏览器");

                entity.Property(e => e.Llcode)
                    .HasMaxLength(32)
                    .HasColumnName("LLCode")
                    .HasComment("登录凭据");

                entity.Property(e => e.LlcreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("LLCreate_Time")
                    .HasComment("创建时间");

                entity.Property(e => e.LldeviceType)
                    .HasMaxLength(20)
                    .HasColumnName("LLDevice_Type")
                    .HasComment("设备类型: pc, mobile,tablet");

                entity.Property(e => e.LlfailureReason)
                    .HasMaxLength(200)
                    .HasColumnName("LLFailure_Reason")
                    .HasComment("失败原因");

                entity.Property(e => e.Lllocation)
                    .HasMaxLength(100)
                    .HasColumnName("LLLocation")
                    .HasComment("登录地点");

                entity.Property(e => e.LlloginIp)
                    .HasMaxLength(45)
                    .HasColumnName("LLLogin_Ip")
                    .HasComment("登录IP");

                entity.Property(e => e.LlloginResult)
                    .HasColumnName("LLLogin_Result")
                    .HasComment("登录结果: 1-成功, 0-失败");
            });

            modelBuilder.Entity<SysPeriodDay>(entity =>
            {
                entity.HasKey(e => e.SpdId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_period_day");

                entity.HasComment("周期内天数排班详情表");

                entity.Property(e => e.SpdId)
                    .HasMaxLength(32)
                    .HasColumnName("SPD_ID")
                    .HasComment("详情ID");

                entity.Property(e => e.SpCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SP_Create_Time")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.SpDayNo)
                    .HasColumnName("SP_Day_NO")
                    .HasComment("周期内的第几天");

                entity.Property(e => e.SpId)
                    .HasMaxLength(32)
                    .HasColumnName("SP_ID")
                    .HasComment("关联周期模板ID");

                entity.Property(e => e.SpsId)
                    .HasMaxLength(32)
                    .HasColumnName("SPS_ID")
                    .HasComment("关联班次ID");
            });

            modelBuilder.Entity<SysPeriodSchedule>(entity =>
            {
                entity.HasKey(e => e.SpId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_period_schedule");

                entity.HasComment("周期模版表");

                entity.Property(e => e.SpId)
                    .HasMaxLength(32)
                    .HasColumnName("SP_ID")
                    .HasComment("周期ID");

                entity.Property(e => e.ScCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SC_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.SpDay)
                    .HasColumnName("SP_Day")
                    .HasComment("周期天数");

                entity.Property(e => e.SpDeptId)
                    .HasMaxLength(32)
                    .HasColumnName("SP_DeptID")
                    .HasComment("适用部门ID");

                entity.Property(e => e.SpName)
                    .HasMaxLength(255)
                    .HasColumnName("SP_Name")
                    .HasComment("周期名称");
            });

            modelBuilder.Entity<SysScheduleCycle>(entity =>
            {
                entity.HasKey(e => e.ScId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_schedule_cycle");

                entity.HasComment("周期规则表");

                entity.Property(e => e.ScId)
                    .HasMaxLength(32)
                    .HasColumnName("SC_ID")
                    .HasComment("周期规则ID");

                entity.Property(e => e.ScCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SC_CreateTime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasComment("创建时间");

                entity.Property(e => e.ScCreatorId)
                    .HasMaxLength(32)
                    .HasColumnName("SC_CreatorID")
                    .HasComment("创建人ID");

                entity.Property(e => e.ScDeptId)
                    .HasMaxLength(32)
                    .HasColumnName("SC_DeptID")
                    .HasComment("部门ID");

                entity.Property(e => e.ScEndTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SC_EndTime")
                    .HasComment("结束日期");

                entity.Property(e => e.ScIsBan)
                    .HasColumnName("SC_IsBan")
                    .HasDefaultValueSql("'1'")
                    .HasComment("是否启用：0-禁用，1-启用");

                entity.Property(e => e.ScName)
                    .HasMaxLength(255)
                    .HasColumnName("SC_Name")
                    .HasComment("规则名称");

                entity.Property(e => e.ScRemark)
                    .HasMaxLength(200)
                    .HasColumnName("SC_Remark")
                    .HasComment("备注");

                entity.Property(e => e.ScStartTime)
                    .HasColumnType("datetime")
                    .HasColumnName("SC_StartTime")
                    .HasComment("开始日期");
            });

            modelBuilder.Entity<SysShift>(entity =>
            {
                entity.HasKey(e => e.SId)
                    .HasName("PRIMARY");

                entity.ToTable("sys_shift");

                entity.HasComment("班次模版表");

                entity.Property(e => e.SId)
                    .HasMaxLength(32)
                    .HasColumnName("S_ID")
                    .HasComment("班次ID");

                entity.Property(e => e.SBreakEnd)
                    .HasColumnType("datetime")
                    .HasColumnName("S_BreakEnd")
                    .HasComment("午休结束时间（可选）");

                entity.Property(e => e.SBreakStart)
                    .HasColumnType("datetime")
                    .HasColumnName("S_BreakStart")
                    .HasComment("午休开始时间（可选）");

                entity.Property(e => e.SCreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("S_Create_Time")
                    .HasComment("创建时间");

                entity.Property(e => e.SEndTime)
                    .HasColumnType("datetime")
                    .HasColumnName("S_EndTime")
                    .HasComment("班次结束时间");

                entity.Property(e => e.SName)
                    .HasMaxLength(50)
                    .HasColumnName("S_Name")
                    .HasComment("班次名称");

                entity.Property(e => e.SStartTime)
                    .HasColumnType("datetime")
                    .HasColumnName("S_StartTime")
                    .HasComment("班次开始时间");

                entity.Property(e => e.SStatus)
                    .HasColumnName("S_Status")
                    .HasComment("状态：0-停用，1-启用");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
