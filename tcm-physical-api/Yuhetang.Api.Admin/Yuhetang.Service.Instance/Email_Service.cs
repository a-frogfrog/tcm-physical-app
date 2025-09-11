using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Email_Service:Base_Service,I_Email_Service
    {
        private readonly EmailSettings _emailSettings;

        public Email_Service(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task<bool> SendVerificationCodeAsync(string toEmail, string verificationCode)
        {
            var subject = "您的验证码";
            // 假设品牌主色为 #2563eb（蓝色）
            var brandColor = "#2563eb";
            var body = $@"
                        <div style=""font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"">
                            <div style=""background-color: {brandColor}; color: #fff; padding: 16px; border-radius: 4px 4px 0 0;"">
                                <h2 style=""margin: 0; font-size: 18px;"">验证码通知</h2>
                            </div>
                            <div style=""background-color: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 4px 4px;"">
                                <p style=""color: #666; margin: 8px 0;"">您好，您的验证码是：</p>
                                <p style=""font-size: 32px; font-weight: bold; color: {brandColor}; margin: 16px 0; text-align: center;"">{verificationCode}</p>
                                <p style=""color: #666; margin: 8px 0;"">有效期：<strong style=""color: {brandColor};"">10 分钟</strong></p>
                                <p style=""color: #666; margin: 8px 0;"">若非本人操作，可忽略此邮件。</p>
                            </div>
                            <p style=""color: #999; font-size: 12px; text-align: center; margin-top: 16px;"">系统自动发送，无需回复</p>
                        </div>
                        ";

            return await SendEmailAsync(toEmail, subject, body);
        }

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = subject;

                var bodyBuilder = new BodyBuilder
                {
                    HtmlBody = body
                };
                message.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();

                await client.ConnectAsync(
                    _emailSettings.SmtpServer,
                    _emailSettings.SmtpPort,
                    SecureSocketOptions.StartTls
                );

                await client.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                return true;
            }
            catch (Exception ex)
            {
                // 记录日志
                Console.WriteLine($"发送邮件失败: {ex.Message}");
                return false;
            }
        }
    }
}
