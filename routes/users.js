const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const gravatar = require("gravatar");
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateProfileInput = require("../validation/profile");

const User = require("../models/User");

// ? route   POST api/users/register
// * desc    Register user
// ! access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const { username, password, fullname, address, phone, email } = req.body;

      const newUser = new User({
        username,
        password,
        fullname,
        address,
        phone,
        email,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// ? Route : POST api/users/login
// * Desc : Login user / Return token
// ! Access : Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "ไม่พบชื่อผู้ใช้";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fullname: user.fullname,
          avatar: user.avatar,
          email: user.email
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "รหัสผ่านไม่ถูกต้อง";
        return res.status(400).json(errors);
      }
    });
  });
});

// ? Route : GET api/users/:id
// * Desc : Get user profile by id
// ! Access : Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(user);
    });
  }
);

// ? Route : PUT api/users/:id
// * Desc : Update your profile by id
// ! Access : Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { fullname, email, phone, address } = req.body;

    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).json(err);

      user.fullname = fullname;
      user.email = email;
      user.phone = phone;
      user.address = address;

      user.save(err => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(user);
      });
    });
  }
);

// ? Route : DELETE api/users/:id
// * Desc : Delete your account
// ! Access : Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, User) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        message: "Account successfully deleted"
      });
    });
  }
);

module.exports = router;
