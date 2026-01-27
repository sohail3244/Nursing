import { createLead, getLeads, deleteLead } from "../services/lead.service.js";

export const addLead = async (req, res) => {
  await createLead(req.body);

  res.json({
    success: true,
    message: "Lead added successfully",
  });
};

export const getAllLeads = async (req, res) => {
  const data = await getLeads();
  res.json({ success: true, data });
};

export const removeLead = async (req, res) => {
  await deleteLead(req.params.id);
  res.json({ success: true, message: "Lead deleted" });
};
