import React, { PropsWithChildren, ReactNode } from 'react';
import './index.css';

interface Props {
  code: ReactNode;
}

export const Page = (props: PropsWithChildren<Props>) => {
  return (
    <div className="page-container">
      <div className="page">
        {props.children}
      </div>
      {props.code}
    </div>
  )
}
