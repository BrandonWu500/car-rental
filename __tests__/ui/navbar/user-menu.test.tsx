import UserMenu from "@/components/navbar/UserMenu";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("UserMenu", () => {
  it("shows login and sign up links if user is not logged in", async () => {
    const user = userEvent.setup();
    render(<UserMenu currentUser={null} />);

    const menuToggleBtn = screen.getByRole("button", { name: /user menu/i });
    expect(menuToggleBtn).toBeInTheDocument();
    await user.click(menuToggleBtn);

    const loginLink = screen.getByText(/login/i);
    const signUpLink = screen.getByText(/sign up/i);

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
});
