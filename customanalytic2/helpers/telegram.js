const { Markup } = require('telegraf')

const generatePaginationBot = (ctx, length, topic) => {
    const current = ctx.session.currentPage || 1
    let pageButtons = []

    for (let i = 1; i <= length; i++) {
        pageButtons.push(`Page ${i} - ${topic}`)
    }
    pageButtons.push('Back to Main Menu')

    ctx.reply(`Page : ${current} / ${length}`, 
        Markup.keyboard(pageButtons.map(button => [button])).resize()
    )
}

module.exports = {
    generatePaginationBot
}