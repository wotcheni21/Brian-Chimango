"use client";

import { useState, type FormEvent } from "react";
import { submitRsvp } from "@/lib/rsvp-service";
import type { AttendanceStatus, RsvpPayload, RsvpResult } from "@/types/rsvp";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  attendance: AttendanceStatus;
  guests: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  attendance: "attending",
  guests: "1",
  message: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{6,}$/;
const minGuests = 1;
const maxGuests = 3;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Please tell us your full name.";
  }

  if (!phonePattern.test(form.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const guestsNumber = Number(form.guests);
  if (
    !Number.isInteger(guestsNumber) ||
    guestsNumber < minGuests ||
    guestsNumber > maxGuests
  ) {
    errors.guests = "Guest count must be between 1 and 3.";
  }

  return errors;
}

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setServerError(null);

    const payload: RsvpPayload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      attendance: form.attendance,
      guests: Number(form.guests),
      message: form.message.trim() || undefined,
    };

    let result: RsvpResult;
    try {
      result = await submitRsvp(payload);
    } catch {
      result = {
        ok: false as const,
        error: "Something went wrong while sending your RSVP. Please try again.",
      };
    }

    if (result.ok) {
      setStatus("success");
      setForm(initialState);
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  const isSubmitting = status === "submitting";

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-sage bg-sage-hint px-8 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-evergreen text-ivory">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="font-serif text-2xl text-ink sm:text-3xl">
          Thank you for your RSVP
        </h3>
        <p className="max-w-sm text-graphite">
          We&apos;ve received your response and can&apos;t wait to celebrate
          with you. A confirmation will follow shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs uppercase tracking-[0.25em] text-evergreen underline underline-offset-4"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClass(Boolean(errors.fullName))}
            placeholder="Jane Doe"
            required
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
            placeholder="+265 900 000 000"
            required
          />
        </Field>
      </div>

      <Field label="Email Address" htmlFor="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(Boolean(errors.email))}
          placeholder="jane@example.com"
          required
        />
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs uppercase tracking-[0.25em] text-graphite">
          Will you be attending?
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { value: "attending", label: "Joyfully Attending" },
              { value: "not_attending", label: "Unable to Attend" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-colors ${
                form.attendance === option.value
                  ? "border-evergreen bg-sage-hint"
                  : "border-mist bg-paper hover:border-sage"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value={option.value}
                checked={form.attendance === option.value}
                onChange={() => update("attendance", option.value)}
                className="h-4 w-4 accent-evergreen"
              />
              <span className="text-sm text-ink">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="Number of Guests (including yourself)"
        htmlFor="guests"
        error={errors.guests}
      >
        <input
          id="guests"
          name="guests"
          type="number"
          min={minGuests}
          max={maxGuests}
          value={form.guests}
          onChange={(e) => update("guests", e.target.value)}
          aria-invalid={Boolean(errors.guests)}
          aria-describedby={errors.guests ? "guests-error" : undefined}
          className={inputClass(Boolean(errors.guests))}
          required
        />
      </Field>

      <Field label="Message (optional)" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass(false)}
          placeholder="Dietary requirements, well-wishes, or anything else you'd like us to know."
        />
      </Field>

      {status === "error" && serverError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-evergreen px-8 py-4 text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
        )}
        {isSubmitting ? "Sending your RSVP…" : "Send RSVP"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.25em] text-graphite">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${htmlFor}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-paper px-4 py-3 text-ink placeholder:text-silver focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-paper transition-colors ${
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-mist focus:border-evergreen focus:ring-sage/50"
  }`;
}
