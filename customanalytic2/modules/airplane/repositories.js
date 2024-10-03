const { handleShowAllAirplane, handleShowAirplanesByCountry, handleShowAirplanesByRole, handleShowAirplanesBySides, handleShowAirplanesByManufacturer, handleShowAirplaneSummary } = require("./queries")

const repoAllAirplane = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllAirplane(20,'desc',current_page)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Airplane Name : ${el.name}\nPrimary Role : ${el.primary_role}\nManufacturer : ${el.manufacturer}\nCountry : ${el.country}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}


const repoShowAirplanesByCountry = async () => {
    try {
        const [data, status] = await handleShowAirplanesByCountry(7)
        
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

const repoShowAirplanesByRole = async () => {
    try {
        const [data, status] = await handleShowAirplanesByRole(7)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Role : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowAirplanesBySides = async () => {
    try {
        const [data, status] = await handleShowAirplanesBySides()
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Sides : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowAirplanesByManufacturer = async () => {
    try {
        const [data, status] = await handleShowAirplanesByManufacturer(7)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Manufacturer : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowAirplaneSummary = async () => {
    try {
        const [data, status] = await handleShowAirplaneSummary()
        
        if(data){
            let msg = `Overall in this war, The most produced aircraft by role is <b>${data.most_produced}</b> which have been produced about <b>${data.total}</b> variant. This role of aircraft is mainly produced by <b>${data.most_produced_by_country}</b>. Average country has produced about <b>${data.average_by_country}</b> variant of aircraft`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllAirplane,
    repoShowAirplanesByCountry,
    repoShowAirplanesByRole,
    repoShowAirplanesBySides, 
    repoShowAirplanesByManufacturer,
    repoShowAirplaneSummary
}