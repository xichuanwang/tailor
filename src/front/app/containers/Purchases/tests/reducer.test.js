import expect from 'expect';
import purchasesReducer from '../reducer';
import { fromJS } from 'immutable';

describe('purchasesReducer', () => {
  it('returns the initial state', () => {
    expect(purchasesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
