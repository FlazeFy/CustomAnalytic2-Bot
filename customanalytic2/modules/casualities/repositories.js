const { numberWithCommas } = require("../../helpers/converter")
const { handleShowCasualitiesSummary } = require("./queries")

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

module.exports = {
    repoShowCasualitiesSummary
}