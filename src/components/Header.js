import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Tooltip, Popover, Button } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import App from '../App';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  background-image: url('SpanNest_BG2.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom: 1px solid lightgray;
  justify-content: center;
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  padding:8px;
  img {
    width: 80px;
  }
  @media (min-width: 1024px) {
    width: 200px;
     
  }
  }
  span {
    font-size: 22px;
    color: white;
  }
`;
const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    display: flex;
    align-items: center;
    padding: 10px;
    color: white;
  }
`;
const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 8px;
  padding:5px;
  border-radius: 1px solid black; // This makes the avatar square
`;
const PopoverContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 0;
   background-color:#F7F8F9;
`;
const UserEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
`;
const LogoutButton = styled(Button)`
  && {
    color: #503654;
    border-color: #503654;
    &:hover {
      background-color: rgba(80, 54, 84, 0.04);
    }
  }
`;
const Header = ({ photoURL, email, displayName, onSignOut, onLogoClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    onSignOut();
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <HeaderContainer>
      <ContentContainer>
        <HeaderLogo>
          <img src="SpanLogo2.png" alt="Span Drive" />
        </HeaderLogo>
        <HeaderIcons>
          <span>Welcome, {displayName}</span>
          <Tooltip title="Account" arrow>
            <StyledAvatar src={photoURL || "avatar.jpeg"} onClick={handleClick} />
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: { marginTop: '10px' },
            }}
          >
            <PopoverContent>
              <Avatar src={photoURL || "avatar.jpeg"} />
              <UserEmail>{email}</UserEmail>
              <LogoutButton
                variant="outlined"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                Logout
              </LogoutButton>
            </PopoverContent>
          </Popover>
        </HeaderIcons>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;



