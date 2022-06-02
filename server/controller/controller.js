var UserDB = require("../model/model");

// create and save new user
exports.insert = (req, res) => {
  // validate req
  if (!req.body) {
    res.status(400).send({ message: "content can't be empty" });
    return;
  }

  let d = req.body.dob;
  console.log(d);
  // new user
  const user = new UserDB({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
  });

  //save user in the db
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

// retrieve and return all users/single user


exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserDB.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Error retrieving with id ${id}` });
      });
  } else {
    UserDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Error occurred when retrieve" });
      });
  }
};

// update by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}.` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// delete by user id
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can't delete` });
      } else {
        res.send({ message: `User was deleted` });
      }
    })
    .catch((err) => {
      res.status(404).send({ message: `Can't delete` });
    });
};
