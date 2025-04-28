// Storage.js
import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, LinearProgress, Paper } from '@material-ui/core';
import { Storage as StorageIcon, Cloud as CloudIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { db } from '../firebase';  // Make sure to import your Firebase configuration
const StorageContainer = styled(Paper)`
  margin-top: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const StorageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const StorageIconStyled = styled(StorageIcon)`
  font-size: 2.5rem;
  margin-right: 16px;
  color: #3f51b5;

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-right: 12px;
  }
`;

const StorageInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const StorageItem = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const StorageValue = styled(Typography)`
  font-weight: bold;
  margin-top: 8px;
  color: #3f51b5;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StorageLabel = styled(Typography)`
  color: #757575;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const StorageNumber = styled(Typography)`
  font-size: 0.75rem;
  color: #9e9e9e;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const StorageBarContainer = styled.div`
  margin-top: 24px;

  @media (max-width: 480px) {
    margin-top: 16px;
  }
`;

const UsageText = styled(Typography)`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.875rem;
  color: #757575;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
const TOTAL_STORAGE = 1024 * 1024 * 1024 * 5; // 10 GB in bytes

const Storage = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateStorage();
  }, []);

  const calculateStorage = async () => {
    const categories = ['brand', 'colleague', 'archive'];
    let total = 0;

    for (const category of categories) {
      const snapshot = await db.collection("myfiles")
        .where("category", "==", category)
        .get();

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.size) {
          total += data.size;
        }
      });
    }

    setUsedStorage(total);
    setLoading(false);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const remainingStorage = TOTAL_STORAGE - usedStorage;
  const usagePercentage = (usedStorage / TOTAL_STORAGE) * 100;

  return (
    <StorageContainer elevation={3}>
      <StorageHeader>
        <StorageIconStyled />
        <Typography variant="h5">Storage Overview</Typography>
      </StorageHeader>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <StorageInfo>
            <StorageItem>
              <CloudIcon style={{ fontSize: '2rem', color: '#4caf50' }} />
              <StorageValue variant="h6">{formatBytes(TOTAL_STORAGE)}</StorageValue>
              <StorageLabel>Total Storage</StorageLabel>
              <StorageNumber>{TOTAL_STORAGE.toLocaleString()} bytes</StorageNumber>
            </StorageItem>
            <StorageItem>
              <CloudIcon style={{ fontSize: '2rem', color: '#f44336' }} />
              <StorageValue variant="h6">{formatBytes(usedStorage)}</StorageValue>
              <StorageLabel>Used Storage</StorageLabel>
              <StorageNumber>{usedStorage.toLocaleString()} bytes</StorageNumber>
            </StorageItem>
            <StorageItem>
              <CloudIcon style={{ fontSize: '2rem', color: '#2196f3' }} />
              <StorageValue variant="h6">{formatBytes(remainingStorage)}</StorageValue>
              <StorageLabel>Remaining Storage</StorageLabel>
              <StorageNumber>{remainingStorage.toLocaleString()} bytes</StorageNumber>
            </StorageItem>
          </StorageInfo>
          <StorageBarContainer>
            <LinearProgress 
              variant="determinate" 
              value={usagePercentage} 
              color={usagePercentage > 90 ? "secondary" : "primary"}
              style={{ height: 10, borderRadius: 5 }}
            />
            <UsageText>
              <span>0 GB</span>
              <span>{usagePercentage.toFixed(2)}% used</span>
              <span>{formatBytes(TOTAL_STORAGE)}</span>
            </UsageText>
          </StorageBarContainer>
        </>
      )}
    </StorageContainer>
  );
};

export default Storage;