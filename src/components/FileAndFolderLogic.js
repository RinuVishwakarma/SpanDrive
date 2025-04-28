import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase/app';
import { Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { CloudUpload as UploadIcon } from '@material-ui/icons';

const FileAndFolderLogic = ({ category }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("myfiles")
      .where("category", "==", category)
      .onSnapshot(snapshot => {
        setFiles(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });

    return () => unsubscribe();
  }, [category]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const storageRef = storage.ref(`files/${category}/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can add progress indicator here if needed
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          await db.collection('myfiles').add({
            filename: file.name,
            fileURL: downloadURL,
            size: file.size,
            category: category,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      );
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div>
     
      <input
        accept="*/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
        >
          Upload File
        </Button>
      </label>
      <List>
        {files.map((file) => (
          <ListItem key={file.id}>
            <ListItemText 
              primary={file.filename}
              secondary={new Date(file.timestamp?.toDate()).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FileAndFolderLogic;