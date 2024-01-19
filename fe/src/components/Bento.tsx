import './Bento.css';
import { useMediaQuery } from '../assets/hooks/useMediaQuery';
import { getRandomRange, getRow } from '../helpers/numbers';

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

type Props = {
  attempts: number,
  setAttempt: (T: number) => void
}

const Bento: React.FC<Props> = (props: Props) => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  console.log(props.attempts);

  const length = 12;
  const getColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'); // from https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
  const boxes = Array.from({ length }, (_, index) => ({ id: index+1, color: getColor() }));
  
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

      return <div style={bentoStyles} className={`bento-box bento-box-${i}`} key={box.id}>{box.id}</div>
      }
    )}
  </div>)
}

export default Bento;