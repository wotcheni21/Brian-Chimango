"use client";

import { useState, type FormEvent } from "react";
import { sendWeddingWish } from "@/lib/wishes-service";

type FormState = {
  name: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  message: "",
};

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please add your name.";
  }

  const message = form.message.trim();
  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length > 1200) {
    errors.message = "Please keep your message under 1200 characters.";
  }

  return errors;
}

type BestWishesFormProps = {
  embedded?: boolean;
};

export default function BestWishesForm({ embedded = false }: BestWishesFormProps) {
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

    const result = await sendWeddingWish({
      name: form.name.trim(),
      message: form.message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setForm(initialState);
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={
        embedded
          ? "flex flex-col gap-5"
          : "flex flex-col gap-5 rounded-[2rem] border border-ivory/15 bg-ivory/5 p-8 backdrop-blur-sm sm:p-10"
      }
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-mint">
          Send love
        </span>
        <h3 className="font-serif text-3xl leading-tight text-ivory">
          Best wishes
        </h3>
        <p className="text-sm leading-relaxed text-fog/85">
          Leave Brian and Chimango a note for their wedding day.
        </p>
      </div>

      <Field label="Your Name" htmlFor="wish-name" error={errors.name}>
        <input
          id="wish-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "wish-name-error" : undefined}
          className={inputClass(Boolean(errors.name))}
          placeholder="Jane Doe"
          required
        />
      </Field>

      <Field label="Message" htmlFor="wish-message" error={errors.message}>
        <textarea
          id="wish-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "wish-message-error" : undefined}
          className={inputClass(Boolean(errors.message))}
          placeholder="Wishing you a lifetime of love and joy."
          required
        />
      </Field>

      {status === "success" && (
        <p role="status" className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-mint">
          Your wedding wish has been sent.
        </p>
      )}

      {status === "error" && serverError && (
        <p role="alert" className="rounded-xl bg-red-950/40 px-4 py-3 text-sm text-red-100">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-mint px-8 py-4 text-xs uppercase tracking-[0.25em] text-evergreen transition-colors hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-evergreen/30 border-t-evergreen" />
        )}
        {isSubmitting ? "Sending..." : "Send Wish"}
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
      <label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.22em] text-fog/80">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${htmlFor}-error`} className="text-xs text-red-100" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-ink/35 px-4 py-3 text-ivory placeholder:text-fog/45 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ink transition-colors ${
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-ivory/20 focus:border-mint focus:ring-mint/40"
  }`;
}
