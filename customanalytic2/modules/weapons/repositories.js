const { handleShowAllWeapons, handleShowWeaponsByCountry, handleShowWeaponsByType, handleShowWeaponsBySides, handleShowWeaponSummary } = require("./queries")

const repoAllWeapons = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllWeapons(20,'desc',current_page)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Weapon Name : ${el.name}\nType : ${el.type}\nCountry : ${el.country}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoShowWeaponsByCountry = async () => {
    try {
        const [data, status] = await handleShowWeaponsByCountry(7)
        
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

const repoShowWeaponsByType = async () => {
    try {
        const [data, status] = await handleShowWeaponsByType(7)
        
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

const repoShowWeaponsBySides = async () => {
    try {
        const [data, status] = await handleShowWeaponsBySides()
        
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

const repoShowWeaponSummary = async () => {
    try {
        const [data, status] = await handleShowWeaponSummary()
        
        if(data){
            let msg = `Overall in this war, The most produced weapons by type is <b>${data.most_produced}</b> which have been produced about <b>${data.total}</b> variant. This weapon is mainly produced by <b>${data.most_produced_by_country}</b>. Average country has produced about <b>${data.average_by_country}</b> variant of weapon.`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllWeapons,
    repoShowWeaponsByCountry,
    repoShowWeaponsByType,
    repoShowWeaponsBySides,
    repoShowWeaponSummary
}