const axios = require('axios')

const handleShowAllEvents = async (limit,order,page) => {
    try {
        const userId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Imxlb25hcmRobyByIHNpdGFuZ2dhbmciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQyODI5NjgsImV4cCI6MTcyNDI5Mzc2OH0.BUrt1cAMIXDp6iSjZDvbH5Wep51FJ818H7lnkSJxMd4'
        const response = await axios.get(`http://127.0.0.1:8000/api/events/limit/${limit}/order/${order}?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${userId}`
            }
        })
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