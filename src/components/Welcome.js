// import React from 'react';
// import styled from 'styled-components';


// const StyledTitle = styled.h3`
//   text-align: center;               
//   font-family: 'Anton', sans-serif; 
//   font-size: 36px;                 
//   font-weight: normal;              
//     .text-gradient {
//   background: linear-gradient(to right, rgb(255, 0, 150), rgb(0, 204, 255)); /* Gradient color */
//   -webkit-background-clip: text; 
//   -webkit-text-fill-color: transparent;
// }              
//   color: #333;                      
// `;


// const StyledWelcomeMessage = styled.h4`
//   text-align: center;           
//   font-family: 'Anton', sans-serif;
//   font-size: 14px;                 
//   font-weight: 300;                                 
//   color: #333;                      
// `;

// function Welcome() {
//   return (
//     <>
//       <StyledTitle>WELCOME TO SPAN DUMP </StyledTitle>
//       <StyledWelcomeMessage>
      
//         THE SMART SOLUTION FOR ALL YOUR FILE BACKUP NEEDS
//       </StyledWelcomeMessage>
//     </>
//   );
// }

// export default Welcome;


import React from 'react';
import styled from 'styled-components';

// Styled component for the h3 element with gradient text  font-family: 'Anton', sans-serif; 
const StyledTitle = styled.h3`
  text-align: left;               
  font-size: 30px;                 
  font-weight: 700;              
  color: #FF6C2A;

  span {
    display: inline-block;
    vertical-align: middle;
    background-image: linear-gradient(110deg, #EA02A9 15%, #EE2A1A 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  span img {
    height: 30px; /* Adjust this value to match your desired image height */
    width: auto;
    margin-bottom :10px;
    vertical-align: middle;
    /* Reset gradient styles for the image */
    background-image: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    background-clip: unset;
    color: unset;
  }

  @media (max-width: 768px) {
    font-size: 30px; /* Adjust font size for tablet */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Adjust font size for mobile */
    padding: 5px;
    margin-bottom: -12px;
    margin-top: -21px;
  }
`;

const StyledWelcomeMessage = styled.h4`
  text-align: left;           
  font-size: 16px;                 
  font-weight: 400;                                 
  color: black; 
  background: linear-gradient(to right, black, black);
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  color: transparent;               
   margin-bottom: 2px; 
  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for tablet */
  } 
  @media (max-width: 480px) {
    padding:5px;
    font-size: 12px; /* Adjust font size for mobile */
  }
`;

function Welcome() {
  return (
    <>
     <StyledTitle>
     <span><img src="WelcomeNest_Text.png" alt="NEST" /></span>

</StyledTitle>
      
      <StyledWelcomeMessage>
        Please consider carefully what you upload here; while the enviroment might not be harmed, the bandwidth certainly could.
      </StyledWelcomeMessage>
    </>
  );
}

export default Welcome;

