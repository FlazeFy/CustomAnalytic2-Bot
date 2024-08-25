const { handleShowAllAirplane } = require("./queries")

const repoAllAirplane = async () => {
    try {
        const [data, page_length, status] = await handleShowAllAirplane(15,'desc')
        
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

module.exports = {
    repoAllAirplane
}