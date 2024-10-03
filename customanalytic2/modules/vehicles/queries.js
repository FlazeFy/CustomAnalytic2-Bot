const axios = require('axios')

const handleShowAllVehicles = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vehicles/limit/${limit}/order/${order}/find/%20?page=${page}`)
        const res = response.data.data
        const data = res.data
        const page_length = res.last_page

        return [data, page_length, 'success']
    } catch (err) {
        return [null, null, err]
    }
}

const handleShowVehiclesByRole = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vehicles/total/byrole/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowVehiclesByCountry = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vehicles/total/bycountry/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowVehiclesBySides = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vehicles/total/bysides`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowVehicleSummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vehicles/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowAllVehicles,
    handleShowVehiclesByCountry,
    handleShowVehiclesBySides,
    handleShowVehiclesByRole,
    handleShowVehicleSummary
}