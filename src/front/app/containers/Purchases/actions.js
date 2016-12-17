/*
 *
 * Purchases actions
 *
 */
import { snakeCaseObjectKeys } from 'utils/snakeCase';

import {
  CREATE_PURCHASE,
  FETCH_PURCHASES,
  MARK_PURCHASE_COMPLETE,
} from './constants';

export function createPurchase(payload) {
	return {
		type: CREATE_PURCHASE.IN_PROGRESS,
		payload: snakeCaseObjectKeys(payload),
	}
}

export function fetchPurchases() {
	return {
		type: FETCH_PURCHASES.IN_PROGRESS,
	}
}

export function markPurchaseComplete(id) {
	return {
		type: MARK_PURCHASE_COMPLETE.IN_PROGRESS,
		id,
	}
}
