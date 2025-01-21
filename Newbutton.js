// import React, { useState } from 'react';
// import { Button, Menu, MenuItem } from '@material-ui/core';
// import { Add as AddIcon, CreateNewFolder as CreateNewFolderIcon, CloudUpload as UploadFileIcon } from '@material-ui/icons';
// import styled from 'styled-components';

// const StyledButton = styled(Button)`
//   && {
//     background-image: url('TopHeader2.png');
//     background-size: cover;
//     background-position: center;
//     color: white;
//     margin-right: 4px;
//     margin-top: 25px;
//     padding: 10px 20px;
//     transition: all 0.3s ease;

//     &:hover {
//       opacity: 0.9;
//       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//     }

//     @media (max-width: 768px) {
//       margin-right: 20px;
//       margin-top: 15px;
//       padding: 8px 16px;
//       font-size: 0.9rem;
//     }

//     @media (max-width: 480px) {
//       margin-right: 10px;
//       margin-top: 10px;
//       padding: 6px 12px;
//       font-size: 0.8rem;
//     }
//   }
// `;

// const StyledMenuItem = styled(MenuItem)`
//   display: flex;
//   align-items: center;
//   padding: 8px;
//   font-size: 1rem;

//   @media (max-width: 768px) {
//     padding: 6px 12px;
//     font-size: 0.85rem;
//   }

//   @media (max-width: 480px) {
//     padding: 4px 8px;
//     font-size: 0.75rem;
//   }

//   svg {
//     font-size: 1.2rem;
//     margin-right: 8px;

//     @media (max-width: 768px) {
//       font-size: 1rem;
//       margin-right: 6px;
//     }

//     @media (max-width: 480px) {
//       font-size: 0.9rem;
//       margin-right: 4px;
//     }
//   }
// `;

// const StyledLabel = styled.label`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   cursor: pointer;
//   font-size: inherit;
// `;

// const MenuText = styled.span`
//   @media (max-width: 480px) {
//     font-size: 0.75rem;
//   }
// `;

// const NewButton = ({ onCreateFolder, onFileUpload }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleNewButtonClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleCreateFolder = () => {
//     onCreateFolder();
//     handleMenuClose();
//   };

//   const handleFileUpload = (event) => {
//     onFileUpload(event);
//     handleMenuClose();
//   };

//   return (
//     <>
//       <StyledButton
//         variant="contained"
//         onClick={handleNewButtonClick}
//         startIcon={<AddIcon />}
//       >
//         New
//       </StyledButton>
//       <Menu
//   anchorEl={anchorEl}
//   keepMounted
//   open={Boolean(anchorEl)}
//   onClose={handleMenuClose}
//   anchorOrigin={{
//     vertical: 'bottom',
//     horizontal: 'left',
//   }}
//   transformOrigin={{
//     vertical: 'top',
//     horizontal: 'left',
//   }}
//   PaperProps={{
//     style: {
//       marginTop: 50,
//       marginLeft: '-60px', // This will move the menu 20px to the left
//     },
//   }}
// >
//   <StyledMenuItem onClick={handleCreateFolder}>
//     <CreateNewFolderIcon />
//     <MenuText>Create Folder</MenuText>
//   </StyledMenuItem>
//   <StyledMenuItem>
//     <StyledLabel htmlFor="fileInput">
//       <UploadFileIcon />
//       <MenuText>Upload File</MenuText>
//     </StyledLabel>
//     <input
//       type="file"
//       id="fileInput"
//       style={{ display: 'none' }}
//       onChange={handleFileUpload}
//     />
//   </StyledMenuItem>
// </Menu>
//     </>
//   );
// };

// export default NewButton;


















import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Add as AddIcon, CreateNewFolder as CreateNewFolderIcon, CloudUpload as UploadFileIcon } from '@material-ui/icons';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  && {
    background-image: url('TopHeader2.png');
    background-size: cover;
    background-position: center;
    color: white;
    margin-right: 4px;
    margin-top: 25px;
    padding: 10px 20px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      margin-right: 20px;
      margin-top: 15px;
      padding: 8px 16px;
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      margin-right: 10px;
      margin-top: 10px;
      padding: 6px 12px;
      font-size: 0.8rem;
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  svg {
    font-size: 1.2rem;
    margin-right: 8px;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-right: 6px;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-right: 4px;
    }
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  font-size: inherit;
`;

const MenuText = styled.span`
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
const NewButton = ({ onCreateFolder, onFileUpload }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNewButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateFolder = () => {
    onCreateFolder();
    handleMenuClose();
  };

  const handleFileUpload = (event) => {
    onFileUpload(event);
    handleMenuClose();
  };

  return (
    <>
      <StyledButton
        variant="contained"
        onClick={handleNewButtonClick}
        startIcon={<AddIcon />}
      >
        New
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            marginTop: 50,
            marginLeft: '-60px',
          },
        }}
      >
        <StyledMenuItem onClick={handleCreateFolder}>
          <CreateNewFolderIcon />
          <MenuText>Create Folder</MenuText>
        </StyledMenuItem>
        <StyledMenuItem>
          <StyledLabel htmlFor="fileInput">
            <UploadFileIcon />
            <MenuText>Upload File</MenuText>
          </StyledLabel>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </StyledMenuItem>
      </Menu>
    </>
  );
};

export default NewButton;