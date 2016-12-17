/*
 *
 * Customers reducer
 *
 */

import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import {
  CREATE_PURCHASE,
  FETCH_PURCHASES,
  MARK_PURCHASE_COMPLETE,
} from './constants';


function purchasesReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_PURCHASE.SUCCESS:
    case MARK_PURCHASE_COMPLETE.SUCCESS:
      return {
        ...state,
        [action.value.id]: action.value
      }
    case FETCH_PURCHASES.SUCCESS:
    	return keyBy(action.value, 'id')
    default:
      return state;
  }
}

export default purchasesReducer