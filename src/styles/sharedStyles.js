import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 1rem 0;
`
export const PageTitle = styled.h1`
  color: #ab4642;
  font-size: 5rem;
  font-weight: 100;
  margin: 0;
  padding: 0.25rem 0;
`

export const PageSubTitle = styled.h2`
  color: #7cafc2;
  font-size: 2rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
`

export const ErrorMessage = styled.p`
  color: #c0392b;
  font-weight: 600;
`

export const ActionButton = styled.button`
  text-align: center;
  border-radius: 2px;
  padding: 10px 15px;
  border-style: none;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
  margin: 0 10px;
`
