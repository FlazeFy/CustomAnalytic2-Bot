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

const repoBookDoc = async () => {
    try {
        const [data, page_length, status] = await handleShowAllBooks(1,'desc','all')

        if(data){
            const rows = []
            const date = new Date()

            data.forEach((dt, i) => {
                rows.push({
                    title: dt.title, 
                    author: dt.author,
                    reviewer: dt.reviewer,
                    reviewe_date: dt.reviewe_date
                })
            })

            const path = `book_list_${date}.csv`
            const filename = `book_list_${date}.csv`
            const csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'title', title: 'Name' },
                    { id: 'author', title: 'Author' },
                    { id: 'reviewer', title: 'Reviewer' },
                    { id: 'reviewe_date', title: 'Reviewe Date' }
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
    repoAllBooks,
    repoBookDoc
}