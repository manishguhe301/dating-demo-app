import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Card from './components/Card';
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import Cards from './components/bookmarks/Card';
import './App.css';
import LikesPage from './components/likes/LikesPage';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #f5f7fa, #c3cfe2); 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Navbar = styled.div`
  position: sticky;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff69b4;
  border-bottom: 1px solid #ddd;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  font-size: 24px;
  border-radius: 25px 25px 0px 0px;

  @media (max-width: 768px) {
    font-size: 20px;
    border-radius: 0;
  }
`;

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 375px;
  margin: auto;
  border: 1px solid #ddd;
  background-color: #ffc0cb;
  box-sizing: border-box;
  border-radius: 25px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const NavigationButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BottomNav = styled(BottomNavigation)`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #ff69b4;
  .MuiBottomNavigationAction-root {
    flex: 1;
  }
`;

const Message = styled.div`
  font-size: 20px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;

export const BookmarkContext = React.createContext();
export const LikeContext = React.createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const addToBookmark = (data) => {
    setBookmarkedData([...bookmarkedData, data]);
  };

  const removeFromBookmark = (data) => {
    setBookmarkedData(bookmarkedData.filter((item) => item.id !== data.id));
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedData, addToBookmark, removeFromBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const LikeProvider = ({ children }) => {
  const [likedData, setLikedData] = useState([]);
  const addToLike = (data) => {
    setLikedData([...likedData, data]);
  };

  const removeFromLike = (data) => {
    setLikedData(likedData.filter((item) => item.id !== data.id));
  };

  return (
    <LikeContext.Provider value={{ likedData, addToLike, removeFromLike }}>
      {children}
    </LikeContext.Provider>
  );
};



function App() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetch('https://randomuser.me/api')
      .then((response) => response.json())
      .then((json) => setImage(json.results[0]));
  }, [currentCard]);

  const handlePrevious = () => {
    setCurrentCard(currentCard > 0 ? currentCard - 1 : 0);
  };

  const handleNext = () => {
    setCurrentCard(
      currentCard < data.length - 1 ? currentCard + 1 : data.length - 1
    );
  };

  return (
    <>
      <BookmarkProvider>
        <LikeProvider>
          <GlobalStyle />
          <MobileLayout>
            <Navbar>Love💘Connect</Navbar>
            {value === 0 && data.length > 0 && (
              <>
                <Card data={data[currentCard]} image={image} />
                <NavigationButtons>
                  <Button
                    className='navigationButton'
                    variant='contained'
                    onClick={handlePrevious}
                  >
                    <ArrowBackIosNewRoundedIcon />
                  </Button>
                  <Button
                    className='navigationButton'
                    variant='contained'
                    onClick={handleNext}
                  >
                    <ArrowForwardIosRoundedIcon />
                  </Button>
                </NavigationButtons>
              </>
            )}
            {value === 1 && (
              <div>
                <BookmarkContext.Consumer>
                  {({ bookmarkedData }) => (
                    <>
                      {bookmarkedData.length > 0 ? (
                        <Cards />
                      ) : (
                        <Message>No Bookmarked yet!</Message>
                      )}
                    </>
                  )}
                </BookmarkContext.Consumer>
              </div>
            )}
            {value === 2 && (
              <div>
                <LikeContext.Consumer>
                  {({ likedData }) => (
                    <>
                      {likedData.length > 0 ? (
                        <LikesPage />
                      ) : (
                        <Message>No Liked yet!</Message>
                      )}
                    </>
                  )}
                </LikeContext.Consumer>
              </div>
            )}
            <BottomNav
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
            >
              <BottomNavigationAction label='Home' icon={<HomeIcon />} />
              <BottomNavigationAction
                label='Bookmarked'
                icon={<BookmarkIcon />}
              />
              <BottomNavigationAction label='Liked' icon={<FavoriteIcon />} />
            </BottomNav>
          </MobileLayout>
        </LikeProvider>
      </BookmarkProvider>
    </>
  );
}

export default App;
