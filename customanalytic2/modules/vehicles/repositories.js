const { handleShowAllVehicles, handleShowVehiclesByRole, handleShowVehiclesByCountry, handleShowVehiclesBySides, handleShowVehicleSummary } = require("./queries")

const repoAllVehicles = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllVehicles(20,'desc',current_page)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Vehicle Name : ${el.name}\nPrimary Role : ${el.primary_role}\nManufacturer : ${el.manufacturer}\nCountry : ${el.country}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowVehiclesByCountry = async () => {
    try {
        const [data, status] = await handleShowVehiclesByCountry(7)
        
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

const repoShowVehiclesByRole = async () => {
    try {
        const [data, status] = await handleShowVehiclesByRole(7)
        
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

const repoShowVehiclesBySides = async () => {
    try {
        const [data, status] = await handleShowVehiclesBySides()
        
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

const repoShowVehicleSummary = async () => {
    try {
        const [data, status] = await handleShowVehicleSummary()
        
        if(data){
            let msg = `Overall in this war, The most produced vehicles by role is <b>${data.most_produced}</b> which have been produced about <b>${data.total}</b> variant. This role of vehicles is mainly produced by <b>${data.most_produced_by_country}</b>. Average country has produced about <b>${data.average_by_country}</b> variant of vehicles.`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllVehicles,
    repoShowVehiclesByCountry,
    repoShowVehiclesByRole,
    repoShowVehiclesBySides,
    repoShowVehicleSummary
}