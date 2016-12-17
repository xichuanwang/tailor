/*
 *
 * Purchases
 *
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import selectPurchases from './selectors';
import { createPurchase, fetchPurchases, markPurchaseComplete } from './actions';

import Content from 'components/Content';
import Nav from 'components/Nav';
import Table from 'components/Table';

const Header = styled.h1`
  font-size: 1.15em;
  font-weight: 600;
`;

const InputGroup = styled.div`
  display: inline-block;
  margin-bottom: 15px;
  width: 50%;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const SubmitButton = styled.input`
  background: #64b6ac;
  color: white;
  font-weight: 600;
  outline: none;
  padding: 7px 15px;
`;

const Input = styled.input`
  background: #effff8;
  border: 1px solid #effff8;
  display: block;
  outline: none;
  padding: 5px 10px;
  width: 90%;

  &:focus {
    border: 1px solid #c0fdfb;
  }
`;


export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
      customerId: '',
      totalCost: '',
      quotedCompletionDate: '',
      notifyOnCompletion: false,
      businessId: 1,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPurchases())
  }

  updateField = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  updateCustomerId = (e) => {
    this.updateField('customerId', e.target.value)
  }
  updateTotalCost = (e) => {
    this.updateField('totalCost', e.target.value)
  }
  updateQuotedCompletionDate = (e) => {
    this.updateField('quotedCompletionDate', e.target.value)
  }
  updateNotifyOnCompletion = (e) => {
    this.updateField('notifyOnCompletion', e.target.checked)
  }

  submitCreatePurchase = () => {
    const { dispatch } = this.props
    dispatch(createPurchase(this.state))
  }

  submitMarkPurchaseComplete = (id, e) => {
    const { dispatch } = this.props
    dispatch(markPurchaseComplete(id))
    e.target.value = 'Loading...'
  }

  render() {
    const { purchases, location } = this.props
    const { pathname } = location
    return (
      <div>
        <Nav pathname={ pathname } />
        <Content>
          <Header>Purchases</Header>
            {purchases && <Table
              headers={['id', 'quoted_completion_date']}
              customCells={[{
                name: 'Customer',
                mapping: (item) => `${item.customer.first_name} ${item.customer.last_name}`,
              }, {
                name: 'Status',
                mapping: (item) => {
                  return item.actual_completion_date ? `Already Done` :
                  <SubmitButton onClick={(e) => this.submitMarkPurchaseComplete(item.id, e)} type="submit" value="Done" />
                }
              }]}
              items={purchases}
            />}
            {purchases && <Table items={purchases} />}

          <Header>New Purchase</Header>
          <InputGroup>
            <Label>Customer ID</Label>
            <Input onChange={this.updateCustomerId} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Total Cost</Label>
            <Input onChange={this.updateTotalCost} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Quoted Completion Date</Label>
            <Input onChange={this.updateQuotedCompletionDate} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Notify on Completion</Label>
            <Input onChange={this.updateNotifyOnCompletion} type="checkbox" />
          </InputGroup>
          <SubmitButton onClick={this.submitCreatePurchase} type="submit" value="Create" />
        </Content>
      </div>
    );
  }
}

const mapStateToProps = selectPurchases();

export default connect(mapStateToProps, null)(Purchases);
