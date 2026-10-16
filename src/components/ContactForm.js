"use client";

import { useId, useState } from "react";
import { WHATSAPP, whatsappLink } from "@/data/site";
import styles from "./ContactForm.module.css";

const BEDROOMS = ["5 Bedroom", "4 Bedroom", "3 Bedroom", "2 Bedroom", "1 Bedroom"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid email address, for example john@doe.com.";
  if (v.checkIn && v.checkOut && v.checkOut <= v.checkIn) e.checkOut = "Check out must be after check in.";
  if (v.pax !== "" && (!Number.isInteger(Number(v.pax)) || Number(v.pax) < 1))
    e.pax = "Please enter a whole number of 1 or more.";
  if (!v.message.trim() && !v.checkIn && v.bedrooms.length === 0)
    e.message = "Please add a message, your dates or the bedrooms you need.";
  return e;
}

function compose(v) {
  const lines = [
    "Hello Omer Villa & Retreat, I would like to send an inquiry.",
    "",
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
  ];
  if (v.checkIn) lines.push(`Check in: ${v.checkIn}`);
  if (v.checkOut) lines.push(`Check out: ${v.checkOut}`);
  if (v.pax) lines.push(`Number of pax: ${v.pax}`);
  if (v.bedrooms.length) lines.push(`Requirement: ${v.bedrooms.join(", ")}`);
  if (v.message.trim()) lines.push("", v.message.trim());
  return lines.join("\n");
}

const EMPTY = { name: "", email: "", checkIn: "", checkOut: "", pax: "", bedrooms: [], message: "" };

/*
  The original form posted to a WordPress plugin whose destination is unknown,
  and no replacement backend has been authorised. This form therefore never
  claims to send anything: it validates the inquiry and hands it to WhatsApp
  (or the clipboard), where the visitor sends it themselves.
*/
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const today = new Date().toISOString().slice(0, 10);

  const set = (key) => (e) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const toggleBedroom = (b) =>
    setValues((v) => ({
      ...v,
      bedrooms: v.bedrooms.includes(b) ? v.bedrooms.filter((x) => x !== b) : [...v.bedrooms, b],
    }));

  const check = () => {
    const e = validate(values);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      setStatus(null);
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!check()) return;
    const url = whatsappLink(compose(values));
    // "noopener" in the features string would make window.open return null,
    // so the opener is cleared by hand to keep the same protection.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    setStatus({ kind: "whatsapp", url, opened: Boolean(win) });
  };

  const onCopy = async () => {
    if (!check()) return;
    try {
      await navigator.clipboard.writeText(compose(values));
      setStatus({ kind: "copied" });
    } catch {
      setStatus({ kind: "copy-failed" });
    }
  };

  const err = (key) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className={styles.error}>
        {errors[key]}
      </p>
    ) : null;

  const field = (key) => ({
    id: `${id}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.notice} role="note">
        <p className={styles.noticeTitle}>How this form works</p>
        <p>
          Online delivery for this form is not connected yet, so nothing is sent from this page. When you continue,
          your inquiry opens in WhatsApp as a message to {WHATSAPP.display}, ready for you to send.
        </p>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Name</label>
          <input type="text" autoComplete="name" placeholder="E.g. John Doe" value={values.name} onChange={set("name")} required {...field("name")} />
          {err("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>Email Address</label>
          <input type="email" autoComplete="email" placeholder="E.g. john@doe.com" value={values.email} onChange={set("email")} required {...field("email")} />
          {err("email")}
        </div>
      </div>

      <div className={styles.row3}>
        <div className={styles.field}>
          <label htmlFor={`${id}-checkIn`}>Check In</label>
          <input type="date" min={today} value={values.checkIn} onChange={set("checkIn")} {...field("checkIn")} />
          {err("checkIn")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-checkOut`}>Check Out</label>
          <input type="date" min={values.checkIn || today} value={values.checkOut} onChange={set("checkOut")} {...field("checkOut")} />
          {err("checkOut")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-pax`}>Number of pax</label>
          <input type="number" inputMode="numeric" min="1" step="1" placeholder="E.g. 10" value={values.pax} onChange={set("pax")} {...field("pax")} />
          {err("pax")}
        </div>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Requirement</legend>
        <p className={styles.hint}>No of bedroom required</p>
        <div className={styles.chips}>
          {BEDROOMS.map((b) => (
            <label key={b} className={styles.chip}>
              <input type="checkbox" checked={values.bedrooms.includes(b)} onChange={() => toggleBedroom(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={`${id}-message`}>Your message</label>
        <textarea data-lenis-prevent rows={6} placeholder="Your message" value={values.message} onChange={set("message")} {...field("message")} />
        {err("message")}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Continue in WhatsApp
        </button>
        <button type="button" className={styles.secondary} onClick={onCopy}>
          Copy my inquiry
        </button>
      </div>

      <div className={styles.status} aria-live="polite">
        {status?.kind === "whatsapp" && (
          <p>
            {status.opened
              ? "Your inquiry has been prepared in WhatsApp in a new tab. It has not been sent yet: press send in WhatsApp to reach us."
              : "Your browser blocked the new tab. "}
            {!status.opened && (
              <a href={status.url} target="_blank" rel="noopener noreferrer">
                Open your inquiry in WhatsApp
              </a>
            )}
          </p>
        )}
        {status?.kind === "copied" && (
          <p>Your inquiry has been copied. Paste it into WhatsApp or Airbnb messages to send it to us.</p>
        )}
        {status?.kind === "copy-failed" && <p>Copying was not possible in this browser. Please use WhatsApp instead.</p>}
      </div>
    </form>
  );
}
