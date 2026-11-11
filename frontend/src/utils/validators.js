/**
 * validators.js — Form validation helpers
 */

export const isRequired = (value) =>
  !value || String(value).trim() === "" ? "This field is required." : null;

export const isPositiveNumber = (value) => {
  const num = Number(value);
  if (isNaN(num) || num <= 0) return "Must be a positive number.";
  return null;
};

export const isEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !pattern.test(value) ? "Enter a valid email address." : null;
};

export const minLength = (min) => (value) =>
  !value || value.length < min ? `Must be at least ${min} characters.` : null;

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or fewer.` : null;

export const isDateString = (value) => {
  if (!value) return "Date is required.";
  const d = new Date(value);
  return isNaN(d.getTime()) ? "Enter a valid date." : null;
};

/** Run an array of validator functions and return first error, or null */
export const validate = (value, validators) => {
  for (const fn of validators) {
    const error = fn(value);
    if (error) return error;
  }
  return null;
};

/** Validate a whole form object: { field: [validators] } → { field: errorMsg | null } */
export const validateForm = (data, rules) => {
  const errors = {};
  for (const [field, validators] of Object.entries(rules)) {
    errors[field] = validate(data[field], validators);
  }
  return errors;
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);
