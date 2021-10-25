import jwt from 'jsonwebtoken';

import config from '../config.js';

import User from '../models/User.js';
import Role from '../models/Role.js';

export const signUp = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  if (!name) errors.push(({ message: 'Please insert your name.' }));
  if (!email) errors.push(({ message: 'Please insert your email.' }));

  if (!password) {
    errors.push(({ message: 'Please insert your password.' }));
  } else if (password && password.length < 4) {
    errors.push(({ message: 'Password must be at least 4 characters.' }));
  } else if (!confirm_password) {
    errors.push(({ message: 'Please confirm your password.' }));
  } else if (password && confirm_password && password !== confirm_password) {
    errors.push(({ message: 'Password do not match.' }));
  }

  if (errors.length > 0) return res.json({ errors, name, email });

  const emailUser = await User.findOne({ email });
  
  const role = await Role.findOne({ name: 'User' });
  if (!role) return res.status(500).json({ error: 'Something went wrong.' });

  if (emailUser) return res.status(500).json({ error: 'The email is already in use' });
  else {
    try {
      const newUser = new User({ name, email, password, role: role._id });
      newUser.password = await newUser.encryptPassword(password);
      const savedUser = await newUser.save();
      if (!savedUser) return res.status(500).json({ error: 'Something went wrong.' });
      else {
        return res.json(savedUser);
      }
    } catch (error) {
      console.log(error.stack);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

};

export const signIn = async (req, res) => {
  const token = jwt.sign({ id: req.user._id }, config.JWT_SECRET_KEY, {
    expiresIn: '1d'
  });
  res.set('Authorization', `Bearer ${token}`);
  res.json({ message: 'Authorized' });
};

export const isModerator = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const role = await Role.findById(user.role);
  if (role.name === 'Moderator' || role.name === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Require moderator role' });
  }
}

export const isAdmin = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const role = await Role.findById(user.role);
  if (role.name !== 'Admin') {
    return res.status(403).json({ message: 'Require admin role' });
  }
  next();
}