import jwt from 'jsonwebtoken';
import { hash as _hash, compare } from 'bcrypt';
import User from '../models/user.js';

export async function signup(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Must have email and password'
      });
    }

    const hash = await _hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash
    });
    try {
      const save = await user.save();
      if (save) {
        res.status(201).json({ message: 'User Created' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(401).json({ error: 'Not Authorized' });
    } else {
      const valid = await compare(req.body.password, user.password);

      if (!valid) {
        return res.status(401).json({ error: new Error('Not Authorized') });
      }

      return res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: '24h' }
        )
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
