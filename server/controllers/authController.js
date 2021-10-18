const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

module.exports ={
  
  signUp: async (req,res) =>{
    const {email, password} = req.body;
    console.log('signUp server ping');
    console.log(req.body);
    const db = req.app.get('db');
    const result = await db.get_user([email]);
    const existingUser = result[0];
    if (existingUser){
      return res.status(409).send(`Account already exists with email: ${email}`);
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    const registeredUser = await db.signup([email, hash]);
    console.log(registeredUser)
    const user = registeredUser[0];
    // req.session.user = {isAdmin: user.admin, email: user.email, id: user.user_id};
    return res.status(201).send({isLoggedIn: true, user});
  },
  

  login: async (req,res) =>{
    const {email, password} = req.body;
    console.log('login server ping')
    console.log(email, password)
    const foundUser = await req.app.get('db').get_user([email]);
    const user = foundUser[0];
    if (!user){
      return res.status(401).send('User not found');
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated){
      return res.status(403).send('Wrong password');
    }
    // req.session.user = {isAdmin:user.admin, id: user.user_id,};
    return res.status(200).send({isLoggedIn: true, user});
  },

  
  logout: (req,res) =>{
    req.session.destroy();
    return res.sendStatus(200).send({isLoggedIn: false});
  },

  newPassword: async (req,res) =>{
    console.log('new password server ping')
    const {email, newPassword} = req.body;
    console.log(email, newPassword)

    const foundUser = await req.app.get('db').get_user([email]);
    const user = foundUser[0];
    if (!user){
      return res.status(401).send('User not found');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: process.env.OAUTH_ACCESS_TOKEN
      }
    });
    
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Sign Configurator Password Reset',
      text:`Thank you for using our Password reset option. Your new password is ${newPassword}`
    };
    
    transporter.sendMail(mailOptions, function(err, data){
      if (err) {
        console.log(err); 
      } else {
        console.log('Email sent')
      }
    })

    const salt = bcrypt.genSaltSync(13);
    const hash = bcrypt.hashSync(newPassword,salt);
    const registeredUser = await req.app.get('db').overwrite_password([email, hash]);
    console.log(registeredUser)
    // const user = registeredUser[0];
    // req.session.user = {isAdmin: user.admin, email: user.email, id: user.user_id};
    return res.status(201);
  }

}