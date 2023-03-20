const mongoose = require('mongoose');
const express=require('express');
const app =express();
const Registration=require('./schema');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://:@cluster0.uh6dubm.mongodb.net/?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Create a ro444ute to handle the form submission
app.post('/api/register', (req, res) => {
  // Create a new instance of the Registration model with the submitted data
  const newRegistration = new Registration({
    name: req.body.name,
    kindOfInfluencer: req.body.kindOfInfluencer,
    noOfFollowers: req.body.noOfFollowers,
    subscribersTwitter: req.body.subscribersTwitter,
    subscribersInstagram: req.body.subscribersInstagram,
    subscribersFacebook: req.body.subscribersFacebook,
    subscribersYouTube: req.body.subscribersYouTube,
    subscribersSnapchat: req.body.subscribersSnapchat,
    subscribersTikTok: req.body.subscribersTikTok,
    areaOfActive: req.body.areaOfActive,
    viewsPerPost: req.body.viewsPerPost,
    viewsPerVideo: req.body.viewsPerVideo,
    viewsPerReel: req.body.viewsPerReel,
    viewsPerTweet: req.body.viewsPerTweet,
    priceForPromotion: req.body.priceForPromotion,
    username: req.body.username,
    password: req.body.password
    // instagramhandlelink:req.body.instagramhandlelink,
    // youtubechannellink:req.body.youtubechannellink,
    // twitterhandlelink: req.body.twitterhandlelink,


  });

  // Save the new registration to the database
  newRegistration.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if user exists in the database
    const user = await Registration.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Generate and send JWT
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.json({ token });
  });
  

module.exports = app;
