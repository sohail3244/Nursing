import {
  createCollegeService,
  getAllCollegesService,
  updateCollegeService,
  deleteCollegeService,
  getCollegeByIdService,
  getCollegeCoursesService,
} from "../services/college.service.js";

import { createAuditLog } from "../services/audit.service.js";

/* ================================
   ➕ CREATE COLLEGE
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
      : facilities?.split(",").map(f => f.trim());

    const parsedCourseIds = courseIds
      ? Array.isArray(courseIds)
        ? courseIds
        : JSON.parse(courseIds)
      : [];

    const college = await createCollegeService({
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

    // ✅ AUDIT
    await createAuditLog({
      action: "CREATE",
      module: "College",
      description: `College created: ${name}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({
      success: true,
      message: "College created successfully",
      data: college,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   📄 GET ALL COLLEGES
================================ */
export const getColleges = async (req, res) => {
  try {
    const colleges = await getAllCollegesService();
    res.json({ success: true, data: colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   📄 GET SINGLE COLLEGE
================================ */
export const getCollegeById = async (req, res) => {
  try {
    const college = await getCollegeByIdService(req.params.id);
    if (!college)
      return res.status(404).json({ success: false, message: "College not found" });

    res.json({ success: true, data: college });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    if (req.body.facilities) {
      updatedData.facilities = Array.isArray(req.body.facilities)
        ? req.body.facilities
        : req.body.facilities.split(",").map(f => f.trim());
    }

    if (req.body.courseIds) {
      updatedData.courseIds = JSON.parse(req.body.courseIds);
    }

    await updateCollegeService(req.params.id, updatedData);

    await createAuditLog({
      action: "UPDATE",
      module: "College",
      description: `College updated (ID: ${req.params.id})`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "College updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   ❌ DELETE COLLEGE
================================ */
export const deleteCollege = async (req, res) => {
  try {
    await deleteCollegeService(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "College",
      description: `College deleted (ID: ${req.params.id})`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   🎓 GET COLLEGE COURSES
================================ */
export const getCollegeCourses = async (req, res) => {
  try {
    const courses = await getCollegeCoursesService(req.params.id);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
