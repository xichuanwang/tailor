import { createSelector } from 'reselect';

/**
 * Direct selector to the purchases state domain
 */
const selectPurchaseDomain = () => (state) => state.get('purchases');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Purchase
 */

const selectPurchase = () => createSelector(
  selectPurchaseDomain(),
  (purchases) => { return { purchases: purchases || {} } }
);

export default selectPurchase;
export {
  selectPurchaseDomain,
};
