import React, { useRef } from 'react';
import { useHandleClickOutside } from '@/helpers';

interface IProps {
  children: JSX.Element,
  callback: () => void
};

const OutsideClick: React.FC<IProps> = ({ children, callback }: IProps) => {
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, callback);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideClick;
