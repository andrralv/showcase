import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease } from '../redux/attempts';
import { openSuccessModal, closeModal, successModalOpen } from '../redux/modal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getRandomRange, getRow } from '../helpers/numbers';
import { flex, grid } from './Bento.styles';
import Modal from './Modal';
import fetchDestinations from '../api/fetchDestinations';

import './Bento.css';

export type Destination = {
  id: number,
  name?: string,
  description?: string,
  image?: string,
  color?: string
}

const LENGTH = 12;

const Bento: React.FC = () => {
  const magicNumber = getRandomRange(LENGTH);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [destination, setDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Array<Destination>>([])

  const dispatch = useDispatch();
  const isOpen = useSelector(successModalOpen);

  useEffect(() => {
    openModalHandler();
    const _destinations = fetchDestinations();
    setDestinations(_destinations);
  }, []);

  const getModalContent = (destination: Destination) => {
    const modalBody = (
    <div className="modal-inner-content">
      <div>{`Congratulations! You are going to ${destination.name}! You have won!`}</div>
      <div className="claim-modal-spacer">
        <p className="destination-description">{destination.description}</p>
      </div>
      <button onClick={closeModalHandler}>Claim this holiday trip!</button>
    </div>
   )
  return modalBody;
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
      {getModalContent(destination)}
    </Modal>}

    {destinations && destinations.map((box, i: number) => {
      const randomNumber = getRandomRange(2);
      const bentoStyles = { 
        backgroundColor: box.color, 
        minHeight: '100px',
        display: 'grid',
        alignItems: 'center',
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