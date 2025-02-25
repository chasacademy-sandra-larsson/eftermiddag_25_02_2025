import express from "express";
import cors from "cors";

const app = express();


// Per default är det en säkerhetsåtgärd. Men man kan tillåta alla domäner med följande. Så att ni kan requesta
// från er frontendapplikation
app.use(cors());
app.use(express.json())

type User = {
  id: number;
  username: string;
  password: string;
} 

// "Sem en tabell/resurs i vår databas"
let users: User[] = [];


// CRUD - Create Read Update Delete

// Create 
app.post("/users", (req, res) => {
    // Lägga till användare i arrayen
    // "På riktigt" kommer datat in via formulär i frontend
    // Men vi testar först med ThunderClient
    const newUser = req.body;
    newUser.id = users.length + 1;  
    users = [...users, newUser]
    console.log("DB updated: ", users);
    res.status(201).json(newUser);
})

// Read one
app.get("/users/:id", (req, res) => {

  const id = req.params.id;
  const user = users.find(user => user.id === parseInt(id));
  if(user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found")
  }
 
})

// Skriv routes för PUT och DELETE

// Read many
app.get("/users", (req, res) => {
  res.status(200).json(users);
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



