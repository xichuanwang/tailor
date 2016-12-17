import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  CREATE_CUSTOMER,
  FETCH_CUSTOMERS,
} from './constants';
import api from './api';

function* createCustomer(action) {
  try {
  	const customer = yield call(api.createCustomer, action.payload)
  	yield put({
  		type: CREATE_CUSTOMER.SUCCESS,
  		value: customer, 
  	})
  } catch(error) {
  	yield put({
  		type: CREATE_CUSTOMER.FAILURE,
  		error,
  	})
  }
}

function* fetchCustomers() {
  try {
    const customers = yield call(api.fetchCustomer, null)
    yield put({
      type: FETCH_CUSTOMERS.SUCCESS,
      value: customers,
    })
  } catch(error) {
    yield put({
      type: FETCH_CUSTOMERS.FAILURE,
      error,
    })
  }
}

export default function* customersSaga() {
  yield takeEvery(CREATE_CUSTOMER.IN_PROGRESS, createCustomer)
  yield takeEvery(FETCH_CUSTOMERS.IN_PROGRESS, fetchCustomers)
}