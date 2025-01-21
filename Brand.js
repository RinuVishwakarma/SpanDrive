// import React, { useState, useEffect, useCallback } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import NewButtonComponent from './Newbutton';
// import { db, storage } from '../firebase';
// import firebase from 'firebase/app';
// import { 
//   Typography, IconButton, Menu, MenuItem, Table, TableBody, TableCell, 
//   TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
//   DialogContent, LinearProgress, useMediaQuery, useTheme, Tooltip
// } from '@material-ui/core';
// import { 
//   InsertDriveFile as FileIcon, Folder as FolderIcon, 
//   MoreVert as MoreVertIcon, GetApp as DownloadIcon,
//   Edit as EditIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon,
//   PictureAsPdf as PdfIcon, Image as ImageIcon, 
//   InsertPhoto as PsdIcon, TableChart as ExcelIcon,
//   Description as DocIcon, TextFields as TextIcon,
//   Archive as ZipIcon
// } from '@material-ui/icons';
// import styled from 'styled-components';

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const FoldersContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 10px;
//   margin-bottom: 20px;

//   @media (max-width: 600px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const FolderItem = styled.div`
//   background-color: #f5f5f5;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   cursor: pointer;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const FolderName = styled.div`
//   flex-grow: 1;
//   margin-left: 10px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const StyledFolderIcon = styled(FolderIcon)`
//   color: #ffd700;
// `;

// const MoreVertIconStyled = styled(MoreVertIcon)`
//   font-size: 20px;
// `;

// const StyledTableContainer = styled(TableContainer)`
//   margin-top: 20px;
//   overflow-x: auto;
// `;

// const StyledTable = styled(Table)`
//   min-width: 650px;
//   @media (max-width: 600px) {
//     min-width: 300px;
//   }
// `;

// const StyledTableHead = styled(TableHead)`
//   background-color: #f5f5f5;

// `;

// const StyledTableCell = styled(TableCell)`
//   font-weight: bold;
  
//   @media (max-width: 600px) {
//     padding: 8px;
//   }
// `;
// const StyledHeaderCell = styled(TableCell)`
//   && {
//     padding-right: 50px; // Increased padding for better visibility
//     font-weight: bold;
    
//     @media (max-width: 768px) {
//       padding-right: 16px;
//     }
    
//     @media (max-width: 480px) {
//       padding-right: 12px;
//     }
//   }
// `;


// const TruncatedText = styled.span`
//   display: inline-block;
//   max-width: ${props => props.isSmallScreen ? '100px' : '200px'};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const getFileIcon = (filename) => {
//   const extension = filename.split('.').pop().toLowerCase();
//   switch (extension) {
//     case 'pdf':
//       return <PdfIcon style={{ color: '#FF0000' }} />;
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//       return <ImageIcon style={{ color: '#4CAF50' }} />;
//     case 'psd':
//       return <PsdIcon style={{ color: '#31A8FF' }} />;
//     case 'xls':
//     case 'xlsx':
//       return <ExcelIcon style={{ color: '#217346' }} />;
//     case 'doc':
//     case 'docx':
//       return <DocIcon style={{ color: '#2B579A' }} />;
//     case 'txt':
//       return <TextIcon style={{ color: '#FFA000' }} />;
//     case 'zip':
//     case 'rar':
//       return <ZipIcon style={{ color: '#FFC107' }} />;
//     default:
//       return <FileIcon style={{ color: '#4285F4' }} />;
//   }
// };

// const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// const truncateText = (text, limit) => {
//   if (text.length <= limit) return text;
//   return text.slice(0, limit) + '...';
// };

// const Brand = ({ onFolderSelect, currentFolderId }) => {
//   const [files, setFiles] = useState([]);
//   const [folderPath, setFolderPath] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [open, setOpen] = useState(false);

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const fetchFiles = useCallback(() => {
//     let query = db.collection("myfiles").where("category", "==", "brand");
    
//     if (currentFolderId) {
//       query = query.where("parent", "==", currentFolderId);
//     } else {
//       query = query.where("parent", "==", null);
//     }

//     return query.onSnapshot(snapshot => {
//       const fetchedFiles = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       const sortedFiles = fetchedFiles.sort((a, b) => {
//         if (a.isFolder && b.isFolder) {
//           return a.filename.localeCompare(b.filename);
//         } else if (!a.isFolder && !b.isFolder) {
//           return b.timestamp?.toDate() - a.timestamp?.toDate();
//         } else {
//           return a.isFolder ? -1 : 1;
//         }
//       });

//       setFiles(sortedFiles);
//     });
//   }, [currentFolderId]);

//   useEffect(() => {
//     const unsubscribe = fetchFiles();
//     return () => unsubscribe();
//   }, [fetchFiles]);

//   const fetchFolderPath = useCallback(async () => {
//     if (currentFolderId) {
//       let path = [];
//       let currentId = currentFolderId;

//       while (currentId) {
//         const doc = await db.collection("myfiles").doc(currentId).get();
//         const folder = doc.data();
//         if (folder) {
//           path.unshift({ id: currentId, name: folder.filename });
//           currentId = folder.parent;
//         } else {
//           break;
//         }
//       }

//       setFolderPath(path);
//     } else {
//       setFolderPath([]);
//     }
//   }, [currentFolderId]);

//   useEffect(() => {
//     fetchFolderPath();
//   }, [fetchFolderPath]);

//   const handleFolderClick = (folderId, folderName) => {
//     const newFolderPath = [...folderPath, { id: folderId, name: folderName }];
//     onFolderSelect('BRAND', folderId, folderName, newFolderPath);
//   };

//   const handleCreateFolder = () => {
//     const folderName = prompt("Enter folder name:");
//     if (folderName) {
//       const newFolderId = uuidv4();
//       db.collection("myfiles").doc(newFolderId).set({
//         id: newFolderId,
//         filename: folderName,
//         isFolder: true,
//         category: 'brand',
//         parent: currentFolderId,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const storageRef = storage.ref(`files/${file.name}`);
//     const uploadTask = storageRef.put(file);

//     setIsUploading(true);
//     setOpen(true);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error('Upload failed:', error);
//         setIsUploading(false);
//         setOpen(false);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//           db.collection('myfiles').add({
//             filename: file.name,
//             fileURL: url,
//             size: file.size,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             parent: currentFolderId,
//             category: 'brand',
//             isFolder: false,
//           });
//           setIsUploading(false);
//           setOpen(false);
//         });
//       }
//     );
//   };

//   const handleMoreVertClick = (event, item) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedItem(item);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedItem(null);
//   };

//   const handleRenameFile = (fileId) => {
//     const file = files.find(f => f.id === fileId);
//     if (!file) return;

//     const newName = prompt("Enter new file name:", file.filename);
//     if (newName && newName !== file.filename) {
//       db.collection("myfiles").doc(fileId).update({
//         filename: newName
//       });
//     }
//   };

//   const handleDeleteFile = async (fileId) => {
//     const file = files.find(f => f.id === fileId);
//     if (!file) return;

//     if (window.confirm(`Are you sure you want to delete ${file.filename}?`)) {
//       if (file.isFolder) {
//         await deleteFolderAndContents(fileId);
//       } else {
//         await deleteFile(file);
//       }
//     }
//   };

//   const deleteFile = async (file) => {
//     try {
//       // Delete from Firestore
//       await db.collection("myfiles").doc(file.id).delete();

//       // Delete from Storage
//       if (file.fileURL) {
//         const storageRef = storage.refFromURL(file.fileURL);
//         await storageRef.delete();
//       }
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

//   const deleteFolderAndContents = async (folderId) => {
//     const folderRef = db.collection("myfiles").doc(folderId);
//     const subItems = await db.collection("myfiles").where("parent", "==", folderId).get();

//     for (const subItem of subItems.docs) {
//       const subItemData = subItem.data();
//       if (subItemData.isFolder) {
//         await deleteFolderAndContents(subItem.id);
//       } else {
//         await deleteFile(subItemData);
//       }
//     }

//     await folderRef.delete();
//   };

//   const handleDownload = (fileURL, filename) => {
//     fetch(fileURL)
//         .then(response => response.blob())
//         .then(blob => {
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = filename;
//             link.click();
//         })
//         .catch(error => console.error('Error downloading file:', error));
// };

//   const handleFileClick = (file) => {
//     if (file && file.fileURL) {
//       const fileExtension = file.filename.split('.').pop().toLowerCase();
//       const onlineViewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
      
//       if (onlineViewableExtensions.includes(fileExtension)) {
//         window.open(file.fileURL, '_blank');
//       } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
//         const encodedUrl = encodeURIComponent(file.fileURL);
//         const officeOnlineUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
//         window.open(officeOnlineUrl, '_blank');
//       } else {
//         handleDownload(file);
//       }
//     }
//   };

//   const handleRename = () => {
//     if (selectedItem) {
//       handleRenameFile(selectedItem.id);
//     }
//     handleMenuClose();
//   };

//   const handleDelete = () => {
//     if (selectedItem) {
//       handleDeleteFile(selectedItem.id);
//     }
//     handleMenuClose();
//   };

//   const folders = files.filter(item => item.isFolder);
//   const filesList = files.filter(item => !item.isFolder);

//   return (
//     <div>
//       <HeaderContainer>
//         <Typography variant="h6"> Files</Typography>
//         <NewButtonComponent onCreateFolder={handleCreateFolder} onFileUpload={handleFileUpload} />
//       </HeaderContainer>
//       <FoldersContainer>
//         {folders.map(folder => (
//           <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id, folder.filename)}>
//             <StyledFolderIcon />
//             <FolderName>
//               <Tooltip title={folder.filename}>
//                 <TruncatedText isSmallScreen={isSmallScreen}>
//                   {folder.filename}
//                 </TruncatedText>
//               </Tooltip>
//             </FolderName>
//             <IconButton 
//               size="small" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleMoreVertClick(e, folder);
//               }}
//             >
//               <MoreVertIconStyled />
//             </IconButton>
//           </FolderItem>
//         ))}
//       </FoldersContainer>

//       {filesList.length > 0 ? (
//         <StyledTableContainer component={Paper}>
//           <StyledTable>
//             <StyledTableHead>
//               <TableRow>
//               <StyledHeaderCell>File Name</StyledHeaderCell>
//     <StyledHeaderCell align="right">Size</StyledHeaderCell>
//     <StyledHeaderCell align="right">Date</StyledHeaderCell>
//     <StyledHeaderCell align="right">Actions</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {filesList.map((file) => (
//                 <TableRow key={file.id} onClick={() => handleFileClick(file)} style={{cursor: 'pointer'}}>
//                   <StyledTableCell component="th" scope="row">
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       {getFileIcon(file.filename)}
//                       <Tooltip title={file.filename}>
//                         <TruncatedText isSmallScreen={isSmallScreen} style={{ marginLeft: '10px' }}>
//                           {truncateText(file.filename, isSmallScreen ? 7 : 12)}
//                         </TruncatedText>
//                       </Tooltip>
//                     </div>
//                   </StyledTableCell>
//                   <StyledTableCell align="right">{formatFileSize(file.size)}</StyledTableCell>
//                   <StyledTableCell align="right">
//                     {new Date(file.timestamp?.toDate()).toLocaleDateString()}
//                   </StyledTableCell>
//                   <StyledTableCell align="right">
//                     {isSmallScreen ? (
//                       <IconButton size="small" onClick={(e) => {
//                         e.stopPropagation();
//                         handleMoreVertClick(e, file);
//                       }}>
//                         <MoreVertIcon />
//                       </IconButton>
//                     ) : (
//                       <>
//                         <Tooltip title="Rename">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleRenameFile(file.id);
//                           }} className="action-icons">
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleDeleteFile(file.id);
//                           }} className="action-icons">
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Download">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleDownload(file);
//                           }} className="action-icons">
//                             <ArrowDownwardIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </>
//                     )}
//                   </StyledTableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </StyledTable>
//         </StyledTableContainer>
//       ) : (
//         <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
//           No files in this folder.
//         </Typography>
//       )}

//       <Menu
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleRename}>  <EditIcon /></MenuItem>
//         <MenuItem onClick={handleDelete}> <DeleteIcon /></MenuItem>
//         {selectedItem && !selectedItem.isFolder && (
//           <MenuItem onClick={() => handleDownload(selectedItem)}> <ArrowDownwardIcon /></MenuItem>
//         )}
//       </Menu>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Uploading File</DialogTitle>
//         <DialogContent>
//           <LinearProgress variant="determinate" value={uploadProgress} />
//           <Typography variant="body2" color="textSecondary">
//             {`${Math.round(uploadProgress)}%`}
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Brand;





// import React, { useState, useEffect, useCallback } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import NewButtonComponent from './Newbutton';
// import { db, storage } from '../firebase';
// import firebase from 'firebase/app';
// import { 
//   Typography, IconButton, Menu, MenuItem, Table, TableBody, TableCell, 
//   TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
//   DialogContent, LinearProgress, useMediaQuery, useTheme, Tooltip
// } from '@material-ui/core';
// import { 
//   InsertDriveFile as FileIcon, Folder as FolderIcon, 
//   MoreVert as MoreVertIcon, GetApp as DownloadIcon,
//   Edit as EditIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon,
//   PictureAsPdf as PdfIcon, Image as ImageIcon, 
//   InsertPhoto as PsdIcon, TableChart as ExcelIcon,
//   Description as DocIcon, TextFields as TextIcon,
//   Archive as ZipIcon
// } from '@material-ui/icons';
// import styled from 'styled-components';
// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;

//   @media (max-width: 600px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
//   }
// `;

// const HeaderTitle = styled(Typography)`
//   && {
//     flex-grow: 1;
//     @media (max-width: 600px) {
//       font-size: 1.2rem;
//       padding:5px;
//     }
//   }
// `;

// const FoldersContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 10px;
//   margin-bottom: 20px;

//   @media (max-width: 600px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 5px;
//     margin-bottom: 10px;
//     padding:5px;
//   }
// `;

// const FolderItem = styled.div`
//   background-color: #f5f5f5;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   padding: 8px;
//   cursor: pointer;
//   transition: background-color 0.2s ease;
//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const FolderName = styled.div`
//   flex-grow: 1;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   font-size: 14px;
//    padding: 8px;
//   @media (max-width: 600px) {
//     font-size: 12px;
//   }
// `;

// const StyledFolderIcon = styled(FolderIcon)`
//   color: #ffd700;
//   font-size: 20px;

//   @media (max-width: 600px) {
//     font-size: 16px;
//   }
// `;

// const MoreVertIconStyled = styled(MoreVertIcon)`
//   font-size: 12px;
// `;

// const FolderIconButton = styled(IconButton)`
//   && {
//     padding: 4px;
//   }
// `;

// const StyledTableContainer = styled(TableContainer)`
//   margin-top: 10px;
//   overflow-x: auto;
//   width: 100%;
//   max-width: 100%;

//   @media (max-width: 768px) {
//     margin-top: 8px;
//   }

//   @media (max-width: 480px) {
//     margin-top: 5px;
//     max-width: 100%;
    
//   }
// `;

// const StyledTable = styled(Table)`
//   width: 100%;

//   @media (max-width: 600px) {
//     min-width: auto;
  
//   }
// `;

// const StyledTableHead = styled(TableHead)`
//   background-color: #f5f5f5;
// `;

// const StyledHeaderCell = styled(TableCell)`
//   && {
//     padding: 12px;
//     font-weight: bold;
//     font-size: 14px;

//     @media (max-width: 768px) {
//       padding: 8px;
//       font-size: 12px;
//     }

//     @media (max-width: 480px) {
//       padding: 6px;
//       font-size: 11px;
//     }
//   }
// `;

// const StyledBodyCell = styled(TableCell)`
//   && {
//     padding: 8px;
//     font-size: 14px;

//     @media (max-width: 768px) {
//       padding: 6px;
//       font-size: 12px;
//     }

//     @media (max-width: 480px) {
//       padding: 4px;
//       font-size: 11px;
//     }
//   }
// `;

// const FileNameCell = styled(StyledBodyCell)`
//   && {
//     width: 50%;
//     max-width: 500px;

//     @media (max-width: 600px) {
//       width: 40%;
//     }
//   }
// `;

// const SizeCell = styled(StyledBodyCell)`
//   && {
//     width: 15%;

//     @media (max-width: 600px) {
//       width: 20%;
//     }
//   }
// `;

// const DateCell = styled(StyledBodyCell)`
//   && {
//     width: 18%; // Reduced from 20%
//     padding-right: 0; // Remove right padding

//     @media (max-width: 600px) {
//       width: 22%; // Reduced from 25%
//       padding-right: 0;
//       margin-right: -10px; // Move left by creating negative margin
//     }
//   }
// `;

// const ActionCell = styled(StyledBodyCell)`
//   && {
//     width: 13%; // Reduced from 15%
//     padding-left: 0; // Remove left padding

//     @media (max-width: 600px) {
//       width: 13%; // Kept the same
//       padding-left: 0;
//       margin-left: -10px; // Move left by creating negative margin
//     }
//   }
// `;

// const StyledBodyRow = styled(TableRow)`
//   && {
//     &:hover {
//       background-color: rgba(0, 0, 0, 0.04);
//     }
//   }
// `;

// const DateHeaderCell = styled(StyledHeaderCell)`
//   && {
//     @media (max-width: 600px) {
//       padding: 6px;
//     }
//   }
// `;

// const TruncatedText = styled.span`
//   display: inline-block;
//   max-width: ${props => props.isSmallScreen ? '80px' : '200px'};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// const getFileIcon = (filename) => {
//   const extension = filename.split('.').pop().toLowerCase();
//   switch (extension) {
//     case 'pdf':
//       return <PdfIcon style={{ color: '#FF0000' }} />;
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//       return <ImageIcon style={{ color: '#4CAF50' }} />;
//     case 'psd':
//       return <PsdIcon style={{ color: '#31A8FF' }} />;
//     case 'xls':
//     case 'xlsx':
//       return <ExcelIcon style={{ color: '#217346' }} />;
//     case 'doc':
//     case 'docx':
//       return <DocIcon style={{ color: '#2B579A' }} />;
//     case 'txt':
//       return <TextIcon style={{ color: '#FFA000' }} />;
//     case 'zip':
//     case 'rar':
//       return <ZipIcon style={{ color: '#FFC107' }} />;
//     default:
//       return <FileIcon style={{ color: '#4285F4' }} />;
//   }
// };

// const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// const truncateText = (text, limit) => {
//   if (text.length <= limit) return text;
//   return text.slice(0, limit) + '...';
// };

// const Brand = ({ onFolderSelect, currentFolderId }) => {
//   const [files, setFiles] = useState([]);
//   const [folderPath, setFolderPath] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [open, setOpen] = useState(false);

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const fetchFiles = useCallback(() => {
//     let query = db.collection("myfiles").where("category", "==", "brand");
    
//     if (currentFolderId) {
//       query = query.where("parent", "==", currentFolderId);
//     } else {
//       query = query.where("parent", "==", null);
//     }

//     return query.onSnapshot(snapshot => {
//       const fetchedFiles = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       const sortedFiles = fetchedFiles.sort((a, b) => {
//         if (a.isFolder && b.isFolder) {
//           return a.filename.localeCompare(b.filename);
//         } else if (!a.isFolder && !b.isFolder) {
//           return b.timestamp?.toDate() - a.timestamp?.toDate();
//         } else {
//           return a.isFolder ? -1 : 1;
//         }
//       });

//       setFiles(sortedFiles);
//     });
//   }, [currentFolderId]);

//   useEffect(() => {
//     const unsubscribe = fetchFiles();
//     return () => unsubscribe();
//   }, [fetchFiles]);

//   const fetchFolderPath = useCallback(async () => {
//     if (currentFolderId) {
//       let path = [];
//       let currentId = currentFolderId;

//       while (currentId) {
//         const doc = await db.collection("myfiles").doc(currentId).get();
//         const folder = doc.data();
//         if (folder) {
//           path.unshift({ id: currentId, name: folder.filename });
//           currentId = folder.parent;
//         } else {
//           break;
//         }
//       }

//       setFolderPath(path);
//     } else {
//       setFolderPath([]);
//     }
//   }, [currentFolderId]);

//   useEffect(() => {
//     fetchFolderPath();
//   }, [fetchFolderPath]);

//   const handleFolderClick = (folderId, folderName) => {
//     const newFolderPath = [...folderPath, { id: folderId, name: folderName }];
//     onFolderSelect('BRANDS', folderId, folderName, newFolderPath);
//   };

//   const handleCreateFolder = () => {
//     const folderName = prompt("Enter folder name:");
//     if (folderName) {
//       const newFolderId = uuidv4();
//       db.collection("myfiles").doc(newFolderId).set({
//         id: newFolderId,
//         filename: folderName,
//         isFolder: true,
//         category: 'brand',
//         parent: currentFolderId,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const storageRef = storage.ref(`files/${file.name}`);
//     const uploadTask = storageRef.put(file);

//     setIsUploading(true);
//     setOpen(true);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error('Upload failed:', error);
//         setIsUploading(false);
//         setOpen(false);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//           db.collection('myfiles').add({
//             filename: file.name,
//             fileURL: url,
//             size: file.size,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             parent: currentFolderId,
//             category: 'brand',
//             isFolder: false,
//           });
//           setIsUploading(false);
//           setOpen(false);
//         });
//       }
//     );
//   };

//   const handleMoreVertClick = (event, item) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedItem(item);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedItem(null);
//   };
//   const handleRenameFile = (fileId) => {
//     const file = files.find(f => f.id === fileId);
//     if (!file) return;

//     const newName = prompt("Enter new file name:", file.filename);
//     if (newName && newName !== file.filename) {
//       db.collection("myfiles").doc(fileId).update({
//         filename: newName
//       });
//     }
//   };
//   const handleDeleteFile = async (fileId) => {
//     const file = files.find(f => f.id === fileId);
//     if (!file) return;

//     if (window.confirm(`Are you sure you want to delete ${file.filename}?`)) {
//       if (file.isFolder) {
//         await deleteFolderAndContents(fileId);
//       } else {
//         await deleteFile(file);
//       }
//     }
//   };
//   const deleteFile = async (file) => {
//     try {
//       await db.collection("myfiles").doc(file.id).delete();
//       if (file.fileURL) {
//         const storageRef = storage.refFromURL(file.fileURL);
//         await storageRef.delete();
//       }
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };
//   const deleteFolderAndContents = async (folderId) => {
//     const folderRef = db.collection("myfiles").doc(folderId);
//     const subItems = await db.collection("myfiles").where("parent", "==", folderId).get();
//     for (const subItem of subItems.docs) {
//       const subItemData = subItem.data();
//       if (subItemData.isFolder) {
//         await deleteFolderAndContents(subItem.id);
//       } else {
//         await deleteFile(subItemData);
//       }
//     }
//     await folderRef.delete();
//   };
//   const handleDownload = (file) => {
//     if (file && file.fileURL) {
//       fetch(file.fileURL)
//         .then(response => response.blob())
//         .then(blob => {
//           const link = document.createElement('a');
//           link.href = URL.createObjectURL(blob);
//           link.download = file.filename;
//           link.click();
//         })
//         .catch(error => console.error('Error downloading file:', error));
//     }
//   };
//   // const handleFileClick = (file) => {
//   //   if (file && file.fileURL) {
//   //     const fileExtension = file.filename.split('.').pop().toLowerCase();
//   //     const onlineViewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
      
//   //     if (onlineViewableExtensions.includes(fileExtension)) {
//   //       window.open(file.fileURL, '_blank');
//   //     } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
//   //       const encodedUrl = encodeURIComponent(file.fileURL);
//   //       const officeOnlineUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
//   //       window.open(officeOnlineUrl, '_blank');
//   //     } else {
//   //       handleDownload(file);
//   //     }
//   //   }
//   // };   
//   const handleFileClick = (file) => {
//     if (file && file.fileURL) {
//       window.open(file.fileURL, 'blank', 'noopener,noreferrer');
//       }
//       };
//   const handleRename = () => {
//     if (selectedItem) {
//       handleRenameFile(selectedItem.id);
//     }
//     handleMenuClose();
//   };

//   const handleDelete = () => {
//     if (selectedItem) {
//       handleDeleteFile(selectedItem.id);
//     }
//     handleMenuClose();
//   };

//   const folders = files.filter(item => item.isFolder);
//   const filesList = files.filter(item => !item.isFolder);

//   return (
//     <div>
//      <HeaderContainer>
//       <HeaderTitle variant="h6">Files</HeaderTitle>
//       <NewButtonComponent onCreateFolder={handleCreateFolder} onFileUpload={handleFileUpload} />
//     </HeaderContainer>
//       <FoldersContainer>
//         {folders.map(folder => (
//           <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id, folder.filename)}>
//             <StyledFolderIcon />
//             <FolderName>
//               <Tooltip title={folder.filename}>
//                 <TruncatedText isSmallScreen={isSmallScreen}>
//                   {folder.filename}
//                 </TruncatedText>
//               </Tooltip>
//             </FolderName>
//             <FolderIconButton 
//               size="small" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleMoreVertClick(e, folder);
//               }}
//             >
//               <MoreVertIconStyled />
//             </FolderIconButton>
//           </FolderItem>
//         ))}
//       </FoldersContainer>
//       {filesList.length > 0 ? (
//         <StyledTableContainer component={Paper}>
//           <StyledTable>
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>File Name</StyledHeaderCell>
//                 <StyledHeaderCell align="right">Size</StyledHeaderCell>
//                 <DateHeaderCell align="center">Date</DateHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {filesList.map((file) => (
//                 <StyledBodyRow key={file.id} onClick={() => handleFileClick(file)}>
//                   <FileNameCell component="th" scope="row">
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       {getFileIcon(file.filename)}
//                       <Tooltip title={file.filename}>
//                         <TruncatedText isSmallScreen={isSmallScreen} style={{ marginLeft: '10px' }}>
//                           {truncateText(file.filename, isSmallScreen ? 15 : 30)}
//                         </TruncatedText>
//                       </Tooltip>
//                     </div>
//                   </FileNameCell>
//                   <SizeCell align="right">{formatFileSize(file.size)}</SizeCell>
//                   <DateCell align="center">
//                     {new Date(file.timestamp?.toDate()).toLocaleDateString()}
//                   </DateCell>
//                   <ActionCell align="right">
//                     {isSmallScreen ? (
//                       <IconButton size="small" onClick={(e) => {
//                         e.stopPropagation();
//                         handleMoreVertClick(e, file);
//                       }}>
//                         <MoreVertIcon />
//                       </IconButton>
//                     ) : (
//                       <>
//                         <Tooltip title="Rename">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleRenameFile(file.id);
//                           }} className="action-icons">
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleDeleteFile(file.id);
//                           }} className="action-icons">
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Download">
//                           <IconButton onClick={(event) => { 
//                             event.stopPropagation(); 
//                             handleDownload(file);
//                           }} className="action-icons">
//                             <ArrowDownwardIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </>
//                     )}
//                   </ActionCell>
//                 </StyledBodyRow>
//               ))}
//             </TableBody>
//           </StyledTable>
//         </StyledTableContainer>
//       ) : (
//         <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
//           No files in this folder.
//         </Typography>
//       )}

    
// <Menu
//   anchorEl={anchorEl}
//   keepMounted
//   open={Boolean(anchorEl)}
//   onClose={handleMenuClose}
// >
//   <Tooltip title="Rename">
//     <MenuItem onClick={handleRename}>
//       <EditIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
   
//     </MenuItem>
//   </Tooltip>
//   <Tooltip title="Delete">
//     <MenuItem onClick={handleDelete}>
//       <DeleteIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
    
//     </MenuItem>
//   </Tooltip>
//   {selectedItem && !selectedItem.isFolder && (
//     <Tooltip title="Download">
//       <MenuItem onClick={() => handleDownload(selectedItem)}>
//         <ArrowDownwardIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
  
//       </MenuItem>
//     </Tooltip>
//   )}
// </Menu>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Uploading File</DialogTitle>
//         <DialogContent>
//           <LinearProgress variant="determinate" value={uploadProgress} />
//           <Typography variant="body2" color="textSecondary">
//             {`${Math.round(uploadProgress)}%`}
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Brand;













import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewButtonComponent from './Newbutton';
import { db, storage } from '../firebase';
import firebase from 'firebase/app';
import { 
  Typography, IconButton, Menu, MenuItem, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
  DialogContent, LinearProgress, useMediaQuery, useTheme, Tooltip
} from '@material-ui/core';
import { 
  InsertDriveFile as FileIcon, Folder as FolderIcon, 
  MoreVert as MoreVertIcon, GetApp as DownloadIcon,
  Edit as EditIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon,
  PictureAsPdf as PdfIcon, Image as ImageIcon, 
  InsertPhoto as PsdIcon, TableChart as ExcelIcon,
  Description as DocIcon, TextFields as TextIcon,
  Archive as ZipIcon
} from '@material-ui/icons';
import styled from 'styled-components';
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
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};

const Brand = ({ onFolderSelect, currentFolderId }) => {
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchFiles = useCallback(() => {
    let query = db.collection("myfiles").where("category", "==", "brand");
    
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

  const handleFolderClick = (folderId, folderName) => {
    const newFolderPath = [...folderPath, { id: folderId, name: folderName }];
    onFolderSelect('BRANDS', folderId, folderName, newFolderPath);
  };

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const newFolderId = uuidv4();
      db.collection("myfiles").doc(newFolderId).set({
        id: newFolderId,
        filename: folderName,
        isFolder: true,
        category: 'brand',
        parent: currentFolderId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const storageRef = storage.ref(`files/${file.name}`);
  //   const uploadTask = storageRef.put(file);

  //   setIsUploading(true);
  //   setOpen(true);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setUploadProgress(progress);
  //     },
  //     (error) => {
  //       console.error('Upload failed:', error);
  //       setIsUploading(false);
  //       setOpen(false);
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //         db.collection('myfiles').add({
  //           filename: file.name,
  //           fileURL: url,
  //           size: file.size,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           parent: currentFolderId,
  //           category: 'brand',
  //           isFolder: false,
  //         });
  //         setIsUploading(false);
  //         setOpen(false);
  //       });
  //     }
  //   );
  // };
  const handleFileUpload = (event) => {
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
          setDownloadURL(url);
          db.collection('myfiles').add({
            filename: file.name,
            fileURL: url,
            size: file.size,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            parent: currentFolderId,
            category: 'brand',
            isFolder: false,
          });
          setIsUploading(false);
          setOpen(false);
        });
      }
    );
  };

  const handleFileClick = (file) => {
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

    const newName = prompt("Enter new file name:", file.filename);
    if (newName && newName !== file.filename) {
      db.collection("myfiles").doc(fileId).update({
        filename: newName
      });
    }
  };
  const handleDeleteFile = async (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    if (window.confirm(`Are you sure you want to delete ${file.filename}?`)) {
      if (file.isFolder) {
        await deleteFolderAndContents(fileId);
      } else {
        await deleteFile(file);
      }
    }
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
  // const handleFileClick = (file) => {
  //   if (file && file.fileURL) {
  //     const fileExtension = file.filename.split('.').pop().toLowerCase();
  //     const onlineViewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
      
  //     if (onlineViewableExtensions.includes(fileExtension)) {
  //       window.open(file.fileURL, '_blank');
  //     } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
  //       const encodedUrl = encodeURIComponent(file.fileURL);
  //       const officeOnlineUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
  //       window.open(officeOnlineUrl, '_blank');
  //     } else {
  //       handleDownload(file);
  //     }
  //   }
  // };   
  // const handleFileClick = (file) => {
  //   if (file && file.fileURL) {
  //     window.open(file.fileURL, 'blank', 'noopener,noreferrer');
  //     }
  //     };
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

  const folders = files.filter(item => item.isFolder);
  const filesList = files.filter(item => !item.isFolder);

  return (
    <div>
     {/* <HeaderContainer>
      <HeaderTitle variant="h6">Files</HeaderTitle>
      <NewButtonComponent onCreateFolder={handleCreateFolder} onFileUpload={handleFileUpload} />
    </HeaderContainer> */}      


<HeaderContainer>
        <HeaderTitle variant="h6">Files</HeaderTitle>
        <NewButtonComponent onCreateFolder={handleCreateFolder} onFileUpload={handleFileUpload} />
      </HeaderContainer>

      {downloadURL && (
      <div style={{ margin: '10px 0', textAlign: 'center' }}>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
          </a>
        </div>
        )}
      
         
      <FoldersContainer>
        {folders.map(folder => (
          <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id, folder.filename)}>
            <StyledFolderIcon />
            <FolderName>
              <Tooltip title={folder.filename}>
                <TruncatedText isSmallScreen={isSmallScreen}>
                  {folder.filename}
                </TruncatedText>
              </Tooltip>
            </FolderName>
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
                <StyledHeaderCell>File Name</StyledHeaderCell>
                <StyledHeaderCell align="right">Size</StyledHeaderCell>
                <DateHeaderCell align="center">Date</DateHeaderCell>
                <StyledHeaderCell align="center">Actions</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {filesList.map((file) => (
                <StyledBodyRow key={file.id} onClick={() => handleFileClick(file)}>
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
  <Tooltip title="Rename">
    <MenuItem onClick={handleRename}>
      <EditIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
   
    </MenuItem>
  </Tooltip>
  <Tooltip title="Delete">
    <MenuItem onClick={handleDelete}>
      <DeleteIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
    
    </MenuItem>
  </Tooltip>
  {selectedItem && !selectedItem.isFolder && (
    <Tooltip title="Download">
      <MenuItem onClick={() => handleDownload(selectedItem)}>
        <ArrowDownwardIcon style={{ fontSize: '1rem', marginRight: '8px' }} />
  
      </MenuItem>
    </Tooltip>
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
    </div>
    
  );
};

export default Brand;