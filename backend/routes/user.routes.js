const express  = require("express");
const router   = express.Router();
const ctrl     = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload }  = require("../middleware/upload.middleware");

router.get   ("/profile",                    protect, ctrl.getProfile);
router.put   ("/profile",                    protect, upload.single("photo"), ctrl.updateProfile);
router.put   ("/change-password",            protect, ctrl.changePassword);
router.get   ("/stats",                      protect, ctrl.getStats);
router.post  ("/emergency-contacts",         protect, ctrl.addEmergencyContact);
router.delete("/emergency-contacts/:contactId", protect, ctrl.removeEmergencyContact);
router.put   ("/deactivate",                 protect, ctrl.deactivateAccount);

module.exports = router;
