const express=require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const bodyParser= require('body-parser');
const passport= require('passport');
require("dotenv").config();
require('./config');

const app= express();
const PORT =process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
