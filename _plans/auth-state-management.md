# Implementation Plan: Auth User Hook

## Overview
Implement a global authentication management solution with a `useUser` hook that provides real-time user state access throughout the application.

## Implementation Steps

### 1. Create Auth Context Provider (`lib/auth/AuthContext.tsx`)
- Create React Context with `user`, `isLoading`, and `error` state
- Implement `onAuthStateChanged` listener from Firebase Auth
- Map Firebase User to custom user object with `uid`, `email`, `displayName`
- Handle listener cleanup on unmount
- Export `AuthProvider` component

### 2. Create useUser Hook (`lib/auth/useUser.ts`)
- Simple hook that consumes AuthContext
- Returns `{ user, isLoading, error }`
- Throws error if used outside AuthProvider

### 3. Wrap App with AuthProvider (`app/layout.tsx`)
- Import and wrap root layout children with `<AuthProvider>`
- Ensures global auth state availability throughout app

### 4. Create barrel export (`lib/auth/index.ts`)
- Export `useUser` hook
- Export `AuthProvider` component
- Single import location: `@/lib/auth`

### 5. Write Tests (`tests/lib/auth/useUser.test.tsx`)
- Test hook returns null when logged out
- Test hook returns user object when logged in
- Test state updates propagate to multiple components
- Test cleanup prevents memory leaks
- Mock Firebase `onAuthStateChanged`

## Files to Create
- `lib/auth/AuthContext.tsx`
- `lib/auth/useUser.ts`
- `lib/auth/index.ts`
- `tests/lib/auth/useUser.test.tsx`

## Files to Modify
- `app/layout.tsx`

## Technical Notes
- Use Firebase Auth `onAuthStateChanged` for real-time listener
- Context API for global state management
- No caching - rely purely on Firebase auth state
- Return fields: `uid`, `email`, `displayName`

## Out of scope
Per spec these are explicitly excluded
- Lofin/signup/logout flow implementation
- Firebase auth integration in LoginForm/SighnOut forms
- Logout button or user menu
- Do NOT use the hook anywhere in the application yet  
