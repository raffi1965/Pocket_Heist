# Spec for Auth User Hook

branch: claude/feature/auth-user-hook
figma_component (if used): N/A

## Summary

Create a global authentication management solution that provides real-time user state access throughout the application via a `useUser` hook. The hook returns the current authenticated user object when logged in, or null when logged out. This spec focuses only on the global listener and state management infrastructure - login, signup, and logout flows are out of scope.

## Functional Requirements

- Provide a `useUser()` hook that can be called from any component or page
- Hook returns current user object when authenticated, or null when logged out
- Implement real-time listener that automatically updates user state across all components when authentication status changes
- User state must be globally accessible and synchronized across the entire application
- State updates should propagate immediately to all components using the hook
- Hook should integrate with Firebase Authentication (already set up in the project)
- No loading states or authentication flows required at this stage - only the listener infrastructure

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- Multiple components calling `useUser()` simultaneously should receive consistent state
- User state changes should propagate immediately without manual refetching
- Hook should handle Firebase auth state changes (e.g., token expiration, session changes)
- Should handle cases where Firebase is still initializing
- Components that unmount should properly clean up listeners to prevent memory leaks

## Acceptance Criteria

- `useUser()` hook is available and can be imported from a centralized location
- Hook returns `null` when no user is authenticated
- Hook returns user object with relevant fields (uid, email, displayName, etc.) when authenticated
- Real-time listener automatically updates all components using the hook when auth state changes
- Multiple components can use the hook simultaneously without conflicts
- Auth state is managed globally (likely via Context API or similar)
- No console errors or memory leaks from listener subscriptions

## Open Questions

- Should we expose additional authentication utilities beyond just the user state (e.g., `isLoading`, `error`)? yes
- What specific user fields should be included in the returned user object? email, uid, displayName
- Should we cache user data or rely purely on Firebase auth state? rely purely on Firebase auth state

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Hook returns null when user is logged out
- Hook returns user object when user is logged in
- User state updates propagate to all components using the hook
- Multiple components can use the hook simultaneously
- Cleanup prevents memory leaks when components unmount
