








import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

const DataContainer = styled.div`
  width: 1140px;
  height: 1vh;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 2vh;
    padding: 0px 0px;
  }
`;

const Data = () => {
  const [currentCategory, setCurrentCategory] = useState('BRANDS');
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: 'HOME', name: 'HOME' },
    { id: 'BRANDS', name: 'BRANDS' }
  ]);

  const handleSidebarOptionSelect = useCallback((option) => {
    setCurrentCategory(option);
    setCurrentFolderId(null);
    setBreadcrumbs([
      { id: 'HOME', name: 'HOME' },
      { id: option, name: option.charAt(0).toUpperCase() + option.slice(1) }
    ]);
  }, []);

  const handleFolderSelect = useCallback((category, folderId, folderName, folderPath) => {
    setCurrentCategory(category);
    setCurrentFolderId(folderId);
    setBreadcrumbs([
      { id: 'HOME', name: 'HOME' },
      { id: category, name: category.charAt(0).toUpperCase() + category.slice(1) },
      ...folderPath.map(folder => ({ id: folder.id, name: folder.name }))
    ]);
  }, []);

  const handleBreadcrumbClick = useCallback((id, index) => {
    if (index === 0) {
      // Clicked on Home
      handleSidebarOptionSelect('BRANDS');
    } else if (index === 1) {
      // Clicked on category
      handleSidebarOptionSelect(id);
    } else {
      // Clicked on a folder
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setBreadcrumbs(newBreadcrumbs);
      setCurrentFolderId(id);
    }
  }, [breadcrumbs, handleSidebarOptionSelect]);

  return (
    <DataContainer>
      <Breadcrumb items={breadcrumbs} onBreadcrumbClick={handleBreadcrumbClick} />
      <div className='welcome_container' >
        <div className='welcome_content'> 
          <Welcome />
        </div>
      </div>
      <Sidebar 
        onOptionSelect={handleSidebarOptionSelect} 
        onFolderSelect={handleFolderSelect}
        currentCategory={currentCategory}
        currentFolderId={currentFolderId}
      />
    </DataContainer>
  );
};

export default Data;









