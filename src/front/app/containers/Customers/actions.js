/*
 *
 * Customers actions
 *
 */
import { snakeCaseObjectKeys } from 'utils/snakeCase';

import {
  CREATE_CUSTOMER,
  FETCH_CUSTOMERS,
} from './constants';

export function createCustomer(payload) {
	return {
		type: CREATE_CUSTOMER.IN_PROGRESS,
		payload: snakeCaseObjectKeys(payload),
	}
}

export function fetchCustomers() {
	return {
		type: FETCH_CUSTOMERS.IN_PROGRESS,
	}
}
