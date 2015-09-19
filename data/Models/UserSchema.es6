import mongoose from 'mongoose';

import Hobby from './HobbySchema.es6';

let UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: String,
  surname: String,
  age: Number,
  hobbies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  type: String
});

UserSchema.set('toJSON', {getters: true});

let User = mongoose.model('User', UserSchema);

exports.UserSchema = User;

function getUserById(id) {
  return new Promise((resolve, reject) => {
    User.findOne({id:id}).populate('hobbies friends').exec((err,res) => {
        err ? reject(err) : resolve(res);
    });
  });
}

exports.getUserById = getUserById;

exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}).populate('hobbies friends').exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.addUser = (root, {name, surname, age, hobbies, friends}) => {
  var newUser = new User({
    name: name,
    surname: surname,
    age: age,
    hobbies: hobbies,
    friends: friends
  });

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateUser = ({name, surname, age ,hobbies, friends, id}) => {
  let modify = {};

  name ? modify.name = name : null;
  surname ? modify.surname = surname : null;
  age ? modify.age = age : null;
  hobbies ? modify.hobbies = hobbies : null;
  friends ? modify.friends = friends : null;

  return new Promise((resolve, reject) => {
    User.update({id: id}, modify, (err, res) => {
      res.id = id;
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateAge = ({age, id}) => {
  return new Promise((resolve, reject) => {
    User.update({id:id}, {age:age}, (err, res) => {
      res.id = id;
      err ? reject(err) : resolve(res);
    });
  });
};