/*
 *
 * Customers
 *
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import selectCustomers from './selectors';
import { createCustomer, fetchCustomers } from './actions';

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


export class Customers extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      businessId: 1,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCustomers())
  }

  updateField = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  updateFirstName = (e) => {
    this.updateField('firstName', e.target.value)
  }
  updateLastName = (e) => {
    this.updateField('lastName', e.target.value)
  }
  updateEmail = (e) => {
    this.updateField('email', e.target.value)
  }
  updatePhoneNumber = (e) => {
    this.updateField('phoneNumber', e.target.value)
  }

  submitCreateCustomer = () => {
    const { dispatch } = this.props
    dispatch(createCustomer(this.state))
  }

  render() {
    const { customers, location } = this.props
    const { pathname } = location
    return (
      <div>
        <Nav pathname={ pathname } />
        <Content>
          <Header>Customers</Header>
            {customers && <Table
              headers={['id', 'first_name', 'last_name', 'email', 'phone_number']}
              items={customers}
            />}

          <Header>New Customer</Header>
          <InputGroup>
            <Label>First Name</Label>
            <Input onChange={this.updateFirstName} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Last Name</Label>
            <Input onChange={this.updateLastName} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Phone Number</Label>
            <Input onChange={this.updatePhoneNumber} type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input onChange={this.updateEmail} type="text" />
          </InputGroup>
          <SubmitButton onClick={this.submitCreateCustomer} type="submit" value="Create" />
        </Content>
      </div>
    );
  }
}

const mapStateToProps = selectCustomers();

export default connect(mapStateToProps, null)(Customers);
