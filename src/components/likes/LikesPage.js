import React, { useContext } from 'react';
import styled from 'styled-components';
import { LikeContext } from '../../App';
import { Bio, CardContainer, Image } from '../Card';

const StyledContainer = styled(CardContainer)`
  height: auto;
`;

const LikesPage = () => {
  const { likedData } = useContext(LikeContext);

  return (
    <>
      {likedData.map((item, index) => {
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

export default LikesPage;
