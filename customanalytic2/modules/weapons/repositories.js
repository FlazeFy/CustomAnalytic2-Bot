const { handleShowAllWeapons } = require("./queries")

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

module.exports = {
    repoAllWeapons
}