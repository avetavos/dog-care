const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

  if (Validator.isEmpty(data.username)) {
    errors.username = "โปรดระบุชื่อผู้ใช้";
  }

  if (!Validator.isAlpha(data.username, ["en-US"])) {
    errors.username =
      "อนุญาติให้ตั้งชื่อผู้ใช้เป็นภาษาอังกฤษตัวพิมพ์เล็กหรือพิมพ์ใหญ่เท่านั้น";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "โปรดระบุอีเมล";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "อีเมลไม่ถูกต้อง";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "โปรดระบุรหัสผ่าน";
  }

  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 20
    })
  ) {
    errors.password =
      "รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษรและไม่เกิน 20 ตัวอักษร";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "โปรดยืนยันรหัสผ่าน";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "รหัสผ่านไม่ตรงกัน";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
