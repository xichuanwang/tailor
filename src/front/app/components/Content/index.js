/**
*
* Content
*
*/

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin: 0 25px 25px 275px;
	padding-top: 15px;
`;


class Content extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
      	{this.props.children}
      </Wrapper>
    );
  }
}

export default Content;
