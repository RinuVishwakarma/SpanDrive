import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db } from '../firebase';

const EditorContainer = styled.div`
  padding: 20px;
`;

const StyledQuill = styled(ReactQuill)`
  height: 400px;
  margin-bottom: 20px;
`;

const SaveButton = styled(Button)`
  && {
    background-color: #e76f51;
    color: white;
    &:hover {
      background-color: #e76f51cc;
    }
  }
`;

const TextEditor = ({ fileId, initialContent, onClose }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = async () => {
    try {
      await db.collection("myfiles").doc(fileId).update({
        content: content
      });
      alert('Content saved successfully!');
      onClose();
    } catch (error) {
      console.error("Error saving content: ", error);
      alert('Failed to save content. Please try again.');
    }
  };

  return (
    <EditorContainer>
      <StyledQuill value={content} onChange={setContent} />
      <SaveButton variant="contained" onClick={handleSave}>Save</SaveButton>
    </EditorContainer>
  );
};

export default TextEditor;