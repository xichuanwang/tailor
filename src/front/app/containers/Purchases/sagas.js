import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  CREATE_PURCHASE,
  FETCH_PURCHASES,
  MARK_PURCHASE_COMPLETE,
} from './constants';
import api from './api';

function* createPurchase(action) {
  try {
  	const purchase = yield call(api.createPurchase, action.payload)
  	yield put({
  		type: CREATE_PURCHASE.SUCCESS,
  		value: purchase, 
  	})
  } catch(error) {
  	yield put({
  		type: CREATE_PURCHASE.FAILURE,
  		error,
  	})
  }
}

function* markPurchaseComplete(action) {
  try {
    const purchase = yield call(api.markPurchaseComplete, action.id)
    yield put({
      type: MARK_PURCHASE_COMPLETE.SUCCESS,
      value: purchase,
    })
  } catch(error) {
    yield put({
      type: MARK_PURCHASE_COMPLETE.FAILURE,
      error,
    })
  }
}

function* fetchPurchases() {
  try {
    const purchases = yield call(api.fetchPurchase, null)
    yield put({
      type: FETCH_PURCHASES.SUCCESS,
      value: purchases,
    })
  } catch(error) {
    yield put({
      type: FETCH_PURCHASES.FAILURE,
      error,
    })
  }
}

export default function* purchasesSaga() {
  yield takeLatest(CREATE_PURCHASE.IN_PROGRESS, createPurchase)
  yield takeLatest(FETCH_PURCHASES.IN_PROGRESS, fetchPurchases)
  yield takeLatest(MARK_PURCHASE_COMPLETE.IN_PROGRESS, markPurchaseComplete)
}