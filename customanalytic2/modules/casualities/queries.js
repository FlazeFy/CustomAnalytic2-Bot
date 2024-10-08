const axios = require('axios')

const handleShowCasualitiesSummary = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/casualities/summary`)
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

const handleShowAllCasualities = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/casualities/limit/${limit}/order/military_death/${order}?page=${page}`)
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

module.exports = {
    handleShowCasualitiesSummary,
    handleShowAllCasualities
}