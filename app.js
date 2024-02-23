var express = require('express');
import { mongoconnection } from "./db"
import bodyParser from 'body-parser';

var app = express();
import cors from 'cors'

mongoconnection();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("server listining on 8000")
})

export default app
