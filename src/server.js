const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3333;
const routes = require("./routes/routes");

require("./database/connection");
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(PORT, () =>
  console.log(`Servidor executando  em http://localhost:${PORT}`)
);
