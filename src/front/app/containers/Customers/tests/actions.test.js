import expect from 'expect';
import {
  defaultAction,
} from '../actions';
import {
  CREATE_CUSTOMER,
} from '../constants';

describe('Customers actions', () => {
  describe('Default Action', () => {
    it('has a type of CREATE_CUSTOMER', () => {
      const expected = {
        type: CREATE_CUSTOMER,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
