import axios from 'axios';

function createCustomer(payload) {
	return axios.post('http://localhost:5000/api/customers/', payload)
	  .then(function (response) {
	    return response.data
	  })
	  .catch(function (error) {
	    return error
	  });
}

function fetchCustomer(id) {
	return axios.get(`http://localhost:5000/api/customers/${id ? `${id}/` : ''}`)
	  .then(function (response) {
	    return response.data
	  })
	  .catch(function (error) {
	    return error
	  });
}

export default {
  createCustomer,
  fetchCustomer,
};