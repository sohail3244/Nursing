import { db } from "../database/db.js";
import { eq } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";

/* ================================
   ➕ ADD COLLEGE
================================ */
export const addCollege = async (req, res) => {
  try {
    const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const gallery = req.files?.gallery?.map(f => f.filename) || [];

   const data = {
  name: req.body.name,
  code: req.body.code,
  description: req.body.description,
  sector: req.body.sector,
  establishedYear: Number(req.body.establishedYear),
  genderAcceptance: req.body.genderAcceptance,
  state: req.body.state,
  district: req.body.district,
  city: req.body.city,
  address: req.body.address,
  googleMapLink: req.body.googleMapLink,
  affiliation: req.body.affiliation,
  approvedBy: req.body.approvedBy,
  coursesCount: Number(req.body.coursesCount),
  experienceYears: Number(req.body.experienceYears),

  facilities: JSON.stringify(
    JSON.parse(req.body.facilities || "[]")
  ),

  thumbnail,
  gallery: JSON.stringify(gallery),
};


    await db.insert(collegesTable).values(data);

    res.json({
      success: true,
      message: "College added successfully",
    });

  } catch (error) {
    console.error("COLLEGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ================================
   📄 GET ALL COLLEGES
================================ */
export const getColleges = async (req, res) => {
  try {
    const colleges = await db.select().from(collegesTable);

    res.json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   📄 GET SINGLE COLLEGE
================================ */
export const getCollegeById = async (req, res) => {
  try {
    const [college] = await db
      .select()
      .from(collegesTable)
      .where(eq(collegesTable.id, req.params.id));

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   ✏️ UPDATE COLLEGE
================================ */
export const editCollege = async (req, res) => {
  try {
    const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const gallery =
      req.files?.gallery?.map((img) => img.filename) || [];

    const updatedData = {
      ...req.body,
      ...(thumbnail && { thumbnail }),
      ...(gallery.length && { gallery }),
      ...(req.body.facilities && {
        facilities: req.body.facilities
  ? JSON.parse(req.body.facilities)
  : [],

gallery: req.files?.gallery?.map(f => f.filename) || [],
      }),
    };

    await db
      .update(collegesTable)
      .set(updatedData)
      .where(eq(collegesTable.id, req.params.id));

    res.json({
      success: true,
      message: "College updated successfully",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   ❌ DELETE COLLEGE
================================ */
export const deleteCollege = async (req, res) => {
  try {
    await db
      .delete(collegesTable)
      .where(eq(collegesTable.id, req.params.id));

    res.json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
