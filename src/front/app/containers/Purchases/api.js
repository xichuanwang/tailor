import axios from 'axios';

function createPurchase(payload) {
	return axios.post('http://localhost:5000/api/purchases/', payload)
	  .then(function (response) {
	    return response.data
	  })
	  .catch(function (error) {
	    return error
	  });
}

function markPurchaseComplete(id) {
	const completed = true
	return axios.put(`http://localhost:5000/api/purchases/${id}/`, { completed })
	  .then(function (response) {
	    return response.data
	  })
	  .catch(function (error) {
	    return error
	  });
}

function fetchPurchase(id) {
	return axios.get(`http://localhost:5000/api/purchases/${id ? `${id}/` : ''}`)
	  .then(function (response) {
	    return response.data
	  })
	  .catch(function (error) {
	    return error
	  });
}

export default {
  createPurchase,
  fetchPurchase,
  markPurchaseComplete,
};