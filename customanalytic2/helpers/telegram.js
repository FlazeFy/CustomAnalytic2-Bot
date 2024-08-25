const generatePaginationBot = (ctx, current, length) => {
    let pageButtons = [];
    for (let i = 1; i <= length; i++) {
        pageButtons.push(`Page ${i}`)
    }
    pageButtons.push('Back to Main Menu')

    ctx.reply(`Page : ${current} / ${length}`, 
        Markup.keyboard(pageButtons.map(button => [button])).resize()
    )
}

module.exports = {
    generatePaginationBot
}