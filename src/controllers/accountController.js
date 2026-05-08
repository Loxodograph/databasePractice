import accountService from "../services/accountService.js";

const getAllAccountsByUserId = async (req, res) => {
  const { id } = req.query;

  try {
    const categories = await accountService(id);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Service Error ${error.message} ` });
  }
}

export default getAllAccountsByUserId;