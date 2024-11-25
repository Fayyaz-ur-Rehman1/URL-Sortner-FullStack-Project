const express = require("express");
const { handleGenrateNewUrls, redirectUrlWtihShortId, handleGetAnalytics } = require("../controllers/url")
const router = express.Router();


router.post("/", handleGenrateNewUrls);
router.get("/:shortId", redirectUrlWtihShortId);
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;