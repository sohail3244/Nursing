import { db } from "../database/db.js";
import { eq, inArray } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";
import { coursesTable } from "../models/course.schema.js";


/* ================================
   ➕ ADD COLLEGE
================================ */
export const addCollege = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      sector,
      genderAcceptance,
      establishedYear,
      state,
      district,
      city,
      address,
      googleMapLink,
      affiliation,
      approvedBy,
      coursesCount,
      experienceYears,
      facilities,
       courseIds,
       studentsCount,
  youtubeVideo,
    } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const gallery = req.files?.gallery?.map(f => f.filename) || [];

    const facilitiesArray = Array.isArray(facilities)
  ? facilities
  : facilities
      ?.split(",")
      .map(f => f.trim())
      .filter(Boolean);


       const parsedCourseIds = courseIds
      ? Array.isArray(courseIds)
        ? courseIds
        : JSON.parse(courseIds)
      : [];

    await db.insert(collegesTable).values({
      name,
      code,
      description,
      sector,
      genderAcceptance,
      establishedYear,
      state,
      district,
      city,
      address,
      googleMapLink,
      affiliation,
      approvedBy,
      coursesCount,
      experienceYears,
      facilities: facilitiesArray,
      courseIds: parsedCourseIds, 
      thumbnail,
      gallery,
      studentsCount,
      youtubeVideo,
    });

    res.status(201).json({
      success: true,
      message: "College created successfully",
    });

  } catch (error) {
    console.error("CREATE COLLEGE ERROR:", error);
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
    const gallery = req.files?.gallery?.map(f => f.filename) || [];

    const updatedData = {
      ...req.body,
      ...(thumbnail && { thumbnail }),
      ...(gallery.length && { gallery }),
    };

    // ✅ handle facilities
    if (req.body.facilities) {
  updatedData.facilities = Array.isArray(req.body.facilities)
    ? req.body.facilities
    : req.body.facilities
        .split(",")
        .map(f => f.trim())
        .filter(Boolean);
}


    // ✅ handle courseIds
    if (req.body.courseIds) {
      updatedData.courseIds = JSON.parse(req.body.courseIds);
    }

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

export const getCollegeCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const [college] = await db
      .select()
      .from(collegesTable)
      .where(eq(collegesTable.id, id));

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    const courseIds =
  typeof college.courseIds === "string"
    ? JSON.parse(college.courseIds)
    : college.courseIds || [];

    if (!courseIds.length) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.id, courseIds)); // ✅ NOW WORKS

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("GET COLLEGE COURSES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};