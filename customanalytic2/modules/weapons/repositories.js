const { handleShowAllWeapons, handleShowWeaponsByCountry, handleShowWeaponsByType, handleShowWeaponsBySides } = require("./queries")

const repoAllWeapons = async () => {
    try {
        const [data, page_length, status] = await handleShowAllWeapons(20,'desc')
        
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
        const [data, status] = await handleShowWeaponsByCountry(20)
        
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
        const [data, status] = await handleShowWeaponsByType(20)
        
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

module.exports = {
    repoAllWeapons,
    repoShowWeaponsByCountry,
    repoShowWeaponsByType,
    repoShowWeaponsBySides
}