/**
 * The inquiry form's choice fields.
 *
 * Both forms render these, the server action validates against them, and the
 * Slack message prints the labels rather than the stored values. Keeping all
 * three off one definition is what stops a label from drifting out of sync
 * with what lands in Slack.
 */

export const goals = ["launch", "build", "sell", "buy", "other"] as const;
export const stages = ["idea", "customers", "prototype", "live"] as const;

export type Goal = (typeof goals)[number];
export type Stage = (typeof stages)[number];

export const goalLabels: Record<Goal, string> = {
  launch: "Launch a product",
  build: "Build a business",
  sell: "Sell an app",
  buy: "Buy one of our companies",
  other: "Something else",
};

export const stageLabels: Record<Stage, string> = {
  idea: "An idea",
  customers: "Customers, no product",
  prototype: "A prototype",
  live: "A live product that needs to sell",
};

export type InquirySource = "home" | "partner";

/** How the form is described in the Slack header. */
export const sourceLabels: Record<InquirySource, string> = {
  home: "home page",
  partner: "partner page",
};

export const goalChoices = goals.map((value) => ({ value, label: goalLabels[value] }));
export const stageChoices = stages.map((value) => ({ value, label: stageLabels[value] }));
