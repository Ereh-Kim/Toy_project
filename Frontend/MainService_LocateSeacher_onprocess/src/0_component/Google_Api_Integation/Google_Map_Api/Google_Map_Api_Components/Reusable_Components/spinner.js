// Spinner.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 8px solid #ddd;
  border-top: 8px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 0.8s ease-in-out infinite;
`;

function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerCircle/>
    </SpinnerWrapper>
  );
}

export default Spinner;
