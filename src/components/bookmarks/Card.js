import React, { useContext } from 'react';
import { BookmarkContext } from '../../App';
import { Bio, CardContainer, Image } from '../Card';
import styled from 'styled-components';

const StyledContainer = styled(CardContainer)`
  height: auto;
`;
const Cards = () => {
  const { bookmarkedData } = useContext(BookmarkContext);
  return (
    <>
      {bookmarkedData.map((item, index) => {
        return (
          <StyledContainer>
            <Image src={item.picture?.large} alt='Person' />
            <Bio>
              <div className='name'>
                {item.name?.first} {item.name?.last}
              </div>
              <div className='details' style={{ textTransform: 'capitalize' }}>
                {item.dob?.age}, {item?.gender}, {item.location?.city}
              </div>
            </Bio>
          </StyledContainer>
        );
      })}
    </>
  );
};

export default Cards;
