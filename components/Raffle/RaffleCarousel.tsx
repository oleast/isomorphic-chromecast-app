import {
  createRef,
  CSSProperties,
  FC,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';

import { PlayerCard } from './PlayerCard';

import _s from './RaffleCarousel.module.scss';
import { useDispatch, useSelector } from 'store/hooks';
import { playersSelectors } from 'features/players/playersSlice';
import { State } from 'store';

interface CarouselCSS extends CSSProperties {
  '--x-position': string;
}

interface Props {
  className?: string;
}

export const RaffleCarousel: FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const raffleEntries = useSelector((state) => state.raffleGame.entries);
  const winnerEntryId = useSelector((state) => state.raffleGame.winnerEntryId);
  const winnerPlayer = useSelector(selectPlayerByRaffleEntryId(winnerEntryId));

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [winnerPositionX, setWinnerPositionX] = useState<number>(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const entryIds = useMemo(
    () => raffleEntries.map((entry) => entry.id),
    [raffleEntries]
  );

  const entryCardRefs = useMemo(
    () => createRefMap<HTMLDivElement, string>(entryIds),
    [String(entryIds)]
  );

  const winnerElementRef = entryCardRefs.get(winnerEntryId);

  useEffect(() => {
    if (winnerElementRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const winnerCardElement = winnerElementRef.current;
      const { width: scrollContainerWidth } =
        scrollContainer.getBoundingClientRect();
      const { width: winnerCardWidth } =
        winnerCardElement.getBoundingClientRect();
      const { offsetLeft } = winnerCardElement;
      const middleOfCardPosition =
        offsetLeft - scrollContainerWidth / 2 + winnerCardWidth / 2;
      setWinnerPositionX(middleOfCardPosition);
    }
  }, [winnerElementRef]);

  useEffect(() => {
    setIsFirstRender(false);
  }, [setIsFirstRender]);

  return (
    <div ref={scrollContainerRef} className={cx(_s.scrollContainer, className)}>
      <div
        className={_s.carousel}
        style={{ '--x-position': `-${winnerPositionX}px` } as CarouselCSS}
      >
        {raffleEntries.map((entry, index) => (
          <PlayerCard
            key={entry.id}
            index={index}
            ref={entryCardRefs.get(entry.id)}
            playerId={entry.contestantId}
            active
            hidden={isFirstRender && index >= 10}
          />
        ))}
      </div>
      <p>{winnerPlayer.name}</p>
    </div>
  );
};

const selectPlayerByRaffleEntryId =
  (raffleEntryId: string) => (state: State) => {
    const raffleEntry = state.raffleGame.entries.find(
      (entry) => entry.id === raffleEntryId
    );
    const player = playersSelectors.selectById(
      state.players,
      raffleEntry.contestantId
    );
    return player;
  };

function createRefMap<K extends HTMLElement, T>(
  values: T[]
): Map<T, MutableRefObject<K>> {
  const entries = values.map(
    (value) => [value, createRef<K>()] as [T, MutableRefObject<K>]
  );
  return new Map(entries);
}
