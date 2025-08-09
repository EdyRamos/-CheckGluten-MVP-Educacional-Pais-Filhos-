import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return <div className="min-h-screen bg-app-gradient">{children}</div>;
};

export default AppLayout;
