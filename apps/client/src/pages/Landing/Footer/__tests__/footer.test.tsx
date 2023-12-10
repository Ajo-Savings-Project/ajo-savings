import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { HEADER_TITLE } from '../../../../appConstants'
import Footer from '../index.tsx'

describe('<Footer />', () => {
  it('should render correctly', function () {
    render(<Footer />)

    expect(screen.getByText(HEADER_TITLE)).toBeInTheDocument()

    const supportEmailLink = screen.getByTestId('support-email')
    expect(supportEmailLink).toBeInTheDocument()
    expect(supportEmailLink).toHaveAttribute(
      'href',
      'mailto:helpsupport@easylend.com'
    )

    const socialIcons = screen.getAllByTestId('socials')
    expect(socialIcons).toHaveLength(3)

    expect(
      screen.getByText('© 2023 EasyLend. All rights reserved')
    ).toBeInTheDocument()
  })
})
