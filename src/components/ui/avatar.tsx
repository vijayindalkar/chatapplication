import { type FC } from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ src, alt, size = 'md', online }) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={clsx(
          'rounded-full object-cover',
          {
            'w-8 h-8': size === 'sm',
            'w-12 h-12': size === 'md',
            'w-16 h-16': size === 'lg',
          }
        )}
      />
      {online && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
      )}
    </div>
  );
};