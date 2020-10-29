const express = require('express');
const app = express()
app.get('/api/data', (req, res) => {
    res.send(Math.random() + '')
})
app.use(express.static('./'))

app.listen(3000, () => {
    console.log('http://localhost:3000')
})