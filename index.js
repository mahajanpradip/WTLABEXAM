var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var db = require("./database/db.js");

db();
var app = express();
var Schema = mongoose.Schema;
var tschema = new Schema({
  id: Number,
  modelName: String,
  brand: String,
  price: Number,
  size: String,
});
var tmodel = mongoose.model("televisions", tschema);
app.use(express.json());
app.use(cors());

app.get("/getData", async (req, res) => {
  try {
    var result = await tmodel.find();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/addData", async (req, res) => {
  try {
    var result = tmodel(req.body);
    await result.save();
    res.send("Inserted");
  } catch (err) {
    res.send(err.message);
  }
});
app.put("/UpdateData/:id", async (req, res) => {
  try {
    var result = await tmodel.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );
    res.send(req.params.id + "Updated");
  } catch (err) {
    res.send(err.message);
  }
});
app.delete("/DeleteData/:id", async (req, res) => {
  try {
    var result = await tmodel.deleteOne({ id: req.params.id });
    res.send(req.params.id + "Deleted");
  } catch (err) {
    res.send(err.message);
  }
});
app.listen(9000);
