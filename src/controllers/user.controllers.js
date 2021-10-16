import User from '../models/User.js';

export const createUser = async (req, res) => {

  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  if (!name) errors.push(({ message: 'Please insert your name.'}));
  if (!email) errors.push(({ message: 'Please insert your email.'}));
  if (!password) errors.push(({ message: 'Please insert your password.'}));
  
  if (!confirm_password) errors.push(({ message: 'Please confirm your password.'}));
  else if (!password && password.length < 4) {
    errors.push(({ message: 'Password must be at least 4 characters.'}));
  }
  
  if (password && confirm_password && password !== confirm_password) {
    errors.push(({ message: 'Password do not match.'}));
  }

  if(errors.length>0) return res.json({ errors, name, email });

  const emailUser = await User.findOne({ email });
  
  if (emailUser) return res.status(500).json({ error: 'The email is already in use' });
  else {
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return res.json({ errors, name, email });
  }

};

export const getUsers = async (req, res) => {
  res.send('Get All Users');
};

export const getUser = async (req, res) => {
  res.send('Get User');
};
