const axios = require('axios')

const handleShowAllEvents = async (limit,order,page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/limit/${limit}/order/${order}?page=${page}`)
        const res = response.data.data
        const data = res.data
        const page_length = res.last_page

        return [data, page_length, 'success']
    } catch (err) {
        return [null, null, err]
    }
}

module.exports = {
    handleShowAllEvents
}