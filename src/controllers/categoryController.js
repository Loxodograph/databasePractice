import { getAllCategories, getCategoryById } from "../services/categoryService.js";

const getCategories = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const numericalId = Number(id);
      const category = await getCategoryById(numericalId);
      res.status(200).json(category);
    } else {
      const categories = await getAllCategories();
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Service Error ${error.message} `});
  }
}

export default getCategories;