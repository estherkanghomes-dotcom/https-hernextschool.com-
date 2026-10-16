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

const applicationSchema = z.object({
  item: z.enum(["cohort", "consult"]),
  classId: z.enum(["mon-am", "thu-pm"]).optional(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().max(1000).optional(),
});

/**
 * Sends a class application to Esther. Product and class labels are resolved
 * here from the site's own data, so the browser only picks ids.
 */
export const submitEnrollmentApplication = createServerFn({ method: "POST" })
  .inputValidator((data) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { products, fmtUSD } = await import("@/lib/products");
    const { cohort } = await import("@/lib/cohort");
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const p = products[data.item];
    const cls = data.item === "cohort" ? cohort.classes.find((c) => c.id === data.classId) : undefined;
    if (data.item === "cohort" && !cls) throw new Error("Class is required");
    return sendTemplateEmail("enrollment-application", "", {
      templateData: {
        item: `${p.name.kr} (${fmtUSD(p.price)})`,
        className: cls?.kr,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
      idempotencyKey: `enrollment-${data.item}-${data.classId ?? ""}-${data.email.toLowerCase()}`,
      replyTo: data.email,
    });
  });
