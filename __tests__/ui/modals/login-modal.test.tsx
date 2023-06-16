import LoginModal from "@/components/modals/LoginModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LoginModal", () => {
  it("displays a heading", () => {
    render(<LoginModal />);

    const title = screen.getByRole("heading", {
      name: /Welcome back!/i,
    });
    const subtitle = screen.getByText(/Login to your account/i);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should have an email input", () => {
    render(<LoginModal />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });

  it("should have a password input", () => {
    render(<LoginModal />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("should have a show/hide password button", async () => {
    const user = userEvent.setup();
    render(<LoginModal />);

    const showPasswordBtn = screen.getByRole("button", { name: /show/i });
    expect(showPasswordBtn).toBeInTheDocument();

    await user.click(showPasswordBtn);

    const hidePasswordBtn = screen.getByRole("button", { name: /hide/i });
    expect(hidePasswordBtn).toBeInTheDocument();

    await user.click(showPasswordBtn);

    const showPasswordBtnAgain = screen.getByRole("button", { name: /show/i });
    expect(showPasswordBtnAgain).toBeInTheDocument();
  });

  it("should have a google signin button", () => {
    render(<LoginModal />);

    const googleSigninBtn = screen.getByRole("button", {
      name: /continue with google/i,
    });
    expect(googleSigninBtn).toBeInTheDocument();
  });

  it("should have a link to register if user is new", () => {
    render(<LoginModal />);

    expect(
      screen.getByText(/First time using Car Rental\?/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });
});
