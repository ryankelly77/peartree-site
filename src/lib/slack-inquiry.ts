import {
  goalLabels,
  sourceLabels,
  stageLabels,
  type Goal,
  type InquirySource,
  type Stage,
} from "@/content/inquiry";

export type Inquiry = {
  source: InquirySource;
  name: string;
  email: string;
  company?: string;
  industry?: string;
  goal?: Goal;
  stage?: Stage;
  message: string;
};

/** A section's text field tops out at 3,000 characters. */
const SECTION_LIMIT = 3000;
const TRUNCATION_NOTE = "\n\n…(truncated)";

/**
 * Slack's escaping rules for anything a visitor typed.
 *
 * Ampersand has to go first, otherwise it would re-escape the ones this
 * introduces. With < and > encoded, Slack renders `<!channel>` and
 * `<https://example.com|click>` as the literal text that was submitted
 * instead of as a mention or a link.
 */
export function escapeSlack(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Cuts escaped text to Slack's limit. The trailing partial entity has to go
 * too, or a cut landing inside `&amp;` would leave `&am` in the message.
 */
function fitSection(text: string): string {
  if (text.length <= SECTION_LIMIT) return text;
  const body = text.slice(0, SECTION_LIMIT - TRUNCATION_NOTE.length).replace(/&[a-z]*$/i, "");
  return body + TRUNCATION_NOTE;
}

function field(label: string, value: string) {
  return { type: "mrkdwn" as const, text: `*${label}*\n${value}` };
}

/** Central time, where Ryan and Tracie are, rather than the server's zone. */
export function formatCentral(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function buildInquiryMessage(inquiry: Inquiry, submittedAt: Date) {
  const name = escapeSlack(inquiry.name);
  const email = escapeSlack(inquiry.email);

  const fields = [field("Name", name), field("Email", `<mailto:${email}|${email}>`)];
  if (inquiry.company) fields.push(field("Company", escapeSlack(inquiry.company)));
  if (inquiry.industry) fields.push(field("Industry", escapeSlack(inquiry.industry)));
  if (inquiry.goal) fields.push(field("Goal", escapeSlack(goalLabels[inquiry.goal])));
  if (inquiry.stage) fields.push(field("Stage", escapeSlack(stageLabels[inquiry.stage])));

  return {
    // Shown in notifications and by clients that don't render blocks.
    text: `New inquiry from ${name} (${email})`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `New inquiry: ${sourceLabels[inquiry.source]}`, emoji: true },
      },
      { type: "section", fields },
      { type: "section", text: { type: "mrkdwn", text: fitSection(escapeSlack(inquiry.message)) } },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: `Submitted ${formatCentral(submittedAt)} Central` }],
      },
    ],
  };
}
