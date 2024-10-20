const express = require("express");
const app = express();

const db = require("./models");

const { User } = require("./models"); 

// Selecciona todos los usuarios de la tabla users   
app.get("/select-all-users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

// Selecciona todos los usuarios con el nombre "John"
app.get("/select-johns", (req, res) => {
  User.findAll({ where: { firstName: "John" } })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

// Inserta un John con 30 años
app.get("/insert", (req, res) => {
  User.create({
    firstName: "John",
    age: 30,
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("Insert");
});

// Elimina el usuario con id 3
app.get("/delete", (req, res) => {
  User.destroy({
    where: {
      id: 3,
    },
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("delete");
});


// Crea el servidor con el puerto 3001
db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
