/**
*
* Table
*
*/

import React from 'react';
import styled from 'styled-components';

import { removeSnakeCase } from 'utils/snakeCase';

const TableWrapper = styled.tr`
`;

const Header = styled.td`
	border-bottom: 2px solid grey;
	display: table-cell;
	padding: 5px 10px;
`;

const Cell = styled.td`
	padding: 5px 10px;
	display: table-cell;
`;

class Table extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	renderHeaderRow() {
		const items = Object.values(this.props.items)
		if (items && items.length === 0) return null
		const { headers, customCells } = this.props
		return (
			<TableWrapper>
				{headers && headers.map((key) => {
					const item = items[key]
					return <Header key={key}>{removeSnakeCase(key)}</Header>
				})}
				{customCells && customCells.map((cell) => {
					return <Header>{cell.name}</Header>
				})}
			</TableWrapper>
		)
	}

	renderRow(item) {
		const { headers, customCells } = this.props
		return (
			<tr>
				{headers && headers.map((header) => {
					return <Cell>{item[header]}</Cell>
				})}
				{customCells && customCells.map((cell) => {
					return <Cell>{cell.mapping(item)}</Cell>
				})}
			</tr>
		)
	}

  render() {
  	const items = Object.values(this.props.items)
		if (items && items.length === 0) return null
    return (
      <table>
      	<tbody>
	      	{this.renderHeaderRow()}
	      	{items.map((item) => this.renderRow(item))}
      	</tbody>
      </table>
    );
  }
}

export default Table;
