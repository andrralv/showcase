import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease } from '../redux/attempts';
import { openSuccessModal, closeModal, successModalOpen } from '../redux/modal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getRandomRange, getRow } from '../helpers/numbers';
import { flex, grid } from './Bento.styles';
import { failedGameModalContent, selectModalContent, winModalContent } from './helperComponents/modals';
import Modal from './Modal';
import fetchDestinations from '../api/fetchDestinations';

import './Bento.css';

export type Destination = {
  id: number,
  name?: string,
  country?: string,
  description?: string,
  image?: string,
  color?: string
}

const LENGTH = 12;

const Bento: React.FC = () => {
  const magicNumber = getRandomRange(LENGTH);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [destination, setDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Array<Destination> | undefined>([])
  const [modalContent, setModalContent] = useState<React.ReactElement<unknown>>();

  const dispatch = useDispatch();
  const isOpen = useSelector(successModalOpen);

  useEffect(() => {
    openModalHandler();
    getDestinationsFromApi ();
    console.log(destinations);
    if (destination) {
      setModalContent(<SelectModalContent destination={destination} destinations={destinations}/>);
    }
  }, [destination]);

  const getDestinationsFromApi = async () => {
    const _destinations = await fetchDestinations('graphql');
    setDestinations(_destinations);
    return _destinations;
  }


  type SelectModalProps = {
    destinations: Destination[] | undefined, 
    destination: Destination
  }
  
  const SelectModalContent = (props: SelectModalProps) => {
    const { destination, destinations } = props;
    const selectRef = useRef(null);

    const goToYoutube = (destination: Destination) => {
      window.location.href = `https://www.youtube.com/results?search_query=${destination.name}`
    }
    
    const checkCountry = () => {
      if (selectRef.current && (selectRef.current as HTMLSelectElement).value === destination.country) {
        setModalContent(winModalContent(destination, () => goToYoutube(destination)));
      } else {
        setModalContent(failedGameModalContent('That is incorrect! You lost, thank you for playing.'));
      }
    }
    return selectModalContent(destination, selectRef, destinations, checkCountry);
  }

  const openModalHandler = (destination?: Destination) => {
    if (destination) {
      dispatch(openSuccessModal({
        additionalData: destination
      }))
    }
  }

  const closeModalHandler = () => {
    dispatch(closeModal());
  }

  const bentoClickHandler = (destination: Destination) => {
    if (destination.id === magicNumber) {
        openModalHandler(destination);
        setDestination(destination);
    } else {
      dispatch(decrease());
    }
  };
  
  return (
  <div style={isMobile ? flex : grid } className="bento">
    {destination && <Modal isOpen={isOpen} onClose={closeModalHandler}>
      {modalContent}
    </Modal>}

    {destinations && destinations.map((box, i: number) => {
      const randomNumber = getRandomRange(2);
      const bentoStyles = { 
        backgroundColor: box.color, 
        backgroundBlendMode: 'darken',
        backgroundImage: `url(${box.image})`,
        gridRow: `${getRow(i)} / span ${randomNumber}`,
      }

      return (
        <div 
          onClick={() => bentoClickHandler(box)} 
          style={bentoStyles} 
          className={`bento-box bento-box-${i}`}
          key={box.id}>
            {box.name}
        </div>
        )
      }
    )}
  </div>)
}

export default Bento;