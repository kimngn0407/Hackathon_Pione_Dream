package com.example.demo.Controllers;

import com.example.demo.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for testing email functionality
 * Use this to verify email configuration before deploying to production
 */
@RestController
@RequestMapping("/api/email/test")
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    /**
     * Test endpoint to send a simple test email
     * 
     * Example usage:
     * POST http://localhost:8080/api/email/test/send
     * Body: { "email": "recipient@example.com" }
     */
    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendTestEmail(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        
        try {
            String recipientEmail = request.get("email");
            
            if (recipientEmail == null || recipientEmail.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Email address is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Create test email content
            String subject = "[SmartFarm] Test Email";
            String htmlBody = buildTestEmailHtml();
            
            emailService.sendAlertEmail(recipientEmail, subject, htmlBody);
            
            response.put("status", "success");
            response.put("message", "Test email sent successfully to " + recipientEmail);
            response.put("timestamp", LocalDateTime.now().toString());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to send test email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test endpoint to send an alert email using template
     * 
     * Example usage:
     * POST http://localhost:8080/api/email/test/alert
     * Body: { "email": "recipient@example.com" }
     */
    @PostMapping("/alert")
    public ResponseEntity<Map<String, String>> sendTestAlertEmail(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        
        try {
            String recipientEmail = request.get("email");
            
            if (recipientEmail == null || recipientEmail.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Email address is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Create test alert email with template
            String subject = "[SmartFarm] CRITICAL Alert: Temperature";
            Map<String, Object> model = new HashMap<>();
            model.put("templateName", "alert-email");
            model.put("fieldName", "Field 1 (Test)");
            model.put("farmName", "Test Farm");
            model.put("sensorName", "Sensor A (Test)");
            model.put("type", "Temperature");
            model.put("value", 45.5);
            model.put("thresholdMin", 20.0);
            model.put("thresholdMax", 35.0);
            model.put("timestamp", LocalDateTime.now());
            model.put("message", "Temperature exceeded threshold");
            model.put("status", "Critical");
            
            emailService.sendAlertEmail(List.of(recipientEmail), null, null, subject, model);
            
            response.put("status", "success");
            response.put("message", "Test alert email sent successfully to " + recipientEmail);
            response.put("timestamp", LocalDateTime.now().toString());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to send test alert email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test endpoint to send email to multiple recipients
     * 
     * Example usage:
     * POST http://localhost:8080/api/email/test/multiple
     * Body: { "emails": ["user1@example.com", "user2@example.com"] }
     */
    @PostMapping("/multiple")
    public ResponseEntity<Map<String, Object>> sendTestEmailToMultiple(@RequestBody Map<String, List<String>> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<String> emails = request.get("emails");
            
            if (emails == null || emails.isEmpty()) {
                response.put("status", "error");
                response.put("message", "At least one email address is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Create test email content
            String subject = "[SmartFarm] Test Email to Multiple Recipients";
            Map<String, Object> model = new HashMap<>();
            model.put("templateName", "alert-email");
            model.put("fieldName", "Test Field");
            model.put("farmName", "Test Farm");
            model.put("sensorName", "Test Sensor");
            model.put("type", "Humidity");
            model.put("value", 85.0);
            model.put("thresholdMin", 40.0);
            model.put("thresholdMax", 70.0);
            model.put("timestamp", LocalDateTime.now());
            model.put("message", "This is a test email to multiple recipients");
            model.put("status", "Warning");
            
            emailService.sendAlertEmail(emails, null, null, subject, model);
            
            response.put("status", "success");
            response.put("message", "Test email sent successfully");
            response.put("recipients", emails);
            response.put("count", emails.size());
            response.put("timestamp", LocalDateTime.now().toString());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to send test email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Get email configuration status
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> getEmailStatus() {
        Map<String, String> response = new HashMap<>();
        
        // This is a simple status check
        // In production, you might want to add more sophisticated checks
        response.put("status", "ready");
        response.put("message", "Email service is configured. Use /send or /alert endpoints to test.");
        response.put("timestamp", LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Build HTML content for test email
     */
    private String buildTestEmailHtml() {
        return """
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                    .header h1 { margin: 0; font-size: 28px; }
                    .content { padding: 30px; }
                    .success-icon { font-size: 60px; text-align: center; margin: 20px 0; }
                    .info-box { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 13px; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌾 SmartFarm Test Email</h1>
                    </div>
                    <div class="content">
                        <div class="success-icon">✅</div>
                        <h2 style="text-align: center; color: #10b981;">Email Configuration Successful!</h2>
                        <p>Congratulations! Your email configuration is working correctly.</p>
                        
                        <div class="info-box">
                            <strong>ℹ️ Test Information:</strong><br>
                            <ul style="margin: 10px 0;">
                                <li>Email service is properly configured</li>
                                <li>SMTP connection is successful</li>
                                <li>Templates are rendering correctly</li>
                            </ul>
                        </div>
                        
                        <p><strong>Next Steps:</strong></p>
                        <ol>
                            <li>Test alert email with template using <code>/api/email/test/alert</code></li>
                            <li>Test multiple recipients using <code>/api/email/test/multiple</code></li>
                            <li>Configure real sensor alerts in production</li>
                        </ol>
                        
                        <p style="text-align: center;">
                            <a href="http://localhost:8080/api/email/test/status" class="button">Check Status</a>
                        </p>
                    </div>
                    <div class="footer">
                        <p>This is an automated test email from SmartFarm System</p>
                        <p>Timestamp: """ + LocalDateTime.now() + """
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """;
    }
}

