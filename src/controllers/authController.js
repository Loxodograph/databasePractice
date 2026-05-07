import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const result = await authService(req.body);

    res.json(result);
  } catch (err) {
    res.status(401).json({
      message: err.message
    });
  }
}

export default login;