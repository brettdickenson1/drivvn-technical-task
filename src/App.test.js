import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders snap title", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/snap/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders draw card button", () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/draw card/i);
  expect(buttonElement).toBeInTheDocument();
});

test("displays remaining cards", () => {
  const { getByText } = render(<App />);
  const remainingCardsElement = getByText(/remaining cards:/i);
  expect(remainingCardsElement).toBeInTheDocument();
});
