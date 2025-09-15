// EmailSettings.cs
public class EmailSettings
{
    public string SmtpServer { get; set; } = "smtp.qq.com";
    public int SmtpPort { get; set; } = 587;
    public string SenderEmail { get; set; }
    public string SenderName { get; set; }
    public string Password { get; set; }
    public bool EnableSsl { get; set; } = true;
}