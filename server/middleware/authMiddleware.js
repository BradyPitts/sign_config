module.exports = {

  usersOnly: (req,res) =>{
    if (!req.session.user){
      return res.status(401).send('Please log in');
    }
  },

  adminsOnly: (req,res, next) =>{
    if (!req.session.isAdmin){
      return res.status(403).send('Please log in as an Admin');
    }
    next();
  }
}