const axios = require('axios')

const handleShowFacilitiesByType = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/facilities/total/bytype/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowFacilitiesByCountry = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/facilities/total/bycountry/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowFacilitiesBySides = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/facilities/total/bysides`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowFacilitySummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/facilities/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowNearestFacility = async (limit, lat, long) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/facilities/nearest/${limit}/${lat}/${long}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowFacilitiesByType,
    handleShowFacilitiesByCountry, 
    handleShowFacilitiesBySides,
    handleShowFacilitySummary,
    handleShowNearestFacility
}