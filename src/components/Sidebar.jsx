import React from 'react';
import { 
  Business as BrandIcon, 
  People as ColleagueIcon, 
  Archive as ArchiveIcon, 
  Storage as StorageIcon 
} from '@material-ui/icons';
import Brand from './Brand';
import Colleague from './Colleague';
import Archive from './Archives';
import Storage from './Storage';

const Sidebar = ({ onOptionSelect, onFolderSelect, currentCategory, currentFolderId }) => {
  // Add user role check
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const isAdmin = userInfo?.role === 'admin';

  const renderActiveComponent = () => {
    switch(currentCategory) {
      case 'BRANDS':
        return <Brand onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'COLLEAGUES':
        return <Colleague onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'ARCHIVES':
        return <Archive onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'STORAGE':
        // Only render Storage component if user is admin
        return isAdmin ? <Storage onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} /> : null;
      default:
        return <Brand onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
    }
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <div className="sidebar-with-content">
      <div className="sidebar-container">
        <div 
          className={`sidebar-option ${currentCategory === 'BRANDS' ? 'active' : ''}`}
          onClick={() => handleOptionClick('BRANDS')}
        >
          <BrandIcon />
          BRANDS
        </div>
        <div 
          className={`sidebar-option ${currentCategory === 'COLLEAGUES' ? 'active' : ''}`}
          onClick={() => handleOptionClick('COLLEAGUES')}
        >
          <ColleagueIcon />
          COLLEAGUES
        </div>
        <div 
          className={`sidebar-option ${currentCategory === 'ARCHIVES' ? 'active' : ''}`}
          onClick={() => handleOptionClick('ARCHIVES')}
        >
          <ArchiveIcon />
          ARCHIVES
        </div>
        {/* Only show storage option if user is admin */}
        {isAdmin && (
          <div 
            className={`sidebar-option ${currentCategory === 'STORAGE' ? 'active' : ''}`}
            onClick={() => handleOptionClick('STORAGE')}
          >
            <StorageIcon />
            STORAGE
          </div>
        )}
      </div>
      <div className="content-area">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Sidebar;