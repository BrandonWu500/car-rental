import RegisterModal from "@/components/modals/RegisterModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("should have a name input", () => {
    render(<RegisterModal />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    expect(nameInput).toBeInTheDocument();
  });

  it("should have a password input", () => {
    render(<RegisterModal />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("should have a show/hide password button", async () => {
    const user = userEvent.setup();
    render(<RegisterModal />);

    const showPasswordBtn = screen.getByRole("button", { name: /show/i });
    expect(showPasswordBtn).toBeInTheDocument();

    await user.click(showPasswordBtn);

    const hidePasswordBtn = screen.getByRole("button", { name: /hide/i });
    expect(hidePasswordBtn).toBeInTheDocument();

    await user.click(showPasswordBtn);

    const showPasswordBtnAgain = screen.getByRole("button", { name: /show/i });
    expect(showPasswordBtnAgain).toBeInTheDocument();
  });
});
