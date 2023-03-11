import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  condition: boolean;
};

const ConditionalLink: React.FC<Props> = ({ to, condition, children }) => {
  return condition ? <Link to={to}>{children}</Link> : <>{children}</>;
};

export default ConditionalLink;
