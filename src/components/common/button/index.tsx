import React, { forwardRef } from 'react'
import { StyledButton } from './styles'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, color = 'primary', variant = 'contained', size = 'medium', ...props },
    ref,
  ): JSX.Element => {
    return (
      <StyledButton {...{ color, variant, size, ref, ...props }}>{children}</StyledButton>
    )
  },
)

Button.displayName = 'Button'
Button.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'medium',
}
export default Button
