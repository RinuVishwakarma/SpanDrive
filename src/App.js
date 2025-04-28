import React, { useState, useEffect, useCallback } from 'react';
import Data from './components/Data';
import Header from './components/Header';
import { auth } from './firebase';
import styled from 'styled-components';
import SignIn, { AUTHORIZED_USERS } from './SignIn';
import Footer from './components/Footer';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgrey;
  font-size: 24px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('BRAND');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // Get the stored user info from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && AUTHORIZED_USERS[storedUser.email]) {
          setUser({
            ...authUser,
            displayName: storedUser.displayName,
            role: storedUser.role
          });
        } else {
          // If user not in authorized list, sign them out
          auth.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user'); // Clear stored user info
    }).catch(error => {
      alert(error.message);
    });
  };

  const handleLogoClick = useCallback(() => {
    setCurrentFolderId(null);
    setSelectedOption('BRAND');
  }, []);

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
    setCurrentFolderId(null);
  }, []);

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <>
      {user ? (
        <>
          <Header
            photoURL={user.photoURL}
            email={user.email}
            displayName={user.displayName}
            onSignOut={signOut}
            onLogoClick={handleLogoClick}
          />
          <div className="App" style={{ display: 'flex' }}>
            <Data 
              currentFolderId={currentFolderId} 
              setCurrentFolderId={setCurrentFolderId}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
              user={user}
            />
          </div>
        </>
      ) : (
        <SignIn onSignIn={() => auth.onAuthStateChanged(setUser)} />
      )}
    </>
  );
}

export default App;
