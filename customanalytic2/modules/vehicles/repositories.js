const { handleShowAllVehicles, handleShowVehiclesByRole, handleShowVehiclesByCountry, handleShowVehiclesBySides } = require("./queries")

const repoAllVehicles = async () => {
    try {
        const [data, page_length, status] = await handleShowAllVehicles(20,'desc')
        
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
        const [data, status] = await handleShowVehiclesByCountry(20)
        
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
        const [data, status] = await handleShowVehiclesByRole(20)
        
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

module.exports = {
    repoAllVehicles,
    repoShowVehiclesByCountry,
    repoShowVehiclesByRole,
    repoShowVehiclesBySides
}