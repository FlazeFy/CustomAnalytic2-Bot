const { handleShowFacilitiesByCountry, handleShowFacilitiesByType, handleShowFacilitiesBySides } = require("./queries")

const repoShowFacilitiesByCountry = async () => {
    try {
        const [data, status] = await handleShowFacilitiesByCountry(20)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Country : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowFacilitiesByType = async () => {
    try {
        const [data, status] = await handleShowFacilitiesByType(20)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Type : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowFacilitiesBySides = async () => {
    try {
        const [data, status] = await handleShowFacilitiesBySides(20)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Side : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoShowFacilitiesByCountry,
    repoShowFacilitiesByType,
    repoShowFacilitiesBySides
}