const express = require('express')

const cors = require('cors')

const app = express()

const PORT = 3333

app.use(express.json())

app.use(cors())

app.listen(PORT, () => console.log(`Servidor executando  em http://localhost:${PORT}`))

