const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDogInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.primarycolor = !isEmpty(data.primarycolor) ? data.primarycolor : "";
  data.secondarycolor = !isEmpty(data.secondarycolor)
    ? data.secondarycolor
    : "";
  data.breed = !isEmpty(data.breed) ? data.breed : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "กรุณาระบุชื่อสุนัข";
  }

  if (Validator.isEmpty(data.sex)) {
    errors.sex = "กรุณาระบุเพศของสุนัข";
  }

  if (Validator.isEmpty(data.dateofbirth)) {
    errors.dateofbirth = "กรุณาระบุวันเดือนปีเกิดของสุนัข";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "กรุณาระบุอายุของสุนัข";
  }

  if (Validator.isEmpty(data.primarycolor)) {
    errors.primarycolor = "กรุณาระบุสีหลักของสุนัข";
  }

  if (Validator.isEmpty(data.secondarycolor)) {
    errors.secondarycolor = "กรุณาระบุสีรองของสุนัข";
  }

  if (Validator.isEmpty(data.breed)) {
    errors.breed = "กรุณาระบุสายพันธุ์ของสุนัข";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
