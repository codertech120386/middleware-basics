const express = require('express')

const users = require("./users.json")

const app = express()

app.use(express.json()) //expressJson

// REST API
// HTTP VERBS 
// not allowing any request without name = Dhaval
app.post("/users", authorize({ name: "Dhaval" }), function (request, response) {
    console.log("Welcome Dhaval")
    return response.send("Testing Post")
})

// middleware function
function authorize(checkObj) {
    return function (request, response, next) {
        if (request.body.name === checkObj.name) {
            next();
        } else {
            return response.send("You are not authorized to access this")
        }
    }
}

app.get("/users", function (request, response) {
    return response.send({ data: users })
})

app.patch("/users/:id", function (request, response) {
    return response.send("Testing Patch")
})

app.delete("/users/:id", function (request, response) {
    // write here
    return response.send({ id: request.params.id })
})


app.listen(5000, () => {
    console.log("Listening on port 5000")
})