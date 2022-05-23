const PORT = 8000
const axios = require("axios").default
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getRandom',
        params: {wordLength: '5'},
        headers: {
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    }
    
    axios.request(options).then(response => {
        console.log(response.data)
        res.json(response.data)
    }).catch(error=> {
        console.error(error)
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))