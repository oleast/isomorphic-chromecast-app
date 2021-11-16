import { createPlayer } from 'features/players/player';
import { playerAdded } from 'features/players/playersSlice';
import { ChangeEvent, FC, FormEvent, MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

import _s from './ControlPanel.module.scss';

export const ControlPanel: FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePlayerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const player = createPlayer(name);
    dispatch(playerAdded(player));
  };

  const handleOpenNewBrowser: MouseEventHandler<HTMLButtonElement> = () => {
    openGameInBrowser();
  };

  return (
    <div className={_s.controlPanel}>
      <form onSubmit={handlePlayerSubmit}>
        <label>
          Navn på spiller
          <input name="name" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Legg til spiller</button>
      </form>
      <button onClick={handleOpenNewBrowser}>Åpne spillvindu</button>
    </div>
  );
};

export const openGameInBrowser = () => {
  const windowFeatures = {
    location: 'yes',
    height: 570,
    width: 520,
    scrollbar: 'no',
    status: 'yes',
  };
  const windowFeaturesString = Object.entries(windowFeatures)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  const gameUrl = `${window.origin}/receiver/browser-tab`;
  window.open(gameUrl, '_blank', windowFeaturesString);
};
