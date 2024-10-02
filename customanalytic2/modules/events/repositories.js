const { handleShowAllEvents } = require("./queries")

const repoAllEvents = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllEvents(20,'desc', current_page)
        
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

module.exports = {
    repoAllEvents
}