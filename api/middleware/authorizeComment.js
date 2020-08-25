module.exports = (req, res, next) => {
  let user = req.body.userData;
  if (user.role !== 'engineer' && user.role !== 'team lead') {
    next({
      msg    : 'Not authorized',
      status : 400
    });
  } 
  else {
    next();
  }
};