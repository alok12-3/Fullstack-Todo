const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

//signup


router.post('/signup', async (req, res) => {
   const {firstName, lastName, email, password, age, gender} = req.body;

   try{
      let user = await User.findOne({email});
      if (user) {
         return res.status(400).json({msg: 'User already exists'});
      }

      user = new User({
         firstName,
         lastName,
         email,
         password,
         age,
         gender
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
         user: {
            id: user.id
         }
      };

      jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000}, (err, token) => {
         if (err) throw err;
         res.json({token});
      });
   } catch(err){
      console.log(err.message);
      res.status(500).send('Server error');
   }
});

//log in

router.post('/login', async (req, res) => {
   const {email, password} = req.body;

   try{
      let user = await User.findOne({email});
      if (!user) {
         return res.status(400).json({msg: 'Invalid credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({msg: 'Invalid credentials'});
      }

      const payload = {
         user: {
            id: user.id
         }
      };

      jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000}, (err, token) => {
         if (err) throw err;
         res.json({token});
      });
   } catch(err){
      console.log(err.message);
      res.status(500).send('Server error');
   }
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`/auth/success?token=${token}`);
});

module.exports = router;