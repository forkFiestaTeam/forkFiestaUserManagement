const express = require("express");
const cors = require("cors");
const { User, Address } = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

// USER ENDPOINTS
app.get("/users", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const snapshot = await User.where("id", "==", id).get();
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(users);
});

app.post("/create-user", async (req, res) => {
  const {id, name, email,role} = req.body;
  console.log(role)
  await User.add({ id, name, email,role});
  res.send({ msg: "User Added" });

});

app.post("/update-user", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete-user", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});

// ADDRESS ENDPOINTS
app.get("/address", async (req, res) => {
  const snapshot = await Address.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.get("/address/:id", async (req, res) => {
  const id = req.params.id;
  const snapshot = await Address.where("user_id", "==", id).get();
  const address = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(address);
});

app.post("/create-address", async (req, res) => {
  const {user_id, name, address, address_details, phone, city} = req.body;
  await Address.add({user_id, name, address, address_details, phone, city});
  res.send({ msg: "Address Added" });
});

app.post("/update-address", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await Address.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete-address", async (req, res) => {
  const id = req.body.id;
  await Address.doc(id).delete();
  res.send({ msg: "Deleted" });
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`UserManagement service UP and running on PORT: ${PORT}`));