module.exports = (req, res, next) => {
  let user = req.body.userData;
  if (user.role === 'admin' ) {
    next({
      msg    : 'Not authorized',
      status : 400
    });
  } 
  else {
    next();
  }
};