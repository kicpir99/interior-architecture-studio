export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_ATTACHMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export interface AttachmentMeta {
  name: string;
  size: number;
  type: string;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  message?: string;
  rodoConsent: boolean;
  attachment: AttachmentMeta | null;
}

export type ValidationErrors = Partial<
  Record<'fullName' | 'email' | 'phone' | 'rodoConsent' | 'attachment', string>
>;

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateAttachment(file: AttachmentMeta | null): {
  valid: boolean;
  errorKey?: string;
} {
  if (!file) {
    return { valid: true };
  }

  if (file.size <= 0) {
    return { valid: false, errorKey: 'file_empty' };
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    return { valid: false, errorKey: 'file_too_large' };
  }

  const normalizedType = file.type.toLowerCase();
  const isAllowedMime = (ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(normalizedType);
  if (!isAllowedMime) {
    return { valid: false, errorKey: 'file_invalid_type' };
  }

  return { valid: true };
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: ValidationErrors = {};

  const trimmedName = input.fullName.trim();
  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.fullName = 'name_too_short';
  }

  const trimmedEmail = input.email.trim();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'email_invalid';
  }

  if (input.phone && input.phone.trim().length > 0) {
    const digitsCount = input.phone.replace(/\D/g, '').length;
    if (digitsCount < 7) {
      errors.phone = 'phone_invalid';
    }
  }

  if (!input.rodoConsent) {
    errors.rodoConsent = 'rodo_required';
  }

  const fileCheck = validateAttachment(input.attachment);
  if (!fileCheck.valid && fileCheck.errorKey) {
    errors.attachment = fileCheck.errorKey;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
