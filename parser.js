const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const request = require('request');

module.exports = {

    async getBlogTitles(numberOfBlogs) {
        /* Gets the number of titles of the blogs based on the 
        numberOfBlogs given */
        mainURL = "https://www.vokal.io/blog"
        return new Promise( (resolve, reject) => {
            request( {uri: mainURL}, (error, response, body) => {
                if (error) {
                    reject(error)
                }
                const blogTitles = []
                const dom = new JSDOM(`${body}`)
                let blogs = dom.window.document.querySelectorAll("h2")
                blogs.forEach( (blog) => {
                    let blogTitle = blog.textContent.replace(new RegExp(String.raw`\n`,"g"), "").trim()
                    blogTitles.push(blogTitle)
                })
                resolve(blogTitles.splice(0,numberOfBlogs))
            })
        })

    },

    getBlogURL(blogTitle) {
        let newTitle = blogTitle.toLowerCase()
        let expTitle = newTitle.replace(new RegExp(" ", "g"), "-") // g = Global match; find all matches
        return `${mainURL}/${expTitle}`
    }

}    

