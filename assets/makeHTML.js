export function makeHTML(name, email) {
    return `<!-- template.html -->
        <!DOCTYPE html>
        <html>
        <head>
            <title>[Forest Bath] New Sign-up Form Received</title>
        </head>
        <body>
            <h3>A new member has signed up for Forest Bath</h3>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
        </body>
        </html>`
}
