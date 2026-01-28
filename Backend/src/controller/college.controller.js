import {
  createCollege,
  deleteCollege,
  getAllColleges,
  updateCollege,
} from "../services/college.service.js";

export async function addCollege(req, res) {
  try {
    const image = req.file ? req.file.filename : null;

    await createCollege({
      ...req.body,
      image,
    });

    res.json({
      success: true,
      message: "College added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getColleges(req, res) {
  try {
    const data = await getAllColleges();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
    });
  }
}

export async function editCollege(req, res) {
  try {
    const image = req.file ? req.file.filename : null;

    await updateCollege(req.params.id, {
      ...req.body,
      ...(image && { image }),
    });

    res.json({
      success: true,
      message: "College updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeCollege(req, res) {
  try {
    await deleteCollege(req.params.id);

    res.json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
