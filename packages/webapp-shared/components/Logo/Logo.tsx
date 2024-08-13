import React from 'react';
import LogoImg from '../../lib/assets/adart-logo.svg';
import { Text } from '../ui/Typography/Text';

type Props = {
  hasText?: boolean;
};

export const Logo = ({ hasText = false }: Props) => {
  return (
    <div className='flex flex-row gap-1'>
      <img className='max-w-[30px]' src={LogoImg} alt='AdArt Logo' />
      {hasText && (
        <Text size='xl' weight='medium'>
          <strong>Ad</strong>Art
        </Text>
      )}
    </div>
  );
};
