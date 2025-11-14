import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("./data/books", () => [
  { id: 1, title: "Atomic Habits", author: "James Clear", copies: 3 },
  { id: 2, title: "Deep Work", author: "Cal Newport", copies: 2 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", copies: 1 },
]);


describe("Library Management App", () => {
  let App;

  beforeEach(() => {
    jest.isolateModules(() => {
      App = require("./App").default;
    });
  });

  test("renders available books list", () => {
    render(<App />);

    expect(screen.getByText(/Available Books/i)).toBeInTheDocument();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
  });

  test("user can borrow a book and library updates copies", () => {
    render(<App />);

    const borrowBtn = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    fireEvent.click(borrowBtn);

    const borrowedSection = screen.getByText(/My Borrowed Books/i).parentElement;
    expect(borrowedSection.textContent).toContain("Atomic Habits");

    const availableSection = screen.getByText(/Available Books/i).parentElement;
    expect(availableSection.textContent).toContain("2 copies");
  });

  test("borrowing a book with single copy removes it", () => {
    render(<App />);

    const borrowBtn = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Clean Code"));

    fireEvent.click(borrowBtn);

    const available = screen.getByText(/Available Books/i).parentElement;
    expect(available.textContent).not.toContain("Clean Code");

    const borrowed = screen.getByText(/My Borrowed Books/i).parentElement;
    expect(borrowed.textContent).toContain("Clean Code");
  });

  test("cannot borrow more than 2 books", () => {
    render(<App />);

    const b1 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    const b2 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Deep Work"));

    const b3 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Clean Code"));

    fireEvent.click(b1);
    fireEvent.click(b2);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(b3);

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Borrowing limit reached/)
    );

    alertSpy.mockRestore();
  });

  test("cannot borrow same book twice", () => {
    render(<App />);

    const b1 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    fireEvent.click(b1);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(b1);

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/already borrowed/)
    );

    alertSpy.mockRestore();
  });

  test("returning a book restores it to the library", () => {
    render(<App />);

    const b1 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    fireEvent.click(b1);

    const returnBtn = screen
      .getAllByText("Return")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    fireEvent.click(returnBtn);

    const borrowed = screen.getByText(/My Borrowed Books/i).parentElement;
    expect(borrowed.textContent).not.toContain("Atomic Habits");

    const available = screen.getByText(/Available Books/i).parentElement;
    expect(available.textContent).toContain("Atomic Habits");
  });

  test("returning both books empties borrowed list", () => {
    render(<App />);

    const b1 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Atomic Habits"));

    const b2 = screen
      .getAllByText("Borrow")
      .find((btn) => btn.parentElement.textContent.includes("Deep Work"));

    fireEvent.click(b1);
    fireEvent.click(b2);

    screen.getAllByText("Return").forEach((btn) => fireEvent.click(btn));

    expect(
      screen.getByText(/You have not borrowed any books/i)
    ).toBeInTheDocument();
  });
});


describe("Library empty state", () => {
  test("shows empty library when no books exist", () => {
    jest.resetModules();

    jest.doMock("./data/books", () => ({
      __esModule: true,
      default: []
    }));

    let AppEmpty;

    jest.isolateModules(() => {
      AppEmpty = require("./App").default;
    });

    render(<AppEmpty />);

    expect(
      screen.getByText(/No books available in the library/i)
    ).toBeInTheDocument();
  });
});
