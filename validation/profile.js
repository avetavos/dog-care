const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (
    !Validator.isLength(data.fullname, {
      min: 2,
      max: 50
    })
  ) {
    errors.fullname =
      "ชื่อต้องมีความยาวมากกว่า 2 ตัวอักษรและไม่เกิน 50 ตัวอักษร";
  }

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "โปรดระบุชื่อ";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "โปรดระบุที่อยู่";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "โปรดระบุเบอร์โทรศัพท์ที่ติดต่อได้";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "โปรดระบุอีเมล";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "อีเมลไม่ถูกต้อง";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
