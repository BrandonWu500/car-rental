import RegisterModal from "@/components/modals/RegisterModal";
import { render } from "@testing-library/react";

describe("RegisterModal", () => {
  it("displays a heading", () => {
    render(<RegisterModal />);
  });
});
