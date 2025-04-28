import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { MdSecurity, MdLock } from 'react-icons/md';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      padding: 20px;
      width: 400px;
      border-radius: 15px;
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 20px 0;
    
    .MuiOutlinedInput-root {
      &:hover fieldset {
        border-color: #FF6C2A;
      }
    }
    
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #FF6C2A;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    color: ${props => (props.cancel ? '#FF6C2A' : 'white')} !important;
    background: ${props => (props.cancel ? 'transparent' : 'url("TopHeader2.png")')};
    border: 1px solid #FF6C2A;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    padding: 8px 16px;
    min-width: 100px;

    &:hover {
      background: ${props => (props.cancel ? 'rgba(255, 108, 42, 0.1)' : 'url("TopHeader2.png")')};
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const AdminChip = styled(Chip)`
  && {
    background-color: #FF6C2A;
    color: white;
    margin-left: 8px;
    font-size: 0.7rem;
  }
`;

const PasswordProtectedFolder = ({ folder, onPasswordVerified, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(userInfo?.role === 'admin');
  }, []);

  const handlePasswordSubmit = () => {
    if (folder.password === password) {
      onPasswordVerified();
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleClose = () => {
    onCancel();
    setPassword('');
    setError('');
  };

  return (
    <StyledDialog
      open={true}
      onClose={handleClose}
      aria-labelledby="password-dialog-title"
    >
      <DialogTitle id="password-dialog-title" style={{ color: '#FF6C2A', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MdLock style={{ marginRight: '8px', color: '#FF6C2A' }} />
          Protected Folder
          {folder.protectedByAdmin && <AdminChip label="Admin Protected" />}
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography>
          The folder "{folder.filename}" is password protected. Please enter the password to continue.
        </Typography>
        {folder.protectedByAdmin && !isAdmin && (
          <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: '8px' }}>
            Note: While you can access this folder with the password, only administrators can rename or delete it.
          </Typography>
        )}
        <StyledTextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && password) {
              handlePasswordSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
        <StyledButton cancel onClick={handleClose}>
          Cancel
        </StyledButton>
        <StyledButton 
          onClick={handlePasswordSubmit} 
          disabled={!password}
        >
          Submit
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default PasswordProtectedFolder; 