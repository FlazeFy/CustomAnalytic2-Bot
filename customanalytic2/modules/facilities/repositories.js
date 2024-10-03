const { handleShowFacilitiesByCountry, handleShowFacilitiesByType, handleShowFacilitiesBySides, handleShowFacilitySummary, handleShowNearestFacility } = require("./queries")

const repoShowFacilitiesByCountry = async () => {
    try {
        const [data, status] = await handleShowFacilitiesByCountry(7)
        
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
        const [data, status] = await handleShowFacilitiesByType(7)
        
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
        const [data, status] = await handleShowFacilitiesBySides()
        
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

const repoShowFacilitySummary = async () => {
    try {
        const [data, status] = await handleShowFacilitySummary()
        
        if(data){
            let msg = `Overall in this war, The most built facilities by type is <b>${data.most_built}</b> which have been built about <b>${data.total}</b> facilities. This type of facilities is mainly built by <b>${data.most_built_by_country}</b>. Average country has built about <b>${data.average_by_country}</b> facilities`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowNearestFacilities = async (lat, long) => {
    try {
        const [data, status] = await handleShowNearestFacility(10, lat, long)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Name : ${el.name}\nType : ${el.type}\nLocation : ${el.location} - ${el.country}\nCoordinate : ${el.coordinate}\nDistance (Km) : ${(el.distance_meters/1000).toFixed(2)} km\nhttps://www.google.com/maps/place/${el.coordinate.replace(' ','')}\n\n`
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
    repoShowFacilitiesBySides,
    repoShowFacilitySummary,
    repoShowNearestFacilities
}