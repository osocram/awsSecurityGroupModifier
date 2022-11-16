import styled, { css } from 'styled-components'
import { TypographyProps } from './'

type VariantSchemaType = {
  [key in NonNullable<TypographyProps['variant']>]: {
    fontSize: string
    fontWeight: number
    lineHeight: string
  }
}
type ColorSchemaType = {
  [key in NonNullable<TypographyProps['color']>]: string
}

export const StyledTypography = styled.div<Partial<TypographyProps>>`
  ${({ theme, color, variant, align }) => {
    const {
      colors: { text, primary, secondary, white },
    } = theme

    const variants: VariantSchemaType = {
      h1: {
        fontSize: '3.052rem',
        fontWeight: 700,
        lineHeight: '3.815rem',
      },
      h2: {
        fontSize: '2.441rem',
        fontWeight: 700,
        lineHeight: '2.953rem',
      },
      h3: {
        fontSize: '1.953rem',
        fontWeight: 700,
        lineHeight: '2.369rem',
      },
      h4: {
        fontSize: '1.563rem',
        fontWeight: 700,
        lineHeight: '1.953rem',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: '1.563rem',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: '1.25rem',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '2rem',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
      },
    }

    const colors: ColorSchemaType = {
      primary,
      secondary,
      default: text,
      white,
    }

    const fontVariant = variants[variant!]
    return css`
      color: ${colors[color!]};
      font-size: ${fontVariant.fontSize};
      text-align: ${align ?? 'left'};
      font-weight: ${fontVariant.fontWeight};
      line-height: ${fontVariant.lineHeight};
    `
  }}
`
