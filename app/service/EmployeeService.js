const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

URL = '/hr/employee/'

module.exports.createEmployee = async function (employee) {
    try {
        const response = await axios.post(URL, employee)

        return response.data
    } catch(e) {
        if (e.response.status == 400) {
            return new Error('Invalid data')
        } else {
            return new Error('Could not create employee')
        }
    }
}

module.exports.getEmployee = async function (id) {
    if (!id) {
        return new Error('Employee ID cannot be null')
    }
    try {
        const response = await axios.get(URL + id)

        return response.data
    } catch(e) {
        if (e.response.status == 400) {
            return new Error('User does not exist')
        } else {
            return new Error('Failed to get employee')
        }
    }
}

module.exports.getEmployees = async function () {
    try {
        const response = await axios.get(URL)

        return response.data
    } catch (e) {
        return new Error('Could not get employees')
    }
}