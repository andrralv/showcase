import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getRandomRange, getRow } from '../helpers/numbers';

import './Bento.css';

const flex = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px'
};

const grid = {
  backgroundColor: 'whitesmoke',
  borderRadius: '1em',
  alignItems: 'center',
  padding: '20px',
  width: '80%',
  margin: '0 auto',
  display: 'grid',
  gridAutoFlow: 'dense',
  gridTemplateColumns: 'auto auto auto auto',
  gap: '10px'
};

type Destination = {
  id: number,
  name?: string,
  description?: string,
  image?: string,
  color?: string
}

type Props = {
  updateAttempts: () => void;
}

const Bento: React.FC<Props> = (props: Props) => {
  const magicNumber = getRandomRange(12);
  const isMobile = useMediaQuery('(max-width: 800px)');

  const length = 12;
  const getColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'); // from https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
  const boxes = Array.from({ length }, (_, index) => ({ id: index+1, color: getColor() }));

  const bentoClickHandler = (destination: Destination) => {
    const { updateAttempts } = props;
    if (destination.id === magicNumber) {
      console.log("You won!");
    } else {
      updateAttempts();
    }
  };
  
  return (
  <div style={isMobile ? flex : grid } className="bento">
    {boxes.map((box, i: number) => {

      const randomNumber = getRandomRange(2);
      const bentoStyles = { 
        backgroundColor: box.color, 
        minHeight: '100px',
        display: 'grid',
        alignItems: 'center',
        gridRow: `${getRow(i)} / span ${randomNumber}`,
      }

      return <div 
        onClick={() => bentoClickHandler(box)} 
        style={bentoStyles} 
        className={`bento-box bento-box-${i}`}
        key={box.id}>
          {box.id}
        </div>
      }
    )}
  </div>)
}

export default Bento;