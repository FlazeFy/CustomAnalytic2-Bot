const { numberWithCommas } = require("../../helpers/converter")
const { handleShowCasualitiesSummary, handleShowAllCasualities } = require("./queries")

const repoShowCasualitiesSummary = async () => {
    try {
        const [data, status] = await handleShowCasualitiesSummary()
        
        if(data){
            let msg = `Overall in this war, average death per country is <b>${numberWithCommas(data.average_death)}</b>. Country with the most death toll is <b>${numberWithCommas(data.highest_death_country)}</b> with <b>${numberWithCommas(data.highest_death)}</b> military and civilian death. This total as much as <b>${numberWithCommas(data.highest_death_country_percent)}%</b> of all total death combined, which is about <b>${numberWithCommas(data.total_death_all)}</b> death`

            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoCasualitiesDoc = async () => {
    try {
        const [data, page_length, status] = await handleShowAllCasualities(1,'desc','all')

        if(data){
            const rows = []
            const date = new Date()

            data.forEach((dt, i) => {
                rows.push({
                    country: dt.country, 
                    continent: dt.continent,
                    total_population: dt.total_population,
                    military_death: dt.military_death,
                    civilian_death: dt.civilian_death,
                    total_death: dt.total_death,
                    death_per_pop: dt.death_per_pop,
                    avg_death_per_pop: dt.avg_death_per_pop,
                    military_wounded: dt.military_wounded
                })
            })

            const path = `casualities_list_${date}.csv`
            const filename = `casualities_list_${date}.csv`
            const csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'country', title: 'Country' },
                    { id: 'continent', title: 'Continent' },
                    { id: 'total_population', title: 'Total Population' },
                    { id: 'military_death', title: 'Military Death' },
                    { id: 'civilian_death', title: 'Civilian Death' },
                    { id: 'total_death', title: 'Total Death' },
                    { id: 'death_per_pop', title: 'Death per Pop.' },
                    { id: 'avg_death_per_pop', title: 'Average Death per Pop.' },
                    { id: 'military_wounded', title: 'Military Wounded' }
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
    repoShowCasualitiesSummary,
    repoCasualitiesDoc
}