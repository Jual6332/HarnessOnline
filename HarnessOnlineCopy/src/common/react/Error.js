import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
`;

const Error = () => {
  return (
    <Div>
      <Helmet>
        <title>Error | IBIS</title>
      </Helmet>
      <p>error page not found</p>
    </Div>
  );
};

export default Error;
