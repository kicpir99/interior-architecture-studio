'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FileCheck2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/language-context';
import { formatPLN } from '@/lib/calculator';
import {
  validateAttachment,
  validateContactForm,
  type AttachmentMeta,
  type ValidationErrors,
} from '@/lib/validation';
import type { AttachedEstimate } from './cost-calculator';

interface ContactFormProps {
  attachedEstimate: AttachedEstimate | null;
  onClearEstimate: () => void;
}

export function ContactForm({ attachedEstimate, onClearEstimate }: ContactFormProps) {
  const { lang, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [rodoConsent, setRodoConsent] = useState(false);
  const [attachment, setAttachment] = useState<AttachmentMeta | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelected = (file: File | undefined) => {
    if (!file) return;
    const meta: AttachmentMeta = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    const check = validateAttachment(meta);
    if (!check.valid && check.errorKey) {
      setAttachment(null);
      setErrors((prev) => ({ ...prev, attachment: check.errorKey }));
      toast.error(t.contact.errors[check.errorKey] ?? t.contact.errorToastTitle);
      return;
    }
    setAttachment(meta);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.attachment;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      fullName,
      email,
      phone,
      city,
      message,
      rodoConsent,
      attachment,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      toast.error(t.contact.errorToastTitle);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);

    toast.success(t.contact.successToastTitle, {
      description: attachment
        ? `${t.contact.successToastDesc} (${attachment.name})`
        : t.contact.successToastDesc,
    });

    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setMessage('');
    setRodoConsent(false);
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  return (
    <section id="kontakt" className="scroll-mt-24">
      <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          {t.contact.sectionTitle}
        </h2>
        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
          {t.contact.sectionMeta}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-[10px]">
        <div className="bg-[var(--surface-primary)] p-7 sm:p-9 rounded-[2px] flex flex-col justify-between gap-8">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">
              {t.contact.studioLabel}
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] mb-4">
              {t.nav.brand}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.contact.offices}</p>
          </div>

          <div className="space-y-4 border-t border-[var(--border-hairline)] pt-6">
            <div>
              <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                {t.contact.phoneLabel}
              </div>
              <a
                href="tel:+48224109820"
                className="font-mono-tech text-base font-medium hover:text-[var(--accent-primary)] transition-colors"
              >
                +48 22 410 98 20
              </a>
            </div>
            <div>
              <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                {t.contact.emailLabel}
              </div>
              <a
                href="mailto:studio@krawczyk-architektura.pl"
                className="font-mono-tech text-base font-medium hover:text-[var(--accent-primary)] transition-colors"
              >
                studio@krawczyk-architektura.pl
              </a>
            </div>
            <div>
              <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                {t.contact.hoursLabel}
              </div>
              <div className="text-sm text-[var(--text-primary)] mt-0.5">
                {t.contact.hoursValue}
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[var(--surface-primary)] p-7 sm:p-9 rounded-[2px] space-y-5"
        >
          {attachedEstimate && (
            <div className="bg-[var(--surface-inverted)] text-[var(--text-on-dark)] p-4 rounded-[2px] border-l border-[var(--accent-primary)] flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="font-mono-tech text-[11px] text-[var(--text-on-dark-muted)]">
                  {t.contact.attachedEstimateTitle}
                </div>
                <div className="font-mono-tech text-sm font-medium mt-1">
                  {attachedEstimate.state.areaM2} m² ·{' '}
                  {t.calculator.tiers[attachedEstimate.state.tier].title} ·{' '}
                  {lang === 'pl'
                    ? formatPLN(attachedEstimate.breakdown.totalPLN)
                    : `${attachedEstimate.breakdown.totalPLN.toLocaleString('en-US')} PLN`}
                </div>
              </div>
              <button
                type="button"
                onClick={onClearEstimate}
                className="font-mono-tech text-xs px-2.5 py-1 border border-[#3A3D37] rounded-[2px] hover:border-[var(--accent-primary)] cursor-pointer"
              >
                {t.contact.detachEstimate}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
                {t.contact.fields.fullName}
              </label>
              <input
                id="contact-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.contact.fields.fullNamePlaceholder}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-hairline)] rounded-[2px] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              />
              {errors.fullName && (
                <p className="text-xs text-[var(--error)] mt-1">{t.contact.errors[errors.fullName]}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                {t.contact.fields.email}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.fields.emailPlaceholder}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-hairline)] rounded-[2px] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              />
              {errors.email && (
                <p className="text-xs text-[var(--error)] mt-1">{t.contact.errors[errors.email]}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">
                {t.contact.fields.phone}
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.contact.fields.phonePlaceholder}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-hairline)] rounded-[2px] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              />
              {errors.phone && (
                <p className="text-xs text-[var(--error)] mt-1">{t.contact.errors[errors.phone]}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-city" className="block text-sm font-medium mb-1.5">
                {t.contact.fields.city}
              </label>
              <input
                id="contact-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.contact.fields.cityPlaceholder}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-hairline)] rounded-[2px] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
              {t.contact.fields.message}
            </label>
            <textarea
              id="contact-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contact.fields.messagePlaceholder}
              className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-hairline)] rounded-[2px] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              {t.contact.fields.attachmentLabel}
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileSelected(e.dataTransfer.files?.[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-[2px] p-4 cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-primary)] hover:border-[var(--text-muted)]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileSelected(e.target.files?.[0])}
                className="sr-only"
              />

              {attachment ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCheck2 className="w-5 h-5 text-[var(--success)] shrink-0" />
                    <div className="truncate">
                      <span className="text-sm font-medium block truncate">{attachment.name}</span>
                      <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                        {formatFileSize(attachment.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAttachment(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="inline-flex items-center gap-1 font-mono-tech text-xs px-2.5 py-1 bg-[var(--surface-secondary)] rounded-[2px] hover:text-[var(--error)] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t.contact.fields.attachmentRemove}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <Upload className="w-5 h-5 shrink-0 text-[var(--accent-primary)]" />
                  <span>{t.contact.fields.attachmentHint}</span>
                </div>
              )}
            </div>
            {errors.attachment && (
              <p className="text-xs text-[var(--error)] mt-1">{t.contact.errors[errors.attachment]}</p>
            )}
          </div>
          <div>
            <label className="flex items-start gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rodoConsent}
                onChange={(e) => setRodoConsent(e.target.checked)}
                className="mt-1 accent-[var(--accent-primary)] w-4 h-4 rounded-[2px]"
              />
              <span className="text-[var(--text-muted)]">
                {t.contact.fields.rodoLabel}{' '}
                <Link
                  href="/polityka-prywatnosci"
                  className="underline text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                >
                  {t.contact.fields.rodoLink}
                </Link>
                .
              </span>
            </label>
            {errors.rodoConsent && (
              <p className="text-xs text-[var(--error)] mt-1">{t.contact.errors[errors.rodoConsent]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-60 text-white font-semibold text-sm rounded-[2px] transition-colors cursor-pointer"
          >
            {isSubmitting ? t.contact.fields.submittingBtn : t.contact.fields.submitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}
