import Modal from "@/components/modals/Modal";
import { render, screen } from "@testing-library/react";

describe("Modal", () => {
  it("should have a button to close the modal", () => {
    render(
      <Modal isOpen onClose={() => {}} onSubmit={() => {}} actionLabel="test" />
    );

    const closeBtn = screen.getByRole("button", { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });
});
