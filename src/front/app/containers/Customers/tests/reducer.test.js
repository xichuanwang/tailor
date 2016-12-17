import expect from 'expect';
import customersReducer from '../reducer';
import { fromJS } from 'immutable';

describe('customersReducer', () => {
  it('returns the initial state', () => {
    expect(customersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
