
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getApplications,
  getApplication,
  createApplication,
  editApplication,
  removeApplication,
} = require("../controllers/ApplicationController");

// All routes below require authentication
router.use(authMiddleware);

router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.put("/:id", editApplication);
router.delete("/:id", removeApplication);

module.exports = router;
