const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateDogInput = require("../validation/dog");
const validateVaccinationInput = require("../validation/vaccination");

const Dog = require("../models/Dog");

// ? Route : POST api/dogs
// * Desc : Create your dogs bio
// ! Access : Private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      name,
      sex,
      dateofbirth,
      age,
      primarycolor,
      secondarycolor,
      breed
    } = req.body;

    const newDog = new Dog({
      owner: req.user._id,
      name,
      sex,
      dateofbirth,
      age,
      primarycolor,
      secondarycolor,
      breed
    });

    newDog.save(err => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(newDog);
    });
  }
);

// ? Route : GET api/dogs
// * Desc : Get your dogs bio
// ! Access : Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Dog.find({ owner: req.user._id }, (err, dogs) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(dogs);
    });
  }
);

// ? Route : GET api/dogs/:id
// * Desc : Get your dog bio by id
// ! Access : Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Dog.findById(req.params.id, (err, dog) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(dog);
    });
  }
);

// ? Route : PUT api/dogs/:id
// * Desc : Update your dog bio by id
// ! Access : Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      name,
      sex,
      dateofbirth,
      age,
      primarycolor,
      secondarycolor,
      breed
    } = req.body;

    Dog.findById(req.params.id, (err, dog) => {
      if (err) return res.status(500).json(err);

      dog.name = name;
      dog.sex = sex;
      dog.dateofbirth = dateofbirth;
      dog.age = age;
      dog.primarycolor = primarycolor;
      dog.secondarycolor = secondarycolor;
      dog.breed = breed;

      dog.save(err => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(dog);
      });
    });
  }
);

// ? Route : DELETE api/dogs/:id
// * Desc : Delete your dog bio by id
// ! Access : Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Dog.findByIdAndRemove(req.params.id, (err, dog) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        message: "Dog successfully deleted"
      });
    });
  }
);

// ? Route : POST api/dogs/:id/vaccination
// * Desc : Save vaccination to dogs bio by id
// ! Access : Private
router.post(
  "/:id/vaccination",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVaccinationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, age, date, next } = req.body;

    Dog.findById(req.params.id, (err, dog) => {
      if (err) return res.status(500).json(err);

      dog.vaccination = [...dog.vaccination, { name, age, date, next }];

      dog.save(err => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(dog);
      });
    });
  }
);

// ? Route : DELETE api/dogs/:id/vaccination/:vaccinationId
// * Desc : Remove vaccination to dogs bio by id
// ! Access : Private
router.delete(
  "/:id/vaccination/:vaccinationId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVaccinationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Dog.findById(req.params.id, (err, dog) => {
      if (err) return res.status(500).json(err);

      dog.vaccination = dog.vaccination.filter(
        vaccin => vaccin.id !== req.params.vaccinationId
      );

      dog.save(err => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(dog);
      });
    });
  }
);

module.exports = router;
