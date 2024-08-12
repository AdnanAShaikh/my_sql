const express = require("express");
const db = require("./db");
const { use } = require("react");
const port = 3000;

const app = express();
app.use(express.json());

app.post("/user/create", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name,email) VALUES (?,?) ";

  db.query(query, [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Success !" });
  });
});

app.get("/user/all", (req, res) => {
  const query = "Select * from users";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "Select * from users where id = ?";
  db.query(query, userId, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const query = "Update users Set name= ?, email=? where id = ? ";
  db.query(query, [name, email, userId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "delete from users where id = ?";
  db.query(query, userId, (err, result) => {
    if (err) throw err;
    res.json({ message: "Delete success" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
