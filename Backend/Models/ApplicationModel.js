
const db = require("../config/db");

// Get all applications belonging to a user
const getAllApplications = async (userId) => {
  const [applications] = await db.execute(
    "SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );

  return applications;
};

// Get one application belonging to a user
const getApplicationById = async (id, userId) => {
  const [applications] = await db.execute(
    "SELECT * FROM applications WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return applications[0];
};

// Create application
const createApplication = async (userId, application) => {
  const {
    company,
    position,
    location,
    jobType,
    status,
    appliedDate,
    notes,
  } = application;

  const [result] = await db.execute(
    `INSERT INTO applications
    (user_id, company, position, location, job_type, status, applied_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      company,
      position,
      location || null,
      jobType || null,
      status || "Applied",
      appliedDate || null,
      notes || null,
    ]
  );

  return result.insertId;
};

// Update application
const updateApplication = async (id, userId, application) => {
  const {
    company,
    position,
    location,
    jobType,
    status,
    appliedDate,
    notes,
  } = application;

  const [result] = await db.execute(
    `UPDATE applications
     SET company = ?, position = ?, location = ?,
         job_type = ?, status = ?, applied_date = ?, notes = ?
     WHERE id = ? AND user_id = ?`,
    [
      company,
      position,
      location || null,
      jobType || null,
      status,
      appliedDate || null,
      notes || null,
      id,
      userId,
    ]
  );

  return result.affectedRows;
};

// Delete application
const deleteApplication = async (id, userId) => {
  const [result] = await db.execute(
    "DELETE FROM applications WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return result.affectedRows;
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
