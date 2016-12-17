import { createSelector } from 'reselect';

/**
 * Direct selector to the customers state domain
 */
const selectCustomersDomain = () => (state) => state.get('customers');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Customers
 */

const selectCustomers = () => createSelector(
  selectCustomersDomain(),
  (customers) => { return { customers: customers || {} } }
);

export default selectCustomers;
export {
  selectCustomersDomain,
};
