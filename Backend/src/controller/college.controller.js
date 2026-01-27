import { createCollege, deleteCollege, getAllColleges, updateCollege } from "../services/college.service.js";


export async function addCollege(req, res) {
  await createCollege(req.body);
  res.json({ success: true, message: "College added" });
}

export async function getColleges(req, res) {
  const data = await getAllColleges();
  res.json({ success: true, data });
}

export async function editCollege(req, res) {
  await updateCollege(req.params.id, req.body);
  res.json({ success: true, message: "College updated" });
}

export async function removeCollege(req, res) {
  await deleteCollege(req.params.id);
  res.json({ success: true, message: "College deleted" });
}
