const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVaccinationInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.next = !isEmpty(data.next) ? data.next : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "กรุณาระบุชื่อวัคซีน";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "กรุณาระบุอายุสุนัข ณ วันที่ฉีดวัคซีน";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "กรุณาระบุวันเดือนปีที่ฉีดวัคซีน";
  }

  if (Validator.isEmpty(data.next)) {
    errors.next = "กรุณาระบุวันเดือนปีที่สัตวแพทย์นัดพบครั้งถัดไป";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
