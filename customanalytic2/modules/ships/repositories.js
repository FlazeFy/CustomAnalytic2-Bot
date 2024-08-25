const { handleShowAllShips } = require("./queries")

const repoAllShips = async () => {
    try {
        const [data, page_length, status] = await handleShowAllShips(20,'desc')
        
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

module.exports = {
    repoAllShips
}