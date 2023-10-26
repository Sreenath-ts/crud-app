//id,name,email,phone,city
let { check } = require("express-validator");

module.exports = {
    DataValidation :[
        check("name")
        .isLength({ min: 5 })
      .withMessage("is invalid, must contain minimum of 5 letters")
      .isLength({ max: 15 })
      .withMessage("is invalid, must contain maximum of 15 letters")
      .trim(),
      check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("is invalid, must be a valid email!")
      .trim(),
      check("phone")
      .isMobilePhone('en-IN')
      .withMessage('is not a valid phone number'),
      check("city")
      .isString()
      .withMessage('Is invalid')
    ]
}