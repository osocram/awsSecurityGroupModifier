import React, { FC } from 'react'
import { StyledFlexbox } from './styles'

export interface FlexboxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  noWrap?: boolean
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  gap?: string
  width?: string
  height?: string
  fullScreen?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}

const Flexbox: FC<FlexboxProps> = ({ children, ...rest }): JSX.Element => {
  return <StyledFlexbox {...rest}>{children}</StyledFlexbox>
}

export default Flexbox
