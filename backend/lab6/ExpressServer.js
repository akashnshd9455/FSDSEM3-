import express from "express";
import cors from "cors";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

const userData = [
  {
    id: 101,
    name: "cm",
    email: "cmrj88@gmail.com",
    password: "123456"
  }
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome user"
  });
});

app.get("/msg", (req, res) => {
  res.status(200).json({
    message: "Hello user"
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({ message: "data received", userData });
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userData.find((user) => user.id === id);

  if (user) {
    res.status(200).json({ message: "data received", user });
    return;
  }

  res.status(404).json({ message: "user not found" });
});

app.post("/create", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "name and email are required" });
    return;
  }

  const newUser = {
    id: userData.length ? userData[userData.length - 1].id + 1 : 101,
    name,
    email,
    password: password || ""
  };

  userData.push(newUser);
  res.status(201).json({ message: "user created", newUser });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const user = userData.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  if (user.password !== password) {
    res.status(401).json({ message: "incorrect password" });
    return;
  }

  res.status(200).json({ message: "login successful", user: { id: user.id, name: user.name, email: user.email } });
});

app.put("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const userIndex = userData.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  userData[userIndex] = { ...userData[userIndex], name, email };
  res.status(200).json({ message: "user updated", user: userData[userIndex] });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});