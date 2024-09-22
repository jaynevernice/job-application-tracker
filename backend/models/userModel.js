import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.signup = async function(fname, lname, email, password) {

  if(!fname || !lname || !email || !password) {
    throw Error('Fill out all required fields')
  }

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid');
  };

  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  };

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ fname, lname, email, password: hash });

  return user;
};

userSchema.statics.login = async function(email, password) {

  if(!email || !password) {
    throw Error('Fill out all required fields')
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Wrong email');
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match) {
    throw Error('Invalid login credentials. Check if password is correct');
  }

  return user
   
};

export default mongoose.model('User', userSchema);
