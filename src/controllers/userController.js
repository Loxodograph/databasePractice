import { getAllUsers, getUserByUsername } from "../services/userService.js";
import { createUser as createUserService } from "../services/userService.js";

const getUsers = async (req, res) => {
  const username = req.query.username;
  try {
    if (username) {
      const userInfo = await getUserByUsername(username);
      if (!userInfo) {
        return res.status(404).json( {message: 'User not Found'});
      }
      res.status(200).json(userInfo);
    } else {
      const users = await getAllUsers();
      res.status(200).json(users);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Service Error ${error.message}` });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
    } = req.body

    const newUser = await createUserService({
      email,
      username,
      password,
      date: new Date()
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { getUsers, createUser };