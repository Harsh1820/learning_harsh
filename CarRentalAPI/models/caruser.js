const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, maxLength: 30 },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dob: { type: Date, required: true },
  city: { type: String, required: true },
  profession: { type: String, enum: ['IT', 'Sales', 'Unemployed'], required: true },
  password: { type: String, required: true, minLength: 7 },
});

// Encrypt password before saving the user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const Car = mongoose.model('Car', userSchema);

module.exports = Car;
