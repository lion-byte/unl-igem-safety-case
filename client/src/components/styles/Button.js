import styled from 'styled-components'

const Button = styled.button`
  color: white;
  cursor: pointer;
  background-color: ${props => props.theme.colorPrimary};
  border: 0;
  border-radius: 0.5em;
  display: inline-block;
  font-family: inherit;
  font-weight: bold;
  padding: 1em 1.5em;
  transition: all 0.5 ease-in-out;

  &[disabled] {
    cursor: unset;
    opacity: 0.5;
  }
`

export default Button
