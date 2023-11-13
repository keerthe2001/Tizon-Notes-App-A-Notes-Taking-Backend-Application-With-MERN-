const express = require('express')
var cors = require('cors')

const ConnectToMongoose = require('./db');
ConnectToMongoose();

const app = express()
app.use(cors())
const port = 5000


app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
