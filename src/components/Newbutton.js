import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Switch,
  FormControlLabel
} from '@material-ui/core';
import { CreateNewFolder as CreateNewFolderIcon } from '@material-ui/icons';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  && {
    background-image: url('TopHeader2.png');
    background-size: cover;
    background-position: center;
    color: white;
    margin-top: 20px;
    padding: 10px 20px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      margin-top: 15px;
      padding: 8px 16px;
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      margin-top: 10px;
      padding: 6px 12px;
      font-size: 0.8rem;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      padding: 20px;
      width: 550px;
      height: auto;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media (max-width: 768px) {
        width: 90%;
      }

      @media (max-width: 480px) {
        width: 80%;
        padding: 15px;
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 20px 0; /* Reduced spacing for equal gaps */
    
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

const StyledDialogActions = styled(DialogActions)`
  && {
    display: flex;
    justify-content: center;
    gap: 12px; /* Ensures equal spacing */
    padding: 10px 0 20px;

    @media (max-width: 480px) {
      gap: 10px;
      padding-bottom: 15px;
    }
  }
`;

const DialogButton = styled(Button)`
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

const securityQuestions = [
  "What is your mother's maiden name?",
  "What was your first pet's name?",
  "What was your first school?",
  "What is your favorite book?",
  "What city were you born in?"
];

const NewButton = ({ onCreateFolder, onFileUpload }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(userInfo?.role === 'admin');
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFolderName('');
    setPassword('');
    setIsPasswordProtected(false);
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const folderPassword = isPasswordProtected ? password.trim() : null;
      onCreateFolder(folderName.trim(), folderPassword);
      handleCloseDialog();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && folderName.trim()) {
      handleCreateFolder();
    }
  };

  return (
    <>
      <StyledButton
        variant="contained"
        onClick={handleOpenDialog}
        startIcon={<CreateNewFolderIcon />}
      >
        Create
      </StyledButton>

      <StyledDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', paddingBottom: '10px' }}>
          Create New Folder
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            variant="outlined"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {isAdmin && (
            <FormControlLabel
              control={
                <Switch
                  checked={isPasswordProtected}
                  onChange={(e) => setIsPasswordProtected(e.target.checked)}
                  color="primary"
                />
              }
              label="Password Protect this folder"
              style={{ marginTop: '10px' }}
            />
          )}
          {isPasswordProtected && (
            <StyledTextField
              margin="dense"
              label="Folder Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          )}
        </DialogContent>
        <StyledDialogActions>
          <DialogButton cancel onClick={handleCloseDialog}>
            Cancel
          </DialogButton>
          <DialogButton 
            onClick={handleCreateFolder} 
            disabled={!folderName.trim() || (isPasswordProtected && !password.trim())}
          >
            Create
          </DialogButton>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default NewButton;

