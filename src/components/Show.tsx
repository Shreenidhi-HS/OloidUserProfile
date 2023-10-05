import React, { ReactNode } from 'react';

interface ShowProps {
  when: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

const Show: React.FC<ShowProps> = ({ when, fallback, children }) => {
  return when ? children : fallback;
};

export default Show;
