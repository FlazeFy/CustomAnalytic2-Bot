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

const repoEventDoc = async () => {
    try {
        const [data, page_length, status] = await handleShowAllEvents(1,'desc','all')

        if(data){
            const rows = []
            const date = new Date()

            data.forEach((dt, i) => {
                rows.push({
                    event: dt.event, 
                    date_start: dt.date_start,
                    date_end: dt.date_end,
                    period: dt.period
                })
            })

            const path = `event_list_${date}.csv`
            const filename = `event_list_${date}.csv`
            const csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'event', title: 'Event' },
                    { id: 'date_start', title: 'Date Start' },
                    { id: 'date_end', title: 'Date End' },
                    { id: 'period', title: 'Period' }
                ]
            });

            await csvWriter.writeRecords(rows)
            
            return [status, path, filename]
        } else {
            return [status, null, null]
        }
    } catch (err) {
        return [err, null, null]
    }
}

module.exports = {
    repoAllEvents,
    repoEventDoc
}