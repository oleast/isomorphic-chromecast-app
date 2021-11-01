import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { postMessageToBroker } from 'utils/sync';

export const StateSyncBroker: FC = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    setMessage(value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    postMessageToBroker('chromecast', message);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Message
        <input name="message" onChange={handleMessageChange} />
      </label>
      <button type="submit">Send message</button>
    </form>
  );
};
