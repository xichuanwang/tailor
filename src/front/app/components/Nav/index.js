/**
*
* Nav
*
*/

import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;

const Wrapper = styled.div`
	background: #5d737e;
	position: absolute;
	width: 250px;
	height: 100%;
`;

const NavLink = styled.div`
	background: ${props => props.selected ? '#84a3b2' : 'none'};
  color: white;
	padding: 15px;
	text-align: center;
	width: 100%;
`;

class Nav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
  	const { pathname } = this.props

    return (
    	<Wrapper>
      	<Title>Frisco Tailor</Title>    		
  			<Link to="/">
  				<NavLink selected={ pathname === '/' }>
  					Home
  				</NavLink>
  			</Link>
  			<Link to="/customers">
  				<NavLink selected={ pathname === '/customers' }>
  					Customers
  				</NavLink>
  			</Link>
  			<Link to="/purchases">
  				<NavLink selected={ pathname === '/purchases' }>
  					Purchases
  				</NavLink>
  			</Link>
      </Wrapper>
    );
  }
}

export default Nav;
