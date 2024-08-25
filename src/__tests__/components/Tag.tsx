import { cleanup, render, screen } from '@testing-library/react'
import * as matchers from "@testing-library/jest-dom/matchers"
// 
import Tag from "../../components/Tag"

expect.extend(matchers)

afterEach(() => {
    cleanup()
})

describe('Tag', () => {
    test('renders Tag', () => {

        render(<Tag>example</Tag>)

        expect(screen.getByText('#example')).toBeInTheDocument()
    })
})