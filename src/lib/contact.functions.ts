import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
});

/**
 * Sends the fixed contact-notification template to the site owner after a
 * consultation signup. Public trigger: input is validated here; the template
 * and recipient are fixed server-side and never come from the browser.
 */
export const sendContactNotification = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const result = await sendTemplateEmail("contact-notification", "", {
      templateData: { name: data.name, email: data.email },
      idempotencyKey: `contact-notification-${data.email.toLowerCase()}`,
      replyTo: data.email,
    });
    return result;
  });
