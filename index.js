require("./models");
const express = require("express");
const app = express();
const PORT = 8000;
const {
  addUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  rawQuery,
  oneToOne,
  oneToMany,
  userParanoid
} = require("./controllers/user");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/add", addUser);
app.get("/user/:id", getUserById);
app.get("/users", getAllUsers);
app.patch("/update/:id", updateUser);
app.delete("/delete/:id", deleteUser);

app.get("/rawQuery", rawQuery);
app.get("/one-one", oneToOne);
app.get("/one-many", oneToMany);
app.delete("/paranoid", userParanoid)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
