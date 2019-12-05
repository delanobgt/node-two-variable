const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const server = require("http").Server(app);

app.get("/", (req, res) => {
  fs.readFile("temp.json", function(err, buf) {
    if (err) {
      res.json({
        name: "error",
        age: -1
      });
    }
    res.json(JSON.parse(buf.toString()));
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const { name, age } = req.body;
  const obj = { name, age };
  console.log({ obj });
  fs.writeFile("temp.json", JSON.stringify(obj), err => {
    if (err) res.json({ error: 1 });
    res.json({ error: 0 });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`  Server listening on port ${PORT}`);
});
