import express from "express"
import mysql from "mysql"
import cors from "cors";

const app = express()

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "learn"
})

app.get("/",(req,res) => {
    res.json("hello this is teh backend")
    
})

app.get("/notes",(req,res) => {
    const q = "SELECT * FROM notes"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/notes/:id", (req,res) => {
    const nid = req.params.id;
     const q = "SELECT * FROM notes WHERE nid = ?";
     
     db.query(q,[nid], (err, result) => {
        if (err) throw err;
        res.send(result)
     } )

  })

  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const { heading, content } = req.body;
    const q = "UPDATE notes SET `notehead` = ?, `notecontent` = ? WHERE `nid` = ?;"
    db.query(q, [ heading,content,id], (err, result) => {
      if (err) throw err;
      res.send(`Note with ID: ${id} updated successfully.`);
    });
   });
   


app.post("/notes", (req, res) => {
    const { heading, content } = req.body; // Adjust property names here
    const q = 'INSERT INTO notes (notehead, notecontent) VALUES (?, ?)';
    db.query(q, [heading, content], (err, result) => {
      if (err) throw err;
      res.send(`Note added with ID: ${result.insertId}`);
    });
  });

  app.delete("/notes/:id", (req,res) => {
    const nid = req.params.id;
     const q = "DELETE FROM notes WHERE nid = ?";
     db.query(q,[nid], (err, result) => {
        if (err) throw err;
        res.send(result)
     } )

  })

app.listen(8008, ()=> {
    console.log("connected to backend!")
} )

