const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");


db.serialize(() => {
  createTableQuery = `CREATE TABLE IF NOT EXISTS tiere (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tierart TEXT NOT NULL,
        name TEXT NOT NULL,
        krankheit TEXT NOT NULL,
        geburtstag TEXT NOT NULL, 
        gewicht REAL NOT NULL  
    )`;
  db.run(createTableQuery); // REAL steht für Float Zahlen (5.5)

  insertQuery = `INSERT INTO tiere (tierart,name,krankheit,geburtstag,gewicht) VALUES("Hund","Rudolfo","Fieber","01.01.2000",3.2),("Katze","Haku","Keine","01.08.2021",4.5) `;

  db.run(insertQuery);

  selectQuery = `SELECT * FROM tiere`;

  db.all(selectQuery, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
    }
  });

  process.on("exit", function () {
    db.close();
  });
});


const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors())
const PORT = 3000;
app.use(express.json()) // Dieser Code ermöglicht uns einen Body in dem Request zu haben

app.get("/", (req, res) => {
  res.send("Es funktioniert");
});

app.get("/tiere" ,(req,res)=>{
    db.all(selectQuery, (err,rows) => {
        if (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }else{
            res.json(rows)
        }
    })
})

app.get("/tiere/:id", (req,res) => {
    const id  = req.params.id

    // const {id} = req.params

    const selectOneQuery = `SELECT * FROM tiere WHERE id = ?`
    
    db.get(selectOneQuery, [id], (err,row) => {
        if (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }else if(row){
            res.json(row)
        }else{
            res.status(404).send("nicht gefunden")
        }
    })
})

app.post("/tiere", (req,res) => {

    const {tierart,name,krankheit,geburtstag,gewicht} = req.body
    const insertQuery = `INSERT INTO tiere (tierart,name,krankheit,geburtstag,gewicht) VALUES (?,?,?,?,?)`;

    db.run(insertQuery, [tierart,name,krankheit,geburtstag,gewicht], (err) => {
        if (err){
            console.error(err)
            res.status(500).send("Interal Server Error")
        }else {
            res.status(201).send("Tier wurde erfolgreich erstellt")
        }
    })
})


app.put("/tiere/:id", (req,res) => {
    const id = req.params.id
    const {tierart,name,krankheit,geburtstag,gewicht} = req.body

    const updateQuery = `UPDATE tiere SET tierart = ?, name = ?, krankheit= ?, geburtstag = ?, gewicht=? WHERE id = ?`

    db.run(updateQuery, [tierart,name,krankheit,geburtstag,gewicht,id], (err) => {
        if (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }else {
            res.status(200).send("Eintrag wurde erfolgreich aktualisiert")
        }
    })
})

app.delete("/tiere/:id", (req,res) =>{
    const id =req.params.id

    const deleteQuery = `DELETE FROM tiere WHERE id = ?`

    db.run(deleteQuery, [id], (err)=> {
        if (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }
        else{
            res.status(200).send("Eintrag wurde erfolgreich gelöscht")
        }
    })
})



app.listen(PORT, () => {
  console.log(`Server wurde gestartet auf Port ${PORT}`);
});
