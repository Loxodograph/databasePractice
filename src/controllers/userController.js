import { getAllUsers } from "../services/userService.js";
import { createUser as createUserService } from "../services/userService.js";
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
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
      passwordHash,
    } = req.body

    const newUser = await createUserService({
      email,
      username,
      passwordHash,
      date: new Date()
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { getUsers, createUser };