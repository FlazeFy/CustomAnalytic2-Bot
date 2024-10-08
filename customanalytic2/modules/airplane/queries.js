const axios = require('axios')

const handleShowAllAirplane = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/limit/${limit}/order/${order}/find/%20?page=${page}`)
        let page_length 
        let data

        if(page != "all"){
            const res = response.data.data
            data = res.data
            page_length = res.last_page
        } else {
            const res = response.data
            data = res.data
            page_length = null
        }

        return [data, page_length, 'success']
    } catch (err) {
        return [null, null, err]
    }
}


const handleShowAirplanesByRole = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/total/byrole/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowAirplanesByCountry = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/total/bycountry/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowAirplanesBySides = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/total/bysides`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowAirplanesByManufacturer = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/total/bymanufacturer/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowAirplaneSummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/aircraft/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowAllAirplane,
    handleShowAirplanesByCountry,
    handleShowAirplanesByRole, 
    handleShowAirplanesBySides,
    handleShowAirplanesByManufacturer,
    handleShowAirplaneSummary
}