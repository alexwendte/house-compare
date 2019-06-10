import * as React from 'react';
import styled from 'styled-components/macro';

export default ({ house, setCompare, toggleShowImages, toggleMapVisible }) => {
  const {
    address,
    id,
    description,
    lat,
    long,
    fov,
    heading,
    mapVisible,
    wasInit,
    showImages,
    imageWasInit,
    images
  } = house;
  return (
    <HouseCardDiv key={address}>
      <CardHeader>
        <HouseHeading>{address}</HouseHeading>
        <span style={{ padding: '0 24px' }}>{images.length} images</span>
        <div>
          {heading ? (
            <HouseButton onClick={() => toggleMapVisible(id)}>
              Toggle Map
            </HouseButton>
          ) : null}
          {images.length ? (
            <HouseButton onClick={() => toggleShowImages(id)}>
              Toggle Images
            </HouseButton>
          ) : null}
        </div>
      </CardHeader>
      <Description>{description}</Description>
      <HouseButton onClick={() => setCompare(id)}>Toggle Compare</HouseButton>

      {(showImages || imageWasInit) && images.length
        ? images.map(image => (
            <HouseImage src={image} key={image} visible={showImages} />
          ))
        : null}
      {(wasInit || mapVisible) && (
        <HouseMap
          title="Street View"
          width="1000"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyADYv2uIYX0FWPykJn_xMzFWodm-33bTIE&location=${lat},${long}&fov=${fov}&heading=${heading}`}
          id="embed"
          allowFullScreen=""
          kwframeid="1"
          visible={mapVisible}
        />
      )}
    </HouseCardDiv>
  );
};

const HouseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(69, 50, 93, 0.1) 0px 15px 35px,
    rgba(0, 0, 0, 0.07) 0px 5px 15px;
  max-width: 1600px;
  margin: 0 auto 32px;
  border-radius: 5px;
  padding: 32px 2.4rem;
`;
const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  align-items: center;
`;

const HouseImage = styled.img`
  width: 1000px;
  height: 600px;
  object-fit: cover;
  display: ${props => (props.visible ? 'block' : 'none')};
  border-radius: 5px;
  box-shadow: rgba(69, 50, 93, 0.1) 0px 15px 35px,
    rgba(0, 0, 0, 0.07) 0px 5px 15px;
`;

const HouseHeading = styled.h2``;

const HouseButton = styled.button`
  margin: 0 16px 16px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  background: coral;
  color: white;
  padding: 8px 16px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const HouseMap = styled.iframe`
  display: ${props => (props.visible ? 'block' : 'none')};
  box-shadow: rgba(69, 50, 93, 0.1) 0px 15px 35px,
    rgba(0, 0, 0, 0.07) 0px 5px 15px;
  border-radius: 5px;
`;

const Description = styled.p``;
