const axios = require('axios')

const handleShowCasualitiesSummary = async () => {
    try {
        const userId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Imxlb25hcmRobyByIHNpdGFuZ2dhbmciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQyODI5NjgsImV4cCI6MTcyNDI5Mzc2OH0.BUrt1cAMIXDp6iSjZDvbH5Wep51FJ818H7lnkSJxMd4'
        const response = await axios.get(`http://127.0.0.1:8000/api/casualities/summary`, {
            headers: {
                'Authorization': `Bearer ${userId}`
            }
        })
        const res = response.data
        const data = res.data

        return [data, 'success']
    } catch (err) {
        return [null, err]
    }
}

module.exports = {
    handleShowCasualitiesSummary
}