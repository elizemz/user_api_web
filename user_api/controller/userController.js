const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("../utils/fileHandler");

const getAllUser = (req, res) => {
  console.log("Get all `users");
  const users = readFile("users.json");
  res.status(200).json({ message: "success", users });
};

const getUserById = (req, res) => {
  console.log("Get an user by ID");
  const users = readFile("users.json");
  const findUser = users.filter((user) => user.id === req.params.userId);
  if (findUser.length === 0) {
    res.status(400).json({ message: `${userId} тай хэрэглэгч олдсонгүй.` });
  } else {
    res.status(200).json({ message: "success", user: findUser[0] });
  }
};

const createUser = (req, res) => {
  console.log("Create new user");
  const newUser = { id: uuidv4(), ...req.body };
  const users = readFile("users.json");
  users.push(newUser);
  writeFile("users.json", users);
  res.status(201).json({ message: "success" });
};

const updateUserById = (req, res) => {
  console.log("Update user by id");
  const { userId } = req.params;
  const users = readFile("users.json");
  let index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    res.status(400).json({ message: `${userId} тай хэрэглэгч олдсонгүй.` });
  } else {
    users[index] = { ...users[index], ...req.body };
    writeFile("users.json", users);
    res.status(200).json({
      message: `${userId} тай хэрэглэгчийг шинэчиллээ.`,
      user: users[index],
    });
  }
};

const deleteUserById = (req, res) => {
  console.log("Delete user by id");
  const { userId } = req.params;
  const users = readFile("users.json");
  const index = users.findIndex((el) => el.id === userId);
  if (index < 0) {
    res.status(400).json({ message: `${userId} тай хэрэглэгч олдсонгүй.` });
  } else {
    users.splice(index, 1);
    writeFile("users.json", users);
    res.status(200).json({ message: `${userId} тай хэрэглэгч устгалаа.` });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
