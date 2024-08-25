const { handleShowAllVehicles } = require("./queries")

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

module.exports = {
    repoAllVehicles
}