import styled, { css } from 'styled-components'
import { alpha } from 'theme'
import { ButtonProps } from './'

type SizeType = {
  [key in NonNullable<ButtonProps['size']>]: {
    fontSize: string
    padding: string
  }
}

type ColorSchemaType = {
  [key in NonNullable<ButtonProps['color']>]: {
    [key in NonNullable<ButtonProps['variant']>]: {
      color: string
      backgroundColor: string
      borderColor: string
      hover: {
        color: string
        backgroundColor: string
        borderColor: string
      }
    }
  }
}

export const StyledButton = styled.button<Partial<ButtonProps>>`
  ${({ theme, color, variant, size }) => {
    const {
      colors: { primary, secondary, text, white },
    } = theme

    const variants: ColorSchemaType = {
      primary: {
        contained: {
          color: white,
          backgroundColor: primary,
          borderColor: primary,
          hover: {
            color: white,
            backgroundColor: alpha(primary, 0.7),
            borderColor: alpha(primary, 0.8),
          },
        },
        outlined: {
          color: primary,
          backgroundColor: alpha(primary, 0.1),
          borderColor: primary,
          hover: {
            color: primary,
            backgroundColor: alpha(primary, 0.3),
            borderColor: primary,
          },
        },
        text: {
          color: primary,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          hover: {
            color: alpha(primary, 0.8),
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
        },
      },
      secondary: {
        contained: {
          color: text,
          backgroundColor: secondary,
          borderColor: secondary,
          hover: {
            color: text,
            backgroundColor: alpha(secondary, 0.8),
            borderColor: alpha(secondary, 0.8),
          },
        },
        outlined: {
          color: secondary,
          backgroundColor: alpha(secondary, 0.1),
          borderColor: secondary,
          hover: {
            color: secondary,
            backgroundColor: alpha(secondary, 0.2),
            borderColor: secondary,
          },
        },
        text: {
          color: secondary,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          hover: {
            color: alpha(secondary, 0.8),
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
        },
      },
    }

    const sizes: SizeType = {
      small: {
        fontSize: '0.75rem',
        padding: '0.5rem 1rem',
      },
      medium: {
        fontSize: '1rem',
        padding: '0.75rem 1.5rem',
      },
      large: {
        fontSize: '1.25rem',
        padding: '1rem 2rem',
      },
    }

    const themeColor = variants[color!][variant!]
    return css`
      outline: none;
      border: 1px solid ${themeColor.borderColor};
      background: ${themeColor.backgroundColor};
      border-radius: 0.25rem;
      color: ${themeColor.color};
      cursor: pointer;
      font-size: ${sizes[size!].fontSize};
      padding: ${sizes[size!].padding};

      &:hover {
        background: ${themeColor.hover.backgroundColor};
      }

      &:focus {
        outline: none;
      }

      &:not(:disabled) {
        transition: all 0.2s ease-in-out;
      }

      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    `
  }}
`
