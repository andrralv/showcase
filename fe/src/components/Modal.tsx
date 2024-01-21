import { ReactNode, useRef } from "react";
import { useDispatch } from 'react-redux';
import useClickAway from "../hooks/useClickAway";
import { closeModal } from '../redux/modal';

import './Modal.css';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode
};

const Modal: React.FC<Props> = (props: Props) => {
  const { isOpen, children, onClose } = props;
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleOnClickAway = () => {
    dispatch(closeModal());
  };

  useClickAway(modalRef, handleOnClickAway);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header"><button onClick={onClose}>X</button></div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;