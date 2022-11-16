import styled, { css } from 'styled-components'
import { FlexboxProps } from './'

export const StyledFlexbox = styled.div<Partial<FlexboxProps>>`
  ${({
    direction,
    alignItems,
    gap,
    justifyContent,
    noWrap,
    width,
    height,
    fullHeight = false,
    fullScreen = false,
    fullWidth = false,
  }) => css`
    display: flex;
    flex-direction: ${direction ?? 'row'};
    align-items: ${alignItems ?? 'stretch'};
    justify-content: ${justifyContent ?? 'flex-start'};
    gap: ${gap ?? '0'};
    flex-wrap: ${noWrap ? 'nowrap' : 'wrap'};
    width: ${fullWidth ? '100%' : fullScreen ? '100vw' : width ?? 'auto'};
    height: ${fullHeight ? '100%' : fullScreen ? '100vh' : height ?? 'auto'};
    padding: 0;
    margin: 0;
  `}
`
