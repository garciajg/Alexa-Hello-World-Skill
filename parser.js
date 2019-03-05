const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const request = require('request');

module.exports = {

    async getBlogTitles(numberOfBlogs) {
        /* Gets the number of titles of the blogs based on the 
        numberOfBlogs given */
        console.log(numberOfBlogs)

        return new Promise( (resolve, reject) => {
            request( {uri: "https://www.vokal.io/blog"}, (error, response, body) => {
                // If there is an error in the request then finish the async request
                if (numberOfBlogs > 5) {
                    // Reject if asking for an index more than 5
                    reject("You can only ask for the five most recent blogs")
                }else if (error) { 
                    // If there is an error
                    reject(error)

                } else {
                    const blogTitles = []
                    const dom = new JSDOM(`${body}`) // Loading HTML source document
                    let blogs = dom.window.document.querySelectorAll("h2") // Reading all h2's in this case the titles of the blogs

                    blogs.forEach( (blog) => {
                        let blogTitle = blog.textContent.replace(new RegExp(String.raw`\n`,"g"), "").trim()
                        blogTitles.push(blogTitle)
                    })
                    // Returning only the number of blogs specified by the user
                    resolve(blogTitles.splice(0,numberOfBlogs))
                }
            })
        })

    },

    async getBlogDescription(blogNumber) {
        // Get's a description of the selected blog
        blogs = await this.getBlogTitles(blogNumber)
        blog = blogs[Number(blogNumber) - 1]
        blogPath = this.getBlogPath(blog)
        mainURL = "https://www.vokal.io/blog"
        blogURL = `${mainURL}/${blogPath}`

        return new Promise( (resolve, reject) => {
            request({uri: blogURL}, (error, response, body) => {
                if (error) {
                    reject(error)
                }
                const dom = new JSDOM(`${body}`)
                let firstParagh = dom.window.document.querySelector("p").textContent
                
                resolve(firstParagh)
            })
        })
    },

    getBlogPath(blogTitle) {
        // TODO: Description of blogs
        let newTitle = blogTitle.toLowerCase()
        let expTitle = newTitle.replace(new RegExp(" ", "g"), "-") // g = Global match; find all matches
        return `${expTitle}`
    }

}    

