import React, { forwardRef } from 'react'
import { StyledTypography } from './styles'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2'
  color?: 'primary' | 'secondary' | 'default' | 'white'
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  noWrap?: boolean
  gutterBottom?: boolean
  as?: keyof JSX.IntrinsicElements
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ children, ...props }, ref): JSX.Element => {
    const { as = 'div', variant = 'body1', color = 'default', ...rest } = props

    return (
      <StyledTypography {...{ as, variant, color, ref, ...rest }}>
        {children}
      </StyledTypography>
    )
  },
)

Typography.displayName = 'Typography'

export default Typography
