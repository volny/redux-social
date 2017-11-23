import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 1rem 0;
`
export const PageSubTitle = styled.h2`
  color: #0592ff;
  font-size: 2rem;
  margin: 0;
  padding: 0;
`

export const ErrorMessage = styled.p`
  color: #c0392b;
  font-weight: 600;
  font-size: 1.5rem;
`

export const ActionButton = styled.button`
  background: #0592ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  border-radius: 2px;
  padding: 10px 15px;
  border-style: none;
  cursor: pointer;
  align-self: center;
  &:hover {
    background: #1877e6;
  }
`
