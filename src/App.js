import * as React from 'react';
import styled from 'styled-components/macro';
import './App.css';
import HouseCard from './HouseCard';
const housesStatic = require('./fullHouses.json');

const App = () => {
  const [houses, setHouses] = React.useState(() =>
    housesStatic.map((house, index) => ({
      ...house,
      id: index
    }))
  );

  const [compareHouses, setCompareHouses] = React.useState([]);

  const toggleMapVisible = index => {
    const newHouses = [...houses];
    const curHouse = newHouses[index];
    curHouse.mapVisible = !curHouse.mapVisible;
    curHouse.wasInit = true;
    setHouses(newHouses);
  };

  const toggleShowImages = index => {
    const newHouses = [...houses];
    const curHouse = newHouses[index];
    curHouse.showImages = !curHouse.showImages;
    curHouse.imageWasInit = true;
    setHouses(newHouses);
  };

  const setCompare = index => {
    const houseIndex = compareHouses.findIndex(number => number === index);
    if (houseIndex < 0) {
      const newHouses = [...houses];
      const newHouse = newHouses[index];
      newHouse.mapVisible = true;
      newHouse.imageWasInit = true;
      newHouse.wasInit = true;
      newHouse.showImages = true;

      setHouses(newHouses);
      setCompareHouses([...compareHouses, index]);
    } else {
      setCompareHouses([
        ...compareHouses.slice(0, houseIndex),
        ...compareHouses.slice(houseIndex + 1)
      ]);
    }
  };

  const openAll = () =>
    setHouses(
      houses.map(house => ({ ...house, mapVisible: true, showImages: true }))
    );
  const closeAll = () =>
    setHouses(
      houses.map(house => ({ ...house, mapVisible: false, showImages: false }))
    );

  return (
    <div>
      <button onClick={openAll}>Open All</button>
      <button onClick={closeAll}>Close All</button>
      {compareHouses.length ? (
        <div>
          <Heading>House Comparison</Heading>
          <CompareHouses>
            {compareHouses.map(index => (
              <HouseCard
                toggleMapVisible={toggleMapVisible}
                toggleShowImages={toggleShowImages}
                setCompare={setCompare}
                house={houses[index]}
                key={`compare:${index}`}
              />
            ))}
          </CompareHouses>
        </div>
      ) : null}
      <Heading>House List</Heading>
      {houses.map(house => {
        return (
          <HouseCard
            toggleMapVisible={toggleMapVisible}
            toggleShowImages={toggleShowImages}
            setCompare={setCompare}
            house={house}
            key={house.address}
          />
        );
      })}
    </div>
  );
};

export default App;

const CompareHouses = styled.div`
  display: flex;
  margin-bottom: 4.8rem;
`;

const Heading = styled.h2`
  text-align: center;
  margin: 3.2rem 0;
`;
