import Navbar from "@/components/navbar/Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  it("shows a logo with a link to home page", () => {
    render(<Navbar />);

    const logo = screen.getByRole("link", { name: /car rental/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("shows a search bar with filters and search button", () => {
    render(<Navbar />);

    const locationText = screen.getByText(/anywhere/i);
    const dateText = screen.getByText(/any week/i);
    const passengerText = screen.getByText(/add passengers/i);
    const searchBtn = screen.getByRole("button", { name: /search/i });

    expect(locationText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    expect(passengerText).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it("shows a user menu btn along with link to list car for rental", () => {
    render(<Navbar />);

    const listCarText = screen.getByText(/rent out your car/i);
    expect(listCarText).toBeInTheDocument();

    const userAvatarImg = screen.getByRole("img", { name: /user avatar/i });
    expect(userAvatarImg).toBeInTheDocument();

    const userMenuBtn = screen.getByRole("button", { name: /user menu/i });
    expect(userMenuBtn).toBeInTheDocument();
  });
});
