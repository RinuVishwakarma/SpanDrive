import React from 'react';
import { 
  Business as BrandIcon, 
  People as ColleagueIcon, 
  Archive as ArchiveIcon, 
  Storage as StorageIcon 
} from '@material-ui/icons';
import './Sidebar.css'; // Make sure to create this CSS file

const Sidebar = ({ onOptionSelect, selectedOption }) => {
  return (
    <div className="sidebar">
      <div 
        className={`sidebar-option ${selectedOption === 'brand' ? 'selected' : ''}`}
        onClick={() => onOptionSelect('brand')}
      >
        <BrandIcon />
        <span>Brand</span>
      </div>
      <div 
        className={`sidebar-option ${selectedOption === 'colleague' ? 'selected' : ''}`}
        onClick={() => onOptionSelect('colleague')}
      >
        <ColleagueIcon />
        <span>Colleague</span>
      </div>
      <div 
        className={`sidebar-option ${selectedOption === 'archive' ? 'selected' : ''}`}
        onClick={() => onOptionSelect('archive')}
      >
        <ArchiveIcon />
        <span></span>
      </div>
      {/* <div 
        className={`sidebar-option ${selectedOption === 'storage' ? 'selected' : ''}`}
        onClick={() => onOptionSelect('storage')}
      >
        <StorageIcon />
        <span>Storage</span>
      </div> */}
    </div>
  );
};

export default Sidebar;