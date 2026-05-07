const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async(req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username }});
  if (!user) return res.status(401).json({ message: 'Invalid Credentials'});

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials '});

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, username: user.username});
};