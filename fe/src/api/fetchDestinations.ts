import { type Destination } from '../components/Bento';
import { gql } from '@apollo/client';
import client from './client';

const QUERY = gql`
  {
    allDestinations {
      id,
      name,
      description, 
      image,
      country,
      claims
    }
  }
`;

interface QueryResult {
    allDestinations: Array<Destination>;
}

const fetchDestinations = async (method: string): Promise<Array<Destination> | undefined> => {
  const LENGTH = 12;

  if (method === 'graphql') {
    try {
      const { data } = await client.query<QueryResult>({ query: QUERY });
      if (data && data.allDestinations.length > 0) {
        const dataWithColors = data.allDestinations.map(dest => ({ ...dest, color: getColor() }));
        return dataWithColors;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    const boxes = Array.from({ length: LENGTH }, (_, index) => ({
      id: index + 1,
      color: getColor(),
      name: (index + 1).toString(),
      description: 'Description',
      image: '',
      country: (index + 1).toString() + ' country'
    }));
    return boxes;
  }
  return undefined;
}


const getColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

export default fetchDestinations;