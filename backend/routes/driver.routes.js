const express  = require("express");
const router   = express.Router();
const ctrl     = require("../controllers/driver.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const { upload } = require("../middleware/upload.middleware");

router.post("/register",               protect, upload.single("licensePhoto"), ctrl.registerDriver);
router.get ("/profile",                protect, ctrl.getDriverProfile);
router.get ("/profile/:userId",        ctrl.getDriverProfile);
router.put ("/profile",                protect, ctrl.updateDriverProfile);
router.post("/vehicle",                protect, upload.single("photo"), ctrl.addVehicle);
router.put ("/vehicle/:vehicleId",     protect, ctrl.updateVehicle);
router.get ("/earnings",               protect, ctrl.getEarnings);
router.put ("/toggle-availability",    protect, ctrl.toggleAvailability);
router.put ("/location",               protect, ctrl.updateLocation);

module.exports = router;