package com.example.demo.Services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
// Mockito static methods are used via imports below
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class EmailServiceTest {

    private JavaMailSender mailSender;
    private SpringTemplateEngine templateEngine;
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        mailSender = mock(JavaMailSender.class);
        templateEngine = mock(SpringTemplateEngine.class);
        // return a mock MimeMessage when createMimeMessage is called
        MimeMessage mime = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mime);

        emailService = new EmailService(mailSender, templateEngine);
    }

    @Test
    void sendAlertEmail_shouldInvokeMailSender() throws Exception {
        // Arrange
        List<String> to = List.of("user1@example.com", "user2@example.com");
        String subject = "Test Alert";
        when(templateEngine.process(eq("alert-email"), any())).thenReturn("<p>Test</p>");

        // Act
        emailService.sendAlertEmail(to, null, null, subject, Map.of("templateName", "alert-email", "fieldName", "F1"));

        // Because EmailService methods are annotated with @Async, they run asynchronously in production.
        // In unit tests we invoked the method directly; mailSender.send should be called on the mock.
        ArgumentCaptor<MimeMessage> captor = ArgumentCaptor.forClass(MimeMessage.class);
        verify(mailSender, timeout(2000).times(1)).send(captor.capture());
        MimeMessage sent = captor.getValue();
        assertNotNull(sent);
    }
}
