import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewButtonComponent from './Newbutton';
import { db, storage } from '../firebase';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Typography, IconButton, Menu, MenuItem, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
  DialogContent, LinearProgress, useMediaQuery, useTheme, Tooltip, Checkbox,
  DialogActions, Button, TextField
} from '@material-ui/core';
import { 
  InsertDriveFile as FileIcon, Folder as FolderIcon, 
  MoreVert as MoreVertIcon, GetApp as DownloadIcon,
  Edit as EditIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon,
  PictureAsPdf as PdfIcon, Image as ImageIcon, 
  InsertPhoto as PsdIcon, TableChart as ExcelIcon,
  Description as DocIcon, TextFields as TextIcon,
  Archive as ZipIcon, Lock as LockIcon
} from '@material-ui/icons';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import PasswordProtectedFolder from './PasswordProtectedFolder';
import { ToastContainer } from 'react-toastify';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const HeaderTitle = styled(Typography)`
  && {
    flex-grow: 1;
    @media (max-width: 600px) {
      font-size: 1.2rem;
      padding:5px;
    }
  }
`;

const FoldersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-bottom: 10px;
    padding:5px;
  }
`;

const FolderItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const FolderName = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
   padding: 8px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const StyledFolderIcon = styled(FolderIcon)`
  color: #ffd700;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const MoreVertIconStyled = styled(MoreVertIcon)`
  font-size: 12px;
`;

const FolderIconButton = styled(IconButton)`
  && {
    padding: 4px;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 10px;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    margin-top: 5px;
    max-width: 100%;
    
  }
`;

const StyledTable = styled(Table)`
  width: 100%;

  @media (max-width: 600px) {
    min-width: auto;
  
  }
`;

const StyledTableHead = styled(TableHead)`
  background-color: #f5f5f5;
`;

const StyledHeaderCell = styled(TableCell)`
  && {
    padding: 12px;
    font-weight: bold;
    font-size: 14px;

    @media (max-width: 768px) {
      padding: 8px;
      font-size: 12px;
    }

    @media (max-width: 480px) {
      padding: 6px;
      font-size: 11px;
    }
  }
`;

const StyledBodyCell = styled(TableCell)`
  && {
    padding: 8px;
    font-size: 14px;

    @media (max-width: 768px) {
      padding: 6px;
      font-size: 12px;
    }

    @media (max-width: 480px) {
      padding: 4px;
      font-size: 11px;
    }
  }
`;

const FileNameCell = styled(StyledBodyCell)`
  && {
    width: 50%;
    max-width: 500px;

    @media (max-width: 600px) {
      width: 40%;
    }
  }
`;

const SizeCell = styled(StyledBodyCell)`
  && {
    width: 15%;

    @media (max-width: 600px) {
      width: 20%;
    }
  }
`;

const DateCell = styled(StyledBodyCell)`
  && {
    width: 18%; // Reduced from 20%
    padding-right: 0; // Remove right padding

    @media (max-width: 600px) {
      width: 22%; // Reduced from 25%
      padding-right: 0;
      margin-right: -10px; // Move left by creating negative margin
    }
  }
`;

const ActionCell = styled(StyledBodyCell)`
  && {
    width: 13%; // Reduced from 15%
    padding-left: 0; // Remove left padding

    @media (max-width: 600px) {
      width: 13%; // Kept the same
      padding-left: 0;
      margin-left: -10px; // Move left by creating negative margin
    }
  }
`;

const StyledBodyRow = styled(TableRow)`
  && {
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    ${props => props.selected && `
      background-color: rgba(25, 118, 210, 0.08);
      &:hover {
        background-color: rgba(25, 118, 210, 0.12);
      }
    `}
  }
`;

const DateHeaderCell = styled(StyledHeaderCell)`
  && {
    @media (max-width: 600px) {
      padding: 6px;
    }
  }
`;

const TruncatedText = styled.span`
  display: inline-block;
  max-width: ${props => props.isSmallScreen ? '80px' : '200px'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropZoneContainer = styled.div`
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #fafafa;
  transition: all 0.3s ease;
 

  &:hover {
    border-color: #FF6C2A; // Changed from #2196f3 to dark orange
   
  }

  &.drag-active {
    border-color: #FF6C2A; // Changed from #2196f3 to dark orange
   
  }

  @media (max-width: 600px) {
   margin-left: 6px;
    margin-right: 6px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin-left: 6px;
    margin-right: 6px;
    padding: 10px;
  }
`;

const getFileIcon = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return <PdfIcon style={{ color: '#FF0000' }} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <ImageIcon style={{ color: '#4CAF50' }} />;
    case 'psd':
      return <PsdIcon style={{ color: '#31A8FF' }} />;
    case 'xls':
    case 'xlsx':
      return <ExcelIcon style={{ color: '#217346' }} />;
    case 'doc':
    case 'docx':
      return <DocIcon style={{ color: '#2B579A' }} />;
    case 'txt':
      return <TextIcon style={{ color: '#FFA000' }} />;
    case 'zip':
    case 'rar':
      return <ZipIcon style={{ color: '#FFC107' }} />;
    default:
      return <FileIcon style={{ color: '#4285F4' }} />;
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const truncateText = (text, limit) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};

const Colleagues = ({ onFolderSelect, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToRename, setItemToRename] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [selectedProtectedFolder, setSelectedProtectedFolder] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Add this to get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const isAdmin = userInfo?.role === 'admin';

  const fetchFiles = useCallback(() => {
    let query = db.collection("myfiles").where("category", "==", "colleague");
    
    if (currentFolderId) {
      query = query.where("parent", "==", currentFolderId);
    } else {
      query = query.where("parent", "==", null);
    }

    return query.onSnapshot(snapshot => {
      const fetchedFiles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const sortedFiles = fetchedFiles.sort((a, b) => {
        if (a.isFolder && b.isFolder) {
          return a.filename.localeCompare(b.filename);
        } else if (!a.isFolder && !b.isFolder) {
          return b.timestamp?.toDate() - a.timestamp?.toDate();
        } else {
          return a.isFolder ? -1 : 1;
        }
      });

      setFiles(sortedFiles);
    });
  }, [currentFolderId]);

  useEffect(() => {
    const unsubscribe = fetchFiles();
    return () => unsubscribe();
  }, [fetchFiles]);

  const fetchFolderPath = useCallback(async () => {
    if (currentFolderId) {
      let path = [];
      let currentId = currentFolderId;

      while (currentId) {
        const doc = await db.collection("myfiles").doc(currentId).get();
        const folder = doc.data();
        if (folder) {
          path.unshift({ id: currentId, name: folder.filename });
          currentId = folder.parent;
        } else {
          break;
        }
      }

      setFolderPath(path);
    } else {
      setFolderPath([]);
    }
  }, [currentFolderId]);

  useEffect(() => {
    fetchFolderPath();
  }, [fetchFolderPath]);

  const handleFolderClick = (folderId, folderName, isProtected) => {
    if (isProtected) {
      const folder = files.find(f => f.id === folderId);
      setSelectedProtectedFolder(folder);
    } else {
      const newFolderPath = [...folderPath, { id: folderId, name: folderName }];
      onFolderSelect('COLLEAGUES', folderId, folderName, newFolderPath);
    }
  };

  const handleCreateFolder = (folderName, folderPassword) => {
    if (!isAdmin && !currentFolderId) {
      alert("Please navigate into a folder first to create new folders.");
      return;
    }

    const newFolderId = uuidv4();
    const folderData = {
      id: newFolderId,
      filename: folderName,
      isFolder: true,
      category: 'colleague',
      parent: currentFolderId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (folderPassword && isAdmin) {
      folderData.password = folderPassword;
      folderData.isProtected = true;
      folderData.protectedByAdmin = true;
    }

    db.collection("myfiles").doc(newFolderId).set(folderData)
    .then(() => {
      console.log('Folder created successfully');
    })
    .catch((error) => {
      console.error('Error creating folder:', error);
      alert('Failed to create folder');
    });
  };

  const handleFileUpload = (event) => {
    if (!isAdmin && !currentFolderId) {
      alert("Please navigate into a folder first to upload files.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const storageRef = storage.ref(`files/${file.name}`);
    const uploadTask = storageRef.put(file);

    setIsUploading(true);
    setOpen(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setIsUploading(false);
        setOpen(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          db.collection('myfiles').add({
            filename: file.name,
            fileURL: url,
            size: file.size,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            parent: currentFolderId,
            category: 'colleague',
            isFolder: false,
          });
          setIsUploading(false);
          setOpen(false);
        });
      }
    );
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!isAdmin && !currentFolderId) {
        alert('Please navigate into a folder first to upload files.');
        return;
      }

      setIsUploading(true);
      setOpen(true);
      
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const maxSize = 100 * 1024 * 1024; // 100MB limit
          if (file.size > maxSize) {
            throw new Error(`File ${file.name} is too large. Maximum size is 100MB.`);
          }

          const storageRef = storage.ref(`colleague/${file.name}`);
          const uploadTask = storageRef.put(file);

          const uploadProgressPromise = new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
              },
              reject,
              async () => {
                const fileUrl = await storageRef.getDownloadURL();
                resolve(fileUrl);
              }
            );
          });

          const fileUrl = await uploadProgressPromise;
          
          await db.collection("myfiles").add({
            filename: file.name,
            fileURL: fileUrl,
            size: file.size,
            category: "colleague",
            parent: currentFolderId,
            isFolder: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
        setOpen(false);
        setUploadProgress(0);
      }
    },
    [currentFolderId, isAdmin]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSelectFile = (event, file) => {
    event.stopPropagation();
    const fileId = file.id;
    
    setSelectedFiles(prev => {
      const isCurrentlySelected = prev.includes(fileId);
      if (isCurrentlySelected) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const handleSelectAll = (event) => {
    event.stopPropagation();
    const nonFolderFiles = files.filter(file => !file.isFolder);
    
    if (selectedFiles.length === nonFolderFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(nonFolderFiles.map(file => file.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;
    setItemToDelete({ type: 'multiple', count: selectedFiles.length });
    setDeleteDialogOpen(true);
  };

  const handleFileClick = (event, file) => {
    if (event.target.type === 'checkbox' || event.target.className.includes('checkbox')) {
      return;
    }
    
    if (file && file.fileURL) {
      window.open(file.fileURL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMoreVertClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleRenameFile = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    if (file.isProtected && !isAdmin) {
      toast.warning('Only administrators can rename protected folders', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setItemToRename(file);
    setNewFileName(file.filename);
    setRenameDialogOpen(true);
  };

  const handleDeleteFile = async (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    if (file.isProtected && !isAdmin) {
      toast.warning('Only administrators can delete protected folders', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setItemToDelete({ type: 'single', file });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (itemToDelete.type === 'multiple') {
        const protectedFiles = selectedFiles.filter(fileId => {
          const file = files.find(f => f.id === fileId);
          return file?.isProtected;
        });

        if (protectedFiles.length > 0 && !isAdmin) {
          toast.warning('You cannot delete protected folders. Only administrators can delete them.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

        await Promise.all(
          selectedFiles.map(async (fileId) => {
            const file = files.find(f => f.id === fileId);
            if (file) {
              if (file.isFolder) {
                await deleteFolderAndContents(fileId);
              } else {
                await deleteFile(file);
              }
            }
          })
        );
        setSelectedFiles([]);
      } else {
        const file = itemToDelete.file;
        if (file.isFolder) {
          await deleteFolderAndContents(file.id);
        } else {
          await deleteFile(file);
        }
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  const handleConfirmRename = () => {
    if (itemToRename && newFileName && newFileName !== itemToRename.filename) {
      if (itemToRename.isProtected && !isAdmin) {
        toast.warning('Only administrators can rename protected folders', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      db.collection("myfiles").doc(itemToRename.id).update({
        filename: newFileName
      });
    }
    setRenameDialogOpen(false);
    setItemToRename(null);
    setNewFileName('');
  };

  const deleteFile = async (file) => {
    try {
      await db.collection("myfiles").doc(file.id).delete();
      if (file.fileURL) {
        const storageRef = storage.refFromURL(file.fileURL);
        await storageRef.delete();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const deleteFolderAndContents = async (folderId) => {
    const folderRef = db.collection("myfiles").doc(folderId);
    const subItems = await db.collection("myfiles").where("parent", "==", folderId).get();
    for (const subItem of subItems.docs) {
      const subItemData = subItem.data();
      if (subItemData.isFolder) {
        await deleteFolderAndContents(subItem.id);
      } else {
        await deleteFile(subItemData);
      }
    }
    await folderRef.delete();
  };

  const handleDownload = (file) => {
    if (file && file.fileURL) {
      fetch(file.fileURL)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.filename;
          link.click();
        })
        .catch(error => console.error('Error downloading file:', error));
    }
  };

  const handleRename = () => {
    if (selectedItem) {
      handleRenameFile(selectedItem.id);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedItem) {
      handleDeleteFile(selectedItem.id);
    }
    handleMenuClose();
  };

  const handlePasswordSubmit = () => {
    const folder = files.find(f => f.id === selectedFolder.id);
    if (folder && folder.password === password) {
      const newFolderPath = [...folderPath, { id: selectedFolder.id, name: selectedFolder.name }];
      onFolderSelect('COLLEAGUES', selectedFolder.id, selectedFolder.name, newFolderPath);
      setPasswordDialogOpen(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handlePasswordVerified = () => {
    if (selectedProtectedFolder) {
      const newFolderPath = [...folderPath, { 
        id: selectedProtectedFolder.id, 
        name: selectedProtectedFolder.filename 
      }];
      onFolderSelect('COLLEAGUES', selectedProtectedFolder.id, selectedProtectedFolder.filename, newFolderPath);
      setSelectedProtectedFolder(null);
    }
  };

  const handlePasswordCancel = () => {
    setSelectedProtectedFolder(null);
  };

  const folders = files.filter(item => item.isFolder);
  const filesList = files.filter(item => !item.isFolder);

  return (
    <div>
      <ToastContainer />
      <HeaderContainer>
        <HeaderTitle variant="h6">Files</HeaderTitle>
        {(isAdmin || currentFolderId) && (
          <NewButtonComponent 
            onCreateFolder={handleCreateFolder} 
            onFileUpload={handleFileUpload} 
          />
        )}
      </HeaderContainer>

      {selectedFiles.length > 0 && (
        <div style={{ 
          marginBottom: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <Tooltip title="Delete Selected">
            <IconButton 
              onClick={handleDeleteSelected}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Typography component="span" variant="body2">
            {`${selectedFiles.length} ${selectedFiles.length === 1 ? 'item' : 'items'} selected`}
          </Typography>
        </div>
      )}

      {(isAdmin || currentFolderId) && (
        <DropZoneContainer {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here...</Typography>
          ) : (
            <Typography>Drag and drop files here or click to upload</Typography>
          )}
        </DropZoneContainer>
      )}

      <FoldersContainer>
        {folders.map(folder => (
          <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id, folder.filename, folder.isProtected)}>
            <StyledFolderIcon />
            <FolderName>
              <Tooltip title={folder.filename}>
                <TruncatedText isSmallScreen={isSmallScreen}>
                  {folder.filename}
                </TruncatedText>
              </Tooltip>
            </FolderName>
            {folder.isProtected && <LockIcon style={{ marginRight: '8px', color: '#FF6C2A', fontSize: '16px' }} />}
            <FolderIconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                handleMoreVertClick(e, folder);
              }}
            >
              <MoreVertIconStyled />
            </FolderIconButton>
          </FolderItem>
        ))}
      </FoldersContainer>
      {filesList.length > 0 ? (
        <StyledTableContainer component={Paper}>
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedFiles.length > 0 && selectedFiles.length < filesList.length}
                    checked={selectedFiles.length === filesList.length && filesList.length > 0}
                    onChange={handleSelectAll}
                  />
                </StyledHeaderCell>
                <StyledHeaderCell>File Name</StyledHeaderCell>
                <StyledHeaderCell align="right">Size</StyledHeaderCell>
                <DateHeaderCell align="center">Date</DateHeaderCell>
                <StyledHeaderCell align="center">Actions</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {filesList.map((file) => (
                <StyledBodyRow 
                  key={file.id} 
                  onClick={(event) => handleFileClick(event, file)}
                  selected={selectedFiles.includes(file.id)}
                >
                  <StyledBodyCell padding="checkbox">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => handleSelectFile(e, file)}
                      onClick={(e) => e.stopPropagation()}
                      color="primary"
                    />
                  </StyledBodyCell>
                  <FileNameCell component="th" scope="row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {getFileIcon(file.filename)}
                      <Tooltip title={file.filename}>
                        <TruncatedText isSmallScreen={isSmallScreen} style={{ marginLeft: '10px' }}>
                          {truncateText(file.filename, isSmallScreen ? 15 : 30)}
                        </TruncatedText>
                      </Tooltip>
                    </div>
                  </FileNameCell>
                  <SizeCell align="right">{formatFileSize(file.size)}</SizeCell>
                  <DateCell align="center">
                    {new Date(file.timestamp?.toDate()).toLocaleDateString()}
                  </DateCell>
                  <ActionCell align="right">
                    {isSmallScreen ? (
                      <IconButton size="small" onClick={(e) => {
                        e.stopPropagation();
                        handleMoreVertClick(e, file);
                      }}>
                        <MoreVertIcon />
                      </IconButton>
                    ) : (
                      <>
                        <Tooltip title="Rename">
                          <IconButton onClick={(event) => { 
                            event.stopPropagation(); 
                            handleRenameFile(file.id);
                          }} className="action-icons">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={(event) => { 
                            event.stopPropagation(); 
                            handleDeleteFile(file.id);
                          }} className="action-icons">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton onClick={(event) => { 
                            event.stopPropagation(); 
                            handleDownload(file);
                          }} className="action-icons">
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </ActionCell>
                </StyledBodyRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      ) : (
        <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
          No files in this folder.
        </Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRename}>  <EditIcon /></MenuItem>
        <MenuItem onClick={handleDelete}> <DeleteIcon /></MenuItem>
        {selectedItem && !selectedItem.isFolder && (
          <MenuItem onClick={() => handleDownload(selectedItem)}> <ArrowDownwardIcon /></MenuItem>
        )}
      </Menu>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Uploading File</DialogTitle>
        <DialogContent>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(uploadProgress)}%`}
          </Typography>
        </DialogContent>
      </Dialog>

      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" style={{ color: '#FF6C2A' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            {itemToDelete?.type === 'multiple' 
              ? `Are you sure you want to delete ${itemToDelete.count} selected items?`
              : `Are you sure you want to delete ${itemToDelete?.file?.filename}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} style={{ color: '#FF6C2A' }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={renameDialogOpen} 
        onClose={() => setRenameDialogOpen(false)}
        aria-labelledby="rename-dialog-title"
        aria-describedby="rename-dialog-description"
      >
        <DialogTitle id="rename-dialog-title" style={{ color: '#FF6C2A' }}>Rename File</DialogTitle>
        <DialogContent>
          <Typography id="rename-dialog-description">
            Enter new name for {itemToRename?.filename}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="New File Name"
            type="text"
            fullWidth
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRename} style={{ color: '#FF6C2A' }}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={passwordDialogOpen} 
        onClose={() => {
          setPasswordDialogOpen(false);
          setPassword('');
          setPasswordError('');
        }}
      >
        <DialogTitle style={{ color: '#FF6C2A' }}>Enter Password</DialogTitle>
        <DialogContent>
          <Typography>
            This folder is password protected. Please enter the password to continue.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setPasswordDialogOpen(false);
            setPassword('');
            setPasswordError('');
          }}>
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} style={{ color: '#FF6C2A' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {selectedProtectedFolder && (
        <PasswordProtectedFolder
          folder={selectedProtectedFolder}
          onPasswordVerified={handlePasswordVerified}
          onCancel={handlePasswordCancel}
        />
      )}
    </div>
  );
};

export default Colleagues;