
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAttempts } from '../redux/attempts';
import { openFailureModal, closeModal, failureModalOpen } from '../redux/modal';
import { failedGameModalContent } from './helperComponents/modals';
import Modal from './Modal';

import './Instructions.css';

const Instructions = () => {
  const attempts = useSelector(selectAttempts);
  const dispatch = useDispatch();
  const isOpen = useSelector(failureModalOpen);

  useEffect(() => {
    if (attempts === 0) {
      dispatch(openFailureModal());
    }
  }, [attempts]);

  const closeModalHandler = () => {
    dispatch(closeModal());
  }

  return (
    <div className="instructions">
      <Modal isOpen={isOpen} onClose={closeModalHandler}>
        {failedGameModalContent('You have used your three (3) attempts! You lost!')}
      </Modal>
      <div>
        <p>You have the chance to win an all inclusive holiday trip to one of these attractive destinations! The price is hidden inside one of these cities.</p>
        <p>You have up to three attempts to guess the correct city.</p>
      </div>
      <p>You have (<strong style={{ color: 'red' }}>{attempts}</strong>) attempts left.</p>
  </div>
  )
}

export default Instructions;