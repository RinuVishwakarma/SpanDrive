import React from 'react';
import styled from 'styled-components';

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
  @media (max-width: 480px) {
  width: auto;
  padding: 5px
}
   
`;
// @media (max-width: 768px) {
//   padding: 10px;
// }
// @media (max-width: 480px) {
//   width: 100%;
//   height: 2vh;
//   padding: 0px 0px;
// }
// `;
const BreadcrumbItem = styled.span`
  cursor: pointer;
    padding: 5px;
  color: ${props => props.isActive ? '#007bff' : '#333'};
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child)::after {
    content: ' | ';
  
    color: #333;
  }
`;

const Breadcrumbs = ({ items, onBreadcrumbClick,currentCategory  }) => {
  return (
    <BreadcrumbsContainer>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.id}
          isActive={index === items.length - 1}
          onClick={() => onBreadcrumbClick(item.id, index)}
        >
          {item.name}
        </BreadcrumbItem>
      ))}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;


// const Breadcrumbs = ({ items, onBreadcrumbClick, currentCategory }) => {
//   return (
//     <BreadcrumbsContainer>
//       <BreadcrumbItem
//         key="category"
//         isActive={items.length === 0}
//         onClick={() => onBreadcrumbClick(null, -1)}
//       >
//         {currentCategory}
//       </BreadcrumbItem>
//       {items.map((item, index) => (
//         <BreadcrumbItem
//           key={item.id}
//           isActive={index === items.length - 1}
//           onClick={() => onBreadcrumbClick(item.id, index)}
//         >
//           {item.name}
//         </BreadcrumbItem>
//       ))}
//     </BreadcrumbsContainer>
//   );
// };

// export default Breadcrumbs;