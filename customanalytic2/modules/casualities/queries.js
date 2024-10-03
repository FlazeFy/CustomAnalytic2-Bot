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

module.exports = {
    handleShowCasualitiesSummary
}