import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Avatar from "@/components/Avatar"

describe("Avatar", () => {
  it("renders successfully", () => {
    render(<Avatar name="JohnDoe" />)
    const avatar = screen.getByRole("img")
    expect(avatar).toBeInTheDocument()
  })

  it("displays uppercase letters from name", () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByText("A")).toBeInTheDocument()
  })

  it("displays first two uppercase letters when available", () => {
    render(<Avatar name="JohnDoe" />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("handles names with multiple uppercase letters", () => {
    render(<Avatar name="JohnDoeSmithBrownGreenWhiteBlackGrayBlue" />)
    expect(screen.getByText("JDSBGWBGB")).toBeInTheDocument()
  })
})
