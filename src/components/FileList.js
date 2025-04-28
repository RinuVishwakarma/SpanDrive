import React from 'react';
import styled from 'styled-components';
import { Folder, InsertDriveFile } from '@material-ui/icons';

const FileListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
`;

const FileList = ({ files, onFolderClick, onFileClick }) => {
  return (
    <FileListContainer>
      {files.map(file => (
        <FileItem 
          key={file.id} 
          onClick={() => file.isFolder ? onFolderClick(file.id) : onFileClick(file)}
        >
          {file.isFolder ? <Folder style={{ marginRight: '10px' }} /> : <InsertDriveFile style={{ marginRight: '10px' }} />}
          {file.name}
        </FileItem>
      ))}
    </FileListContainer>
  );
};

export default FileList;