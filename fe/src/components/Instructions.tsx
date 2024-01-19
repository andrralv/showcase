type Props = {
  attempts: number
}

const Instructions = (props: Props) => {
  const  { attempts } = props;
  return (
    <div className="instructions">
    <p>You have won an all inclusive holiday trip to one of these attractive destinations. You only need to correctly guess the city you're going to!</p>
    <p> You have up to three attempts to guess the correct city!</p>
    <p>You have (<strong style={{ color: 'red' }}>{attempts}</strong>) attempts left.</p>
  </div>
  )
}

export default Instructions;