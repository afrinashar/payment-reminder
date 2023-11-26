// const express = require('express');
// const mongoose = require('mongoose');
// const booksRoutes = require('./routes/bookRoutes');
// const path = require('path');
// var cors = require('cors');
// //const flash = require('express-flash');
// const app = express();
// //const passport = require('./config/passport');
// const session = require('express-session');

// app.use(cors());
// // Connect to MongoDB
// mongoose.connect('mongodb+srv://afrin:961215106001@cluster0.hbkqtqv.mongodb.net/bookList', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // useFindAndModify: false,
//   // useCreateIndex: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB', err));
// // Set up express-session and express-flash
// app.use(session({
//   secret: 'your-secret-key',
//   resave: true,
//   saveUninitialized: true
// }));
// // Passport middleware
// //app.use(passport.initialize());
// //app.use(passport.session());
// // Set up the middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //app.use(flash());
// // Set up the static directory for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// // Set up routes
// // app.use((req, res, next) => {
// //   res.locals.success_msg = req.flash('success_msg');
// //   res.locals.error_msg = req.flash('error_msg');
// //   next();
// // });
// app.use(booksRoutes);
// // Routes
// //const authRoutes = require('./routes/index');
// //app.use(authRoutes);
// // Express middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// // Passport configuration
// //require('./config/passport');

// // Routes
// //app.use('/', indexRoutes);
// //app.use('/', adminRoutes);

// // Set up the port for the server to run
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/paymentReminder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express middleware
app.use(bodyParser.json());

// Define MongoDB schema and model
const reminderSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  dueDate: Date,
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Express routes
app.get('/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/reminders', async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
