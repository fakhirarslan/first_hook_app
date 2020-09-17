const router = require('express').Router();
let User = require('../Models/schema');
let song = require('../Models/schema');

router.route('/login').post((req, res) => {
   User.findOne({ email: req.body.email, password: req.body.password })
      .then(user => {
         if (user) {
            res.json({
               email: user.email,
               password: user.password,
               name: user.name,
               phone: user.phone,
               status: "User Exists!"
            });
         } else {
            res.json({
               status: "No User"
            });
         }
      })
});

router.route('/register').post((req, res) => {
   const email = req.body.email;
   const password = req.body.password;
   const name = req.body.name;
   const phone = req.body.phone;

   const userData = {
      email: email,
      password: password,
      name: name,
      phone: phone
   };

   User.findOne({ email: email })
      .then(user => {
         if (!user) {
            User.create(userData)
               .then(user => {
                  res.json({ status: user.email + ' User Registered!' });
               })
               .catch(err => {
                  res.send('error: ' + err)
               })
         } else {
            res.json({ error: 'User Already Exists!' });
         }
      })
});

router.route('/songs').post((req, res) => {
   const info = req.body.info

   const songData = {
      info: info
   };

   song.findOne({ info: info })
      .then(newSong => {
         if (!newSong) {
            song.create(songData)
               .then(newSong => {
                  res.json({ status: newSong.info.name + ' Song Added!' });
               })
               .catch(err => {
                  res.send('error: ' + err)
               })
         } else {
            res.json({ error: 'Song Already Exists!' });
         }
      })
});

router.route('/songs').get((req, res) => {

   song.find({}, function(err, data) {
      if(err) {
         res.send(err);
      } else {
         res.send(data);
      }
   })
});

module.exports = router;
