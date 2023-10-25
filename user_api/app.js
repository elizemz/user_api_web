const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const PORT = 8008;
const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
  console.log("Get all users");
  res.status(200).json({ message: "success" });
});

app.post("/api/users", (req, res) => {
  console.log("Create new user");
  const newUser = { id: uuidv4(), ...req.body };

  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf-8" })
  ); // {users: []}

  users.push(newUser);

  fs.writeFileSync("users.json", JSON.stringify({ users }), {
    encoding: "utf-8",
  });
  res.status(201).json({ message: "success" });
});

app.put("/api/users/:userId", (req, res) => {
  console.log("Update user by id");
  res.status(200).json({ message: "success" });
});

app.delete("/api/users/:userId", (req, res) => {
  console.log("Delete user by id");
  const { userId } = req.params;
  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf-8" })
  );
  const index = users.findIndex((el) => el.id === userId);
  if (index < 0) {
    res.status(400).json({ message: `${userId} тай хэрэглэгч олдсонгүй.` });
  } else {
    users.splice(index, 1);

    fs.writeFileSync("users.json", JSON.stringify({ users }), {
      encoding: "utf-8",
    });
    res.status(200).json({ message: `${userId} тай хэрэглэгч устгалаа.` });
  }
});

app.listen(PORT, () => console.log(`Server is listening at ${PORT} port`));
