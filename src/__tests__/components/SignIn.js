import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { SignInContainer } from "../../pages/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      await waitFor(() => {
        fireEvent.changeText(screen.getByPlaceholderText("username"), "kalle");
      });
      await waitFor(() => {
        fireEvent.changeText(
          screen.getByPlaceholderText("password"),
          "password"
        );
      });
      await waitFor(() => {
        fireEvent.press(screen.getByTestId("signInButton"));
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
