const USER_SERVICE = require('../service/user.service');

exports.registerUser = (req, res, next) => {
  req.checkBody('fname')
    .notEmpty().withMessage('First Name Required');
  
  req.checkBody('lname')
    .notEmpty().withMessage('Last Name Required');
  
  req.checkBody('username')
    .notEmpty().withMessage('Username is required')
    .matches(/^[A-Za-z0-9\s]+$/).withMessage('Username must contain alphabets and numbers only');

  req.checkBody('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:8}).withMessage('Password must be atleast 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage('Password must contain one lowercase character, one uppercase character, one number and one special character')
  
  let errors = req.validationErrors();
  if (errors) {
    res.send({ ...errors[0], status : 400});
  }
  else {
    let userData = {
      fname               : req.body.fname,
      lname               : req.body.lname,
      username            : req.body.username,
      password            : req.body.password,
      role                : req.body.role,
      password_is_default : true
    };
  
    USER_SERVICE.addUser(userData, next)
      .then(response => res.json(response))
      .catch(err => next(err));
  }
}
