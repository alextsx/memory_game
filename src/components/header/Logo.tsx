'use client';

import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useAlert } from '@/hocs/AlertProvider';
import { selectGameStatus, startGame } from '@/redux/game.slice';
import { selectSettings } from '@/redux/settings.slice';

export const Logo = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const { isGameStarted } = useSelector(selectGameStatus);
  const { show: showAlert } = useAlert();
  const isDisabled = isGameStarted;

  const handleGameStart = () => {
    if (isDisabled) return;
    dispatch(startGame(settings));
    showAlert({
      message: 'Good luck! 😃',
      title: 'Game Started',
      variant: 'constructive'
    });
  };

  return (
    <Image
      src="/assets/img/logo.svg"
      width={215}
      height={119}
      alt="Memo mission logo, starts the game"
      onClick={handleGameStart}
      className={cn({ disabled: isDisabled })}
    />
  );
};
