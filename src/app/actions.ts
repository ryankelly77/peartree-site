"use server";

import { z } from "zod";
import { goals, stages } from "@/content/inquiry";
import { buildInquiryMessage } from "@/lib/slack-inquiry";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

const inquirySchema = z.object({
  source: z.enum(["home", "partner"]),
  name: z.string({ error: "Please add your name." }).trim().min(1, "Please add your name.").max(120),
  email: z.email({ error: "Please enter a valid email address." }).max(200),
  company: optionalText(160),
  industry: optionalText(160),
  goal: z.enum(goals).optional(),
  stage: z.enum(stages).optional(),
  message: z
    .string({ error: "Tell us a little about it." })
    .trim()
    .min(1, "Tell us a little about it.")
    .max(5000),
});

type InquiryField = "name" | "email" | "company" | "industry" | "goal" | "stage" | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
  /** Echoed back on error so the form can restore what the visitor typed. */
  values?: Partial<Record<InquiryField, string>>;
};

function readValues(formData: FormData): Partial<Record<InquiryField, string>> {
  const fields: InquiryField[] = ["name", "email", "company", "industry", "goal", "stage", "message"];
  const values: Partial<Record<InquiryField, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string" && value !== "") values[field] = value;
  }
  return values;
}

/**
 * Validates an inquiry and posts it to SLACK_WEBHOOK_URL as a Block Kit
 * message. Everything the visitor typed is escaped on the way in, so a
 * submission can't inject a link or an @channel mention.
 */
export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success" };
  }

  const values = readValues(formData);
  const parsed = inquirySchema.safeParse({ ...values, source: formData.get("source") });

  if (!parsed.success) {
    const fieldErrors: InquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as InquiryField;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const payload = buildInquiryMessage(parsed.data, new Date());

  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[inquiry] SLACK_WEBHOOK_URL is not set; logging instead of sending.",
        JSON.stringify(payload, null, 2),
      );
      return { status: "success" };
    }
    console.error("[inquiry] SLACK_WEBHOOK_URL is not set in production.");
    return {
      status: "error",
      message: "We couldn't send your message just now. Please try again later.",
      values,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[inquiry] Failed to forward inquiry", error);
    return {
      status: "error",
      message: "We couldn't send your message just now. Please try again in a minute.",
      values,
    };
  }

  return { status: "success" };
}
