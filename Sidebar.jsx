// import React from 'react';
// import { 
//   Business as BrandIcon, 
//   People as ColleagueIcon, 
//   Archive as ArchiveIcon, 
//   Storage as StorageIcon 
// } from '@material-ui/icons';
// import Brand from './Brand';
// import Archive from './Archive';
// import Colleague from './Colleague';
// import Storage from './Storage';

// const Sidebar = ({ onOptionSelect, onFolderSelect, currentCategory, currentFolderId }) => {
//   const renderActiveComponent = () => {
//     switch(currentCategory) {
//       case 'BRAND':
//         return <Brand onFolderSelect={(folderId, folderName, folderPath) => onFolderSelect('BRAND', folderId, folderName, folderPath)} currentFolderId={currentFolderId} />;
//       case 'COLLEAGUE':
//         return <Colleague onFolderSelect={(folderId, folderName, folderPath) => onFolderSelect('COLLEAGUE', folderId, folderName, folderPath)} currentFolderId={currentFolderId} />;
//       case 'ARCHIVE':
//         return <Archive onFolderSelect={(folderId, folderName, folderPath) => onFolderSelect('ARCHIVE', folderId, folderName, folderPath)} currentFolderId={currentFolderId} />;
//       case 'STORAGE':
//         return <Storage onFolderSelect={(folderId, folderName, folderPath) => onFolderSelect('STORAGE', folderId, folderName, folderPath)} currentFolderId={currentFolderId} />;
//       default:
//         return <Brand onFolderSelect={(folderId, folderName, folderPath) => onFolderSelect('BRAND', folderId, folderName, folderPath)} currentFolderId={currentFolderId} />;
//     }
//   };

//   const handleOptionClick = (option) => {
//     onOptionSelect(option);
//   };

//   return (
//     <div className="sidebar-with-content">
//       <div className="sidebar-container">
//         <div 
//           className={`sidebar-option ${currentCategory === 'BRAND' ? 'active' : ''}`}
//           onClick={() => handleOptionClick('BRAND')}
//         >
//           <BrandIcon />
//           BRAND
//         </div>
//         <div 
//           className={`sidebar-option ${currentCategory === 'COLLEAGUE' ? 'active' : ''}`}
//           onClick={() => handleOptionClick('COLLEAGUE')}
//         >
//           <ColleagueIcon />
//           COLLEAGUE
//         </div>
//         <div 
//           className={`sidebar-option ${currentCategory === 'ARCHIVE' ? 'active' : ''}`}
//           onClick={() => handleOptionClick('ARCHIVE')}
//         >
//           <ArchiveIcon />
//           ARCHIVE
//         </div>
//         <div 
//           className={`sidebar-option ${currentCategory === 'STORAGE' ? 'active' : ''}`}
//           onClick={() => handleOptionClick('STORAGE')}
//         >
//           <StorageIcon />
//           STORAGE
//         </div>
//       </div>
//       <div className="content-area">
//         {renderActiveComponent()}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





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
  const renderActiveComponent = () => {
    switch(currentCategory) {
      case 'BRANDS':
        return <Brand onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'COLLEAGUES':
        return <Colleague onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'ARCHIVES':
        return <Archive onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
      case 'STORAGE':
        return <Storage onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
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
        <div 
          className={`sidebar-option ${currentCategory === 'STORAGE' ? 'active' : ''}`}
          onClick={() => handleOptionClick('STORAGE')}
        >
          <StorageIcon />
          STORAGE
        </div>
      </div>
      <div className="content-area">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Sidebar;







// import React from 'react';
// import { 
//   Business as BrandIcon, 
//   People as ColleagueIcon, 
//   Archive as ArchiveIcon, 
//   Storage as StorageIcon 
// } from '@material-ui/icons';
// import Brand from './Brand';
// import Colleague from './Colleague';
// import Archive from './Archive';
// import Storage from './Storage';
// import styled from 'styled-components';

// const SidebarContainer = styled.div`
//   display: flex;
//   height: 100%;
// `;

// const SidebarOptions = styled.div`
//   width: 200px;
//   background-color: #f0f0f0;
//   padding: 20px;
// `;

// const SidebarOption = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #e0e0e0;
//   }
//   ${props => props.active && `
//     background-color: #d0d0d0;
//     font-weight: bold;
//   `}
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   padding: 20px;
// `;

// const Sidebar = ({ onOptionSelect, onFolderSelect, currentCategory, currentFolderId }) => {
//   const renderActiveComponent = () => {
//     switch(currentCategory) {
//       case 'BRAND':
//         return <Brand onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
//       case 'COLLEAGUE':
//         return <Colleague onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
//       case 'ARCHIVE':
//         return <Archive onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
//       case 'STORAGE':
//         return <Storage onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
//       default:
//         return <Brand onFolderSelect={onFolderSelect} currentFolderId={currentFolderId} />;
//     }
//   };

//   return (
//     <SidebarContainer>
//       <SidebarOptions>
//         <SidebarOption 
//           active={currentCategory === 'BRAND'} 
//           onClick={() => onOptionSelect('BRAND')}
//         >
//           <BrandIcon /> BRAND
//         </SidebarOption>
//         <SidebarOption 
//           active={currentCategory === 'COLLEAGUE'} 
//           onClick={() => onOptionSelect('COLLEAGUE')}
//         >
//           <ColleagueIcon /> COLLEAGUE
//         </SidebarOption>
//         <SidebarOption 
//           active={currentCategory === 'ARCHIVE'} 
//           onClick={() => onOptionSelect('ARCHIVE')}
//         >
//           <ArchiveIcon /> ARCHIVE
//         </SidebarOption>
//         <SidebarOption 
//           active={currentCategory === 'STORAGE'} 
//           onClick={() => onOptionSelect('STORAGE')}
//         >
//           <StorageIcon /> STORAGE
//         </SidebarOption>
//       </SidebarOptions>
//       <ContentArea>
//         {renderActiveComponent()}
//       </ContentArea>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;