const axios = require('axios')

const handleShowAllShips = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ships/limit/${limit}/order/${order}/find/%20?page=${page}`)
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


const handleShowShipsByClass = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ships/total/byclass/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowShipsByCountry = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ships/total/bycountry/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowShipsBySides = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ships/total/bysides`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowShipSummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ships/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowAllShips,
    handleShowShipsByClass,
    handleShowShipsByCountry, 
    handleShowShipsBySides,
    handleShowShipSummary
}