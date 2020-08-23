module.exports = (req, res, next) => {
  let user = req.body.userData;
  if (user.role !== 'engineer') {
    next({
      msg    : 'Not authorized',
      status : 400
    });
  } 
  else {
    next();
  }
};