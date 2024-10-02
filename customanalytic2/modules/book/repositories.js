const { handleShowAllBooks } = require("./queries")

const repoAllBooks = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const [data, page_length, status] = await handleShowAllBooks(20,'desc', current_page)
        
        if(data){
            let msg = ''
            data.forEach((el,idx) => {
                msg += `Title : ${el.title}\nAuthor : ${el.author}\nReviewer : ${el.reviewer}\nReview Date : ${el.reviewe_date}\n\n`
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
    repoAllBooks
}