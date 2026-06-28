import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPassword from "../ResetPassword";
import * as service from "../../services/rideService";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services/rideService");

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("ResetPassword page", () => {
  it("shows success modal when reset succeeds", async () => {
    service.authService.resetPassword = jest.fn().mockResolvedValue({});
    // Set window location with token
    const original = window.location;
    delete window.location;
    window.location = new URL("http://localhost/auth/reset?token=abc123");

    renderWithRouter(<ResetPassword />);

    const pw = screen.getByPlaceholderText(/enter your new password/i);
    const cpw = screen.getByPlaceholderText(/confirm your new password/i);
    fireEvent.change(pw, { target: { value: "password123" } });
    fireEvent.change(cpw, { target: { value: "password123" } });
    const btn = screen.getByRole("button", { name: /reset password/i });
    fireEvent.click(btn);

    await waitFor(() => expect(service.authService.resetPassword).toHaveBeenCalled());
    expect(await screen.findByText(/password reset/i)).toBeInTheDocument();

    window.location = original;
  });
});
