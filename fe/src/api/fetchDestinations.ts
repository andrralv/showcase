// import config from '../config';
import {type Destination} from '../components/Bento';

const fetchDestinations = (): Array<Destination> => {
  const LENGTH = 12;
  // if (config.httpMethod === 'local') {
    const getColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'); // from https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    const boxes = Array.from({ length: LENGTH }, (_, index) => ({ id: index+1, color: getColor(), name: (index+1).toString(), description: 'Pending description', image: '' }));
    return boxes;
  // }
}

export default fetchDestinations;