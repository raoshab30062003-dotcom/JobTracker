
const ApplicationModel = require("../Models/ApplicationModel");

// GET all applications
const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications =
      await ApplicationModel.getAllApplications(userId);

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

// GET one application
const getApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const application =
      await ApplicationModel.getApplicationById(id, userId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

// CREATE application
const createApplication = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      company,
      position,
      location,
      jobType,
      status,
      appliedDate,
      notes,
    } = req.body;

    if (
      typeof company !== "string" ||
      typeof position !== "string" ||
      !company.trim() ||
      !position.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Company and position are required",
      });
    }

    const application = {
      company: company.trim(),
      position: position.trim(),
      location,
      jobType,
      status: status || "Applied",
      appliedDate,
      notes,
    };

    const applicationId =
      await ApplicationModel.createApplication(userId, application);

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      id: applicationId,
    });
  } catch (error) {
    console.error("Create application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create application",
    });
  }
};

// UPDATE application
const editApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const {
      company,
      position,
      location,
      jobType,
      status,
      appliedDate,
      notes,
    } = req.body;

    if (
      typeof company !== "string" ||
      typeof position !== "string" ||
      !company.trim() ||
      !position.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Company and position are required",
      });
    }

    const application = {
      company: company.trim(),
      position: position.trim(),
      location,
      jobType,
      status,
      appliedDate,
      notes,
    };

    const affectedRows =
      await ApplicationModel.updateApplication(id, userId, application);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error("Update application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};

// DELETE application
const removeApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const affectedRows =
      await ApplicationModel.deleteApplication(id, userId);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  editApplication,
  removeApplication,
};
