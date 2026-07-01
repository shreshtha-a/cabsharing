import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import * as service from "../../services/rideService";

jest.mock("../../services/rideService");

describe("ForgotPassword page", () => {
  it("shows success modal after send", async () => {
    service.authService.forgotPassword = jest.fn().mockResolvedValue({});
    render(<ForgotPassword />);

    const input = screen.getByPlaceholderText(/enter your registered email/i);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    const btn = screen.getByRole("button", { name: /send reset link/i });
    fireEvent.click(btn);

    await waitFor(() => expect(service.authService.forgotPassword).toHaveBeenCalled());
    expect(await screen.findByText(/reset link sent/i)).toBeInTheDocument();
  });
});
