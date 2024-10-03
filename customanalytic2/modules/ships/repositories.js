const { handleShowAllShips, handleShowShipsByClass,handleShowShipsBySides,handleShowShipsByCountry, handleShowShipSummary } = require("./queries")

const repoAllShips = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllShips(20,'desc',current_page)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Ship Name : ${el.name}\nClass : ${el.class}\nCountry : ${el.country}\nLaunch Year : ${el.launch_year}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowShipsByCountry = async () => {
    try {
        const [data, status] = await handleShowShipsByCountry(7)
        
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

const repoShowShipsByClass = async () => {
    try {
        const [data, status] = await handleShowShipsByClass(7)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Class : ${el.context}\nTotal : ${el.total}\n\n`
            });

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowShipsBySides = async () => {
    try {
        const [data, status] = await handleShowShipsBySides()
        
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

const repoShowShipSummary = async () => {
    try {
        const [data, status] = await handleShowShipSummary()
        
        if(data){
            let msg = `Overall in this war, The most produced ships by class is <b>${data.most_produced}</b> which have been produced about <b>${data.total}</b> variant. This class of ships is mainly produced by <b>${data.most_produced_by_country}</b>. Average country has produced about <b>${data.average_by_country}</b> variant of ships. Most of these ships built on year of <b>${data.most_built_year}</b>.`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllShips,
    repoShowShipsByCountry,
    repoShowShipsBySides,
    repoShowShipsByClass,
    repoShowShipSummary
}