import React, { useState } from 'react';
import { auth } from './firebase';
import styled, { keyframes } from 'styled-components';

const moveToTop = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-30%);
  }
`;
const moveFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('SpanNest_Login_0pt2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
  }  
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-top: 5vh;
  }
`;
const LogoTextWrapper = styled.div`
  display: flex;          
  flex-direction: column;
  align-items: center;
  gap: 6px;
  @media (max-width: 768px) {
    animation: ${moveToTop} 0.5s ease-out forwards;
    margin-right: 120px;
  }
`;
const LogoTextWrapper1 = styled.div`
  position: absolute;
  top: 20px;
  right: 77px;
  z-index: 10;
`;  
const SpanLogo = styled.img`
  width: 100px;
  height: auto;
  padding-top :12px;
   @media (max-width: 768px) {
    margin-right: -70px;
  }
`;
const SpanLogo1 = styled.img`
  width: 150px;
  height: auto;
  padding-top :12px;
   @media (max-width: 768px) {
    margin-right: -70px; 
  }
`;

const TextImage = styled.img`
  opacity: 0.9;
  width: 450px; 
  padding-bottom: 100px;
  @media (max-width: 1024px) {           
    width: 300px;
  }
  @media (max-width: 768px) {
    margin-top: 300px;
    max-width: 180px; 
  }
`;
const LoginWrapper = styled.div`
  padding: 20px;
  width: 400px;
  height: 250px;
  display: flex;
  margin-bottom: 60px;
  margin-left: 30px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #F4C080;
  border-radius: 2px;
  background-color: rgba(115, 25, 37, 0.8);
  @media (max-width: 1024px) {
    width: 350px;
    height: 230px;
    margin-left: 15px;
  }
  @media (max-width: 768px) {
    animation: ${moveFromBottom} 0.9s ease-out 0.5s forwards;
    opacity: 0;
    transform: translateY(100%);
    margin-top: -70px;
    width: 300px;
    height: 220px;
   margin-left :0;
  }
  @media (max-width: 480px) {
    width: 280px;
    height: 200px;
    margin-top: -240px;
    left: 50%;
    transform: translateX(-50%);
  }
  form { 
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  input {
    height: 20px;
    width: 90%;
    margin: 12px 0;
    padding: 12px;
    border-radius: 2px;
    border: 1px solid #FF515A;
    background-color: #A2313F;
    color: #fff;
    font-size: 14px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    &:focus {
      outline: none;
      border-color: #FF682F;
      background-color: rgba(255, 255, 255, 0.2);
    }
    @media (max-width: 480px) {
      font-size: 14px;
      padding: 8px;
      margin: 8px 0;
    }
  }
  button {
    width: 150px;
    height: 45px;
   background-image: linear-gradient(115deg, rgba(234, 2, 169, 0.8) 15%, rgba(252, 94, 4, 0.8) 60%);
    padding: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 15px;
     font-weight: 600;
    text-align: center;
    line-height: 20px;
    border: 0;
    outline: 0;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 10px;
    display: inline-block;
    color: #FFFFFF;
    transition: all 0.3s ease;
    &:hover {
       transition:background-image 3s ease-in-out;
  background-image: linear-gradient(90deg, #FC5E04 0%, #EA02A9 100%);
    }
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px 4px rgba(255, 104, 47, 0.5);
    }
    @media (max-width: 480px) {
      width: 120px;
      height: 35px;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  p {
    color: white;
    margin-top: 10px;
    font-size: 14px;
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;
const NestHeading = styled.h3`
  span {
    text-decoration: underline;
    color: #fff;        
    font-size: 24px;
    padding: 2px;
  }
  sup {
    text-decoration: none;
  }
`;

export const AUTHORIZED_USERS = {
  'admin@gmail.com': { 
    password: 'Admin@123', 
    displayName: 'Admin',
    role: 'admin'
  },
  //  add your gmail and password like this 
  // 'hello@gmail.com': { password: 'hello@654', displayName: 'hello' },
 
};

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');             
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = AUTHORIZED_USERS[email];
    if (user && user.password === password) {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify({
            email,
            displayName: user.displayName,
            role: user.role
          }));
          setEmail('');
          setPassword('');
          onSignIn();
        })
        .catch((error) => {
          setError('Authentication failed. Please try again.');
          console.error(error);
        });
    } else {
      setError('Invalid email or password.');
    }
  };
  return (
    <BackgroundContainer>
      <LogoTextWrapper1>
        <SpanLogo src="SpanLogo2.png" alt="Span Logo top right" />
      </LogoTextWrapper1>         
      <ContentWrapper>
        <LogoTextWrapper>
          <TextImage src="Text2A.png" alt="Text" />
        </LogoTextWrapper>
        <LoginWrapper>          
          <NestHeading>
          <SpanLogo1 src="NEST_Beta_White.png" alt="Span Logo" />
          </NestHeading>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="USERNAME"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
          </form>
        </LoginWrapper>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default SignIn;






