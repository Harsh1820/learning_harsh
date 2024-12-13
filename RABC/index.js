const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const recordsRoutes = require('./routes/record');
// const authController = require('./controllers/authController');
// const recordsController = require('./controllers/recordsController');
// const rbacMiddleware = require('./middleware/rbacMiddleware');


// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(`MongoDB connection error: ${err.message}`);
});

// Configure middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
// app.use('/auth', authRoutes);
app.use('/records', recordsRoutes);
// app.use('/records', rbacMiddleware.checkRole('user'), recordsRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
