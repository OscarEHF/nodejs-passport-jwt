import Role from '../models/Role.js';
import User from '../models/User.js';

export const createUser = async (req, res) => {

  const { name, email, password, confirm_password, role } = req.body;
  const errors = [];

  if (!name) errors.push(({ message: 'Please insert your name.'}));
  if (!email) errors.push(({ message: 'Please insert your email.'}));

  if (!password) {
    errors.push(({ message: 'Please insert your password.'}));
  } else if (password && password.length < 4) {
    errors.push(({ message: 'Password must be at least 4 characters.' }));
  } else if (!confirm_password) {
    errors.push(({ message: 'Please confirm your password.'}));
  } else if (password && confirm_password && password !== confirm_password) {
    errors.push(({ message: 'Password do not match.'}));
  }

  if(errors.length>0) return res.json({ errors, name, email });

  const emailUser = await User.findOne({ email });
  
  if (emailUser) return res.status(500).json({ error: 'The email is already in use' });
  else {
    const roleUser = await Role.findById(role);
    if(roleUser) {
      const newUser = new User({ name, email, password, role });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      return res.json({ errors, name, email });
    } else {
      return res.status(500).json({ error: 'Role not found' });
    }
  }

};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    if (!users) return res.json([]);
    else res.json(users);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('role');
    if (!user) return res.json({});
    else return res.json(user);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};