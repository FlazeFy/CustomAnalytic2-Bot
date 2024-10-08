const axios = require('axios')

const handleShowAllWeapons = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weapons/limit/${limit}/order/${order}/find/%20?page=${page}`)
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


const handleShowWeaponsByType = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weapons/total/bytype/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowWeaponsByCountry = async (limit) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weapons/total/bycountry/${limit}`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowWeaponsBySides = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weapons/total/bysides`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowWeaponSummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weapons/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowAllWeapons,
    handleShowWeaponsByCountry,
    handleShowWeaponsByType,
    handleShowWeaponsBySides,
    handleShowWeaponSummary
}