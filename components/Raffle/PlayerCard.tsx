import { Player, PlayerColor } from 'features/players/player';
import { forwardRef, useCallback, useRef, useState } from 'react';
import cx from 'classnames';
import { mergeRefs } from 'react-merge-refs';

import _s from './PlayerCard.module.scss';
import { useSelector } from 'store/hooks';
import { playersSelectors } from 'features/players/playersSlice';
import { shallowEqual } from 'react-redux';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { State } from 'store';

interface Props {
  className?: string;
  playerId: string;
  active: boolean;
  index: number;
  hidden: boolean;
}

const CARD_COLOR: Record<PlayerColor, string> = {
  sol: _s.sol,
  hav: _s.hav,
  kveld: _s.kveld,
  skyfritt: _s.skyfritt,
  solnedgang: _s.solnedgang,
  soloppgang: _s.soloppgang,
};

export const PlayerCard = forwardRef<HTMLDivElement, Props>(
  ({ className, playerId, index }, ref) => {
    const [isActive, setIsActive] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleVisibilityChange = useCallback(
      (isVisible: boolean) => {
        setIsActive(isVisible);
        console.log(playerId, isVisible);
      },
      [setIsActive, playerId]
    );

    const handleIntersection = useCallback(
      (entry: IntersectionObserverEntry) => {
        handleVisibilityChange(entry.isIntersecting);
      },
      [handleVisibilityChange]
    );

    useIntersectionObserver(cardRef, handleIntersection);

    const { name, color } = useSelector(
      selectPlayerById(playerId),
      shallowEqual
    );

    const colorClassName = CARD_COLOR[color];

    return (
      <div
        ref={mergeRefs([ref, cardRef])}
        className={cx(className, _s.playerCard, {
          [_s.active]: isActive,
          [colorClassName]: isActive,
        })}
      >
        <p className={_s.name}>{'#' + index + ' ' + name}</p>
      </div>
    );
  }
);

PlayerCard.displayName = 'PlayerCard';

const selectPlayerById =
  (playerId: string) =>
  (state: State): Player => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return playersSelectors.selectById(state.players, playerId)!;
  };
