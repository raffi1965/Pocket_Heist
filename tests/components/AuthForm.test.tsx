import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AuthForm from "@/components/AuthForm";

describe("AuthForm", () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("renders login form with all required fields", () => {
      render(<AuthForm mode="login" />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    });

    it("renders signup form with all required fields", () => {
      render(<AuthForm mode="signup" />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign up/i }),
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/remember me/i)).not.toBeInTheDocument();
    });

    it("displays correct submit button label based on mode", () => {
      const { rerender } = render(<AuthForm mode="login" />);
      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();

      rerender(<AuthForm mode="signup" />);
      expect(
        screen.getByRole("button", { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it("displays link to switch to signup from login", () => {
      render(<AuthForm mode="login" />);
      const link = screen.getByRole("link", { name: /sign up/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/signup");
    });

    it("displays link to switch to login from signup", () => {
      render(<AuthForm mode="signup" />);
      const link = screen.getByRole("link", { name: /log in/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/login");
    });
  });

  describe("Password Visibility Toggle", () => {
    it("password field defaults to masked/hidden state", () => {
      render(<AuthForm mode="login" />);
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("toggles password visibility when clicking the eye icon", () => {
      render(<AuthForm mode="login" />);
      const passwordInput = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByRole("button", {
        name: /show password/i,
      });

      // Initially hidden
      expect(passwordInput).toHaveAttribute("type", "password");

      // Click to show
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");

      // Click to hide again
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("updates toggle button aria-label based on state", () => {
      render(<AuthForm mode="login" />);
      const toggleButton = screen.getByRole("button", {
        name: /show password/i,
      });

      fireEvent.click(toggleButton);
      expect(
        screen.getByRole("button", { name: /hide password/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("logs correct values to console on valid login submission", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith({
          mode: "login",
          email: "test@example.com",
          password: "password123",
          rememberMe: false,
        });
      });
    });

    it("logs correct values to console on valid signup submission", async () => {
      render(<AuthForm mode="signup" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /sign up/i });

      fireEvent.change(emailInput, { target: { value: "new@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "newpassword" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith({
          mode: "signup",
          email: "new@example.com",
          password: "newpassword",
        });
      });
    });

    it("includes rememberMe value when checked in login mode", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(rememberMeCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith({
          mode: "login",
          email: "test@example.com",
          password: "password123",
          rememberMe: true,
        });
      });
    });

    it("shows loading state when form is submitted", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      expect(
        screen.getByRole("button", { name: /loading/i }),
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  describe("Form Validation", () => {
    it("prevents submission with empty email field", async () => {
      render(<AuthForm mode="login" />);

      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("prevents submission with empty password field", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("prevents submission with invalid email format", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: "notanemail" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email address/i),
        ).toBeInTheDocument();
      });

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("marks invalid fields with aria-invalid", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /log in/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveAttribute("aria-invalid", "true");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("submits form when Enter key is pressed in email field", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.keyDown(emailInput, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalled();
      });
    });

    it("submits form when Enter key is pressed in password field", async () => {
      render(<AuthForm mode="login" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.keyDown(passwordInput, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalled();
      });
    });
  });
});
