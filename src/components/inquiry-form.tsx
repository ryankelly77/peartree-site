"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

type Choice = { value: string; label: string };

const variants = {
  home: {
    choiceField: "goal",
    choiceLegend: "What are you trying to do?",
    choices: [
      { value: "launch", label: "Launch a product" },
      { value: "build", label: "Build a business" },
      { value: "sell", label: "Sell an app" },
      { value: "buy", label: "Buy one of our companies" },
      { value: "other", label: "Something else" },
    ],
    messageLabel: "Tell us about it",
    submitLabel: "Send it",
    showIndustry: false,
  },
  partner: {
    choiceField: "stage",
    choiceLegend: "Where are you today?",
    choices: [
      { value: "idea", label: "An idea" },
      { value: "customers", label: "Customers, no product" },
      { value: "prototype", label: "A prototype" },
      { value: "live", label: "A live product that needs to sell" },
    ],
    messageLabel: "Who is the customer, and what do they need?",
    submitLabel: "Send it to Ryan and Tracie",
    showIndustry: true,
  },
} as const satisfies Record<
  string,
  {
    choiceField: "goal" | "stage";
    choiceLegend: string;
    choices: readonly Choice[];
    messageLabel: string;
    submitLabel: string;
    showIndustry: boolean;
  }
>;

const inputClass =
  "min-h-12 w-full rounded-xs border border-night-field bg-night-raised px-3.5 text-base text-paper placeholder:text-night-muted";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  error,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="flex flex-col gap-2 text-sm text-night-text">
      {label}
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error && "border-error-on-dark")}
      />
      {error ? (
        <span id={errorId} className="text-sm text-error-on-dark">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function InquiryForm({ variant }: { variant: keyof typeof variants }) {
  const config = variants[variant];
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-[1_1_560px] flex-col gap-3 self-start rounded-xs border border-night-field bg-night-raised p-8"
      >
        <p className="m-0 text-[22px] font-bold text-paper stretch-112">Thanks. It&apos;s on its way.</p>
        <p className="m-0 text-base leading-[1.6] text-night-text">
          Ryan and Tracie read every message themselves and will reply by email.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="relative flex flex-[1_1_560px] flex-col gap-5">
      <input type="hidden" name="source" value={variant} />

      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
          defaultValue={values.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
          defaultValue={values.email}
        />
      </div>

      {config.showIndustry ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          <Field
            label="Company (optional)"
            name="company"
            autoComplete="organization"
            error={errors.company}
            defaultValue={values.company}
          />
          <Field label="Industry" name="industry" error={errors.industry} defaultValue={values.industry} />
        </div>
      ) : (
        <Field
          label="Company (optional)"
          name="company"
          autoComplete="organization"
          error={errors.company}
          defaultValue={values.company}
        />
      )}

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="pb-2.5 text-sm text-night-text">{config.choiceLegend}</legend>
        <div className="flex flex-wrap gap-2.5">
          {config.choices.map((choice) => (
            <label
              key={choice.value}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xs border border-night-field px-4 text-[15px] text-cream has-checked:border-gold has-checked:bg-night-raised"
            >
              <input
                type="radio"
                name={config.choiceField}
                value={choice.value}
                defaultChecked={values[config.choiceField] === choice.value}
                className="m-0 accent-gold"
              />
              {choice.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 text-sm text-night-text">
        {config.messageLabel}
        <textarea
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full resize-y rounded-xs border border-night-field bg-night-raised p-3.5 text-base text-paper",
            errors.message && "border-error-on-dark",
          )}
        />
        {errors.message ? (
          <span id="message-error" className="text-sm text-error-on-dark">
            {errors.message}
          </span>
        ) : null}
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="min-h-[52px] cursor-pointer rounded-xs border-0 bg-gold px-8 text-base font-bold text-ink transition-colors hover:bg-gold-hover disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : config.submitLabel}
        </button>
        <p aria-live="polite" className="m-0 text-sm text-error-on-dark">
          {state.status === "error" ? state.message : null}
        </p>
      </div>
    </form>
  );
}
