const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: [true, 'Requiere un nombre para el usuario'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Requiere un correo electrónico'],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Formato de correo electrónico incorrecto',
    },
  },
  password: {
    type: String,
    required: [true, 'Requiere una contraseña'],
    minlength: 6,
    maxlength: 12,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Error('Correo o contraseña incorrectos. Intenta de nuevo'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Error('Correo o contraseña incorrectos. Intenta de nuevo'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
