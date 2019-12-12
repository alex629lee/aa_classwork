const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    return { message: "Password must be between 6 and 20 characters long", isValid: false};
  }

  return {
    message: "",
    isValid: true
  };
};