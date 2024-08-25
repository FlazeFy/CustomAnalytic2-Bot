const { handleShowAllEvents } = require("./queries")

const repoAllEvents = async () => {
    try {
        const [data, page_length, status] = await handleShowAllEvents(20,'desc')
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Event Name : ${el.event}\nDate : From ${el.date_start} until ${el.date_end}\nPeriod : ${el.period} days\n\n`
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
        const [data, status] = await handleShowAirplanesByCountry(20)
        
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
        const [data, status] = await handleShowAirplanesByRole(20)
        
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

module.exports = {
    repoAllEvents,
    repoShowAirplanesByCountry,
    repoShowAirplanesByRole,
    repoShowAirplanesBySides
}