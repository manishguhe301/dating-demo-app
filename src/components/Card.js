import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { BookmarkContext, LikeContext } from '../App';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  height: 400px;
  @media (max-width: 768px) {
    height: 50vh;
    justify-content: space-evenly;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 10px;
  @media (max-width: 768px) {
    height: 70%;
  }
  @media (max-width: 480px) {
    height: 60%;
  }
`;

export const Bio = styled.div`
  margin: 20px 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;

  .name {
    font-weight: 600;
  }

  .details {
    color: #777;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff69b4;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #ffc0cb;
  }
`;

const Card = ({ image }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { bookmarkedData, addToBookmark, removeFromBookmark } =
    useContext(BookmarkContext);
  const { likedData, addToLike, removeFromLike } = useContext(LikeContext);

  useEffect(() => {
    const isAlreadyBookmarked = bookmarkedData.some(
      (item) => item.login.uuid === image.login.uuid
    );
    setIsBookmarked(isAlreadyBookmarked);
  }, [bookmarkedData, image]);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeFromBookmark(image);
    } else {
      addToBookmark(image);
    }
    setIsBookmarked(!isBookmarked);
    console.log(bookmarkedData);
  };

  useEffect(() => {
    const isAlreadyLiked = likedData.some(
      (item) => item.login.uuid === image.login.uuid
    );
    setIsLiked(isAlreadyLiked);
  }, [likedData, image]);

  const handleLike = () => {
    if (isLiked) {
      removeFromLike(image);
    } else {
      addToLike(image);
    }
    setIsLiked(!isLiked);
    console.log(likedData);
  };

  return (
    <CardContainer>
      {image && <Image src={image.picture?.large} alt='Person' />}
      <Bio>
        <div className='name'>
          {image.name?.first} {image.name?.last}
        </div>
        <div className='details' style={{ textTransform: 'capitalize' }}>
          {image.dob?.age}, {image?.gender}, {image.location?.city}
        </div>
      </Bio>
      <ButtonContainer>
        <Button onClick={handleBookmark}>
          {isBookmarked ? (
            <BookmarkOutlinedIcon />
          ) : (
            <BookmarkAddOutlinedIcon />
          )}
        </Button>
        <Button onClick={handleLike}>
          {isLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </Button>
        <Button onClick={() => setIsDisliked(!isDisliked)}>
          {isDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
        </Button>
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
