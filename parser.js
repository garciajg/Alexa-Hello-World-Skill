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
                // If there is an error in the request then finish the async request
                if (error) {
                    reject(error)
                }
                const blogTitles = []
                const dom = new JSDOM(`${body}`) // Loading HTML source document
                let blogs = dom.window.document.querySelectorAll("h2") // Reading all h2's in this case the titles of the blogs
                blogs.forEach( (blog) => {
                    let blogTitle = blog.textContent.replace(new RegExp(String.raw`\n`,"g"), "").trim()
                    blogTitles.push(blogTitle)
                })
                // Returning only the number of blogs specified by the user
                resolve(blogTitles.splice(0,numberOfBlogs))
            })
        })

    },

    getBlogURL(blogTitle) {
        // TODO: Description of blogs
        let newTitle = blogTitle.toLowerCase()
        let expTitle = newTitle.replace(new RegExp(" ", "g"), "-") // g = Global match; find all matches
        return `${mainURL}/${expTitle}`
    }

}    

