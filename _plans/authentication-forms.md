# Implementation Plan for Authentication Forms

## Overview
Implement authentication forms for `/login` and `/signup` pages with email/password fields, password visibility toggle, form validation, and console logging.

## Tasks

### 1. Create shared AuthForm component
- **File**: `components/AuthForm/AuthForm.tsx`
- Email input field with type="email" and validation
- Password input field with visibility toggle
- Eye icon button (SVG) to show/hide password
- Submit button with dynamic label ("Log In" or "Sign Up")
- Form validation (required fields, email format)
- Console logging on form submission
- "Remember me" checkbox (for login mode)
- Loading state for submit button
- Navigation link to switch between login/signup

### 2. Create CSS Module for AuthForm
- **File**: `components/AuthForm/AuthForm.module.css`
- Form container styles
- Input field styles with focus states
- Password toggle icon button styles
- Submit button styles
- Checkbox styles for "Remember me"
- Link styles for switching between forms
- Error/validation message styles

### 3. Create barrel export
- **File**: `components/AuthForm/index.ts`

### 4. Update login page
- **File**: `app/(public)/login/page.tsx`
- Replace placeholder with `<AuthForm mode="login" />`
- Include link to signup page

### 5. Update signup page
- **File**: `app/(public)/signup/page.tsx`
- Replace placeholder with `<AuthForm mode="signup" />`
- Include link to login page

### 6. Create comprehensive tests
- **File**: `tests/components/AuthForm.test.tsx`
- Test form rendering with all required fields
- Test password visibility toggle functionality
- Test form submission and console logging
- Test validation for empty fields
- Test validation for invalid email format
- Test "Remember me" checkbox (login mode only)
- Test loading state on submit
- Test keyboard navigation and Enter key submission

## Implementation Notes
- Use `"use client"` directive for client-side interactivity
- Follow project conventions: CSS Modules with @apply directive
- Use controlled components with React state
- Implement proper accessibility (labels, ARIA attributes)
- Password field defaults to hidden state
- Form prevents submission when invalid
