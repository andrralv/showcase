import { MutableRefObject } from 'react';
import sadface from '../../assets/sad-face.svg';
import { type Destination } from '../Bento';

export const failedGameModalContent = (message: string) => {
  return (
  <div>
    <p>{message}</p>
    <img className="sadface-icon" src={sadface}/>
  </div>
  )
}

export const winModalContent = (destination: Destination, callback: () => void) => {
  const content = (
  <div className="modal-inner-content">
    <div>{`Congratulations! You are going to ${destination.name}! You have won!`}</div>
    <div className="claim-modal-spacer">
      <img src={destination.image} alt={destination.name} className='destination-image'/>
      <p className="destination-description">{destination.description}</p>
    </div>
    <button onClick={callback}>Claim this holiday trip!</button>
  </div>
 )
return content;
}

export const selectModalContent = (destination: Destination, ref: MutableRefObject<HTMLSelectElement | null>, destinations: Destination[] | undefined, callback: () => void) => {
  return (
    <div className="modal-inner-content">
      <div>{'One more step! To win this trip, you must correctly select the country this city belongs to.'}</div>
      <p>{`What country is ${destination.name} a city of?`}</p>
      <select name="countries" id="country-list" ref={ref}>
        {
          destinations && destinations.map(d => {
            return(
              <option key={d.id}>{d.country}</option>
            )
          })
        }
      </select>
      <button className="modal-button" onClick={callback}>Choose</button>
    </div>
  );
}