"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, Mail, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { socialLinks } from "@/data/socialLinks";
import { contactEndpoint } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  if (!values.message.trim()) errors.message = "Write a message.";
  else if (values.message.trim().length < 10) errors.message = "Write at least 10 characters.";
  return errors;
}

const contactCards = [
  { ...socialLinks.email, Icon: Mail, color: "text-brand" },
  { ...socialLinks.github, Icon: GithubIcon, color: "text-navy" },
  { ...socialLinks.linkedin, Icon: LinkedinIcon, color: "text-[#0a66c2]" },
];

const fieldBase =
  "mt-1 w-full rounded-lg border bg-mist/60 px-3 py-2.5 text-sm text-navy outline-none transition placeholder:text-muted/60 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20";

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // status: idle | loading | success | error | unconfigured
  const [status, setStatus] = useState("idle");

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    // No backend connected yet: say so honestly instead of pretending the message was sent.
    if (!contactEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const describe = (id) => (errors[id] && touched[id] ? `cf-${id}-error` : undefined);
  const invalid = (id) => Boolean(errors[id] && touched[id]);
  const border = (id) => (invalid(id) ? "border-red-400" : "border-line");

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Get in Touch"
            title="Have a project in mind?"
            description="I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology."
          />
          <ul className="mt-6 grid gap-3">
            {contactCards.map(({ label, href, display, Icon, color }) => {
              const isMailLink = href.startsWith("mailto:");

              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isMailLink ? undefined : "_blank"}
                    rel={isMailLink ? undefined : "noopener noreferrer"}
                    className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-brand/40"
                  >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist">
                    <Icon className={`h-5 w-5 ${color}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy">{label}</span>
                    <span className="block truncate text-sm text-muted">{display}</span>
                  </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-6" aria-labelledby="contact-form-title">
          <h3 id="contact-form-title" className="sr-only">
            Contact form
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="cf-name" label="Your Name" error={touched.name && errors.name}>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="John Doe"
                value={values.name}
                onChange={update}
                onBlur={blur}
                aria-invalid={invalid("name")}
                aria-describedby={describe("name")}
                className={`${fieldBase} ${border("name")}`}
              />
            </Field>
            <Field id="cf-email" label="Your Email" error={touched.email && errors.email}>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="john@example.com"
                value={values.email}
                onChange={update}
                onBlur={blur}
                aria-invalid={invalid("email")}
                aria-describedby={describe("email")}
                className={`${fieldBase} ${border("email")}`}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field id="cf-subject" label="Subject" error={touched.subject && errors.subject}>
              <input
                id="cf-subject"
                name="subject"
                type="text"
                required
                placeholder="Project Inquiry"
                value={values.subject}
                onChange={update}
                onBlur={blur}
                aria-invalid={invalid("subject")}
                aria-describedby={describe("subject")}
                className={`${fieldBase} ${border("subject")}`}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field id="cf-message" label="Message" error={touched.message && errors.message}>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your project..."
                value={values.message}
                onChange={update}
                onBlur={blur}
                aria-invalid={invalid("message")}
                aria-describedby={describe("message")}
                className={`${fieldBase} ${border("message")} resize-y`}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-80"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <div aria-live="polite" className="mt-3">
            {status === "success" && (
              <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Message sent. Thanks for reaching out; I&apos;ll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Your message wasn&apos;t sent. Try again, or email{" "}
                  <a className="font-semibold underline" href={socialLinks.email.href}>
                    {socialLinks.email.display}
                  </a>
                  .
                </span>
              </p>
            )}
            {status === "unconfigured" && (
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  The form isn&apos;t connected to a service yet, so nothing was sent. Email me directly at{" "}
                  <a className="font-semibold underline" href={socialLinks.email.href}>
                    {socialLinks.email.display}
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
