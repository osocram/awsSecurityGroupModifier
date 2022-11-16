import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0) scale(1);
    margin-left: -8px;
  }
  to {
    transform: rotate(360deg) scale(1.2);
    margin-left: 0px;
  }
`

export const LanguageLink = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  margin-left: -5px;
  & > button {
    display: inline-block;
    width: 35px;
    height: 35px;
    text-decoration: none;
    color: transparent;
    font-size: 1.5rem;
    font-weight: bold;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    content: '';
  }

  & > button[aria-describedby='en'] {
    background-image: url('/assets/flags/en-US.svg');
  }
  & > button[aria-describedby='pt'] {
    background-image: url('/assets/flags/pt-BR.svg');
  }
  & > button[aria-describedby='es'] {
    background-image: url('/assets/flags/es-ES.svg');
  }

  &:hover {
    animation: ${rotate} 0.4s ease-in-out both;
  }
`

export const StyledLanguageSelector = styled.div`
  position: relative;
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
