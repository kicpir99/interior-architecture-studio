import { describe, it, expect } from 'vitest';
import {
  MAX_ATTACHMENT_BYTES,
  validateAttachment,
  validateContactForm,
} from '../validation';

describe('validateAttachment & validateContactForm', () => {
  it('accepts a valid contact form without attachment', () => {
    const res = validateContactForm({
      fullName: 'Jan Kowalski',
      email: 'jan@kowalski.pl',
      phone: '+48 600 100 200',
      city: 'Warszawa',
      message: 'Proszę o wycenę wykończenia mieszkania.',
      rodoConsent: true,
      attachment: null,
    });

    expect(res.valid).toBe(true);
    expect(res.errors).toEqual({});
  });

  it('accepts a PDF attachment at exact 10 MB boundary', () => {
    const res = validateAttachment({
      name: 'rzut-mieszkania.pdf',
      size: MAX_ATTACHMENT_BYTES,
      type: 'application/pdf',
    });

    expect(res.valid).toBe(true);
    expect(res.errorKey).toBeUndefined();
  });

  it('rejects an attachment larger than 10 MB', () => {
    const res = validateAttachment({
      name: 'duzy-rzut.pdf',
      size: MAX_ATTACHMENT_BYTES + 1,
      type: 'application/pdf',
    });

    expect(res.valid).toBe(false);
    expect(res.errorKey).toBe('file_too_large');
  });

  it('rejects an empty 0-byte attachment', () => {
    const res = validateAttachment({
      name: 'pusty.png',
      size: 0,
      type: 'image/png',
    });

    expect(res.valid).toBe(false);
    expect(res.errorKey).toBe('file_empty');
  });

  it('rejects disallowed file MIME types such as zip or exe', () => {
    const resZip = validateAttachment({
      name: 'archiwum.zip',
      size: 1024,
      type: 'application/zip',
    });
    expect(resZip.valid).toBe(false);
    expect(resZip.errorKey).toBe('file_invalid_type');
  });

  it('validates required fields, email format, RODO consent and optional phone length', () => {
    const invalid = validateContactForm({
      fullName: 'J',
      email: 'niepoprawny-email',
      phone: '123',
      city: '',
      message: '',
      rodoConsent: false,
      attachment: null,
    });

    expect(invalid.valid).toBe(false);
    expect(invalid.errors.fullName).toBe('name_too_short');
    expect(invalid.errors.email).toBe('email_invalid');
    expect(invalid.errors.phone).toBe('phone_invalid');
    expect(invalid.errors.rodoConsent).toBe('rodo_required');
  });
});
