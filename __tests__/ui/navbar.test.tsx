import Navbar from "@/components/navbar/Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  it("shows a logo with a link to home page", () => {
    render(<Navbar />);

    const logo = screen.getByRole("link", { name: /car rental/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});
