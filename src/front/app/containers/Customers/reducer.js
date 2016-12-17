/*
 *
 * Customers reducer
 *
 */

import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import {
  CREATE_CUSTOMER,
  FETCH_CUSTOMERS,
} from './constants';


function customersReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CUSTOMER.SUCCESS:
      return {
        ...state,
        [action.value.id]: action.value
      }
    case FETCH_CUSTOMERS.SUCCESS:
    	return keyBy(action.value, 'id')
    default:
      return state;
  }
}

export default customersReducer