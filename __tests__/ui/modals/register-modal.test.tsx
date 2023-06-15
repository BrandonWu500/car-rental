import RegisterModal from "@/components/modals/RegisterModal";
import { render, screen } from "@testing-library/react";

describe("RegisterModal", () => {
  it("displays a heading", () => {
    render(<RegisterModal />);

    const title = screen.getByRole("heading", {
      name: /Welcome to Car Rental!/i,
    });
    const subtitle = screen.getByText(/Create an account/i);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should have an email input", () => {
    render(<RegisterModal />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
});
