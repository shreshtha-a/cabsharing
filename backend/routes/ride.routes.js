const express  = require("express");
const router   = express.Router();
const ctrl     = require("../controllers/ride.controller");
const { protect } = require("../middleware/auth.middleware");

router.get  ("/",              ctrl.getRides);
router.get  ("/my-rides",      protect, ctrl.getMyRides);
router.post ("/",              protect, ctrl.createRide);
router.get  ("/:id",           ctrl.getRide);
router.put  ("/:id",           protect, ctrl.updateRide);
router.put  ("/:id/cancel",    protect, ctrl.cancelRide);
router.put  ("/:id/start",     protect, ctrl.startRide);
router.put  ("/:id/complete",  protect, ctrl.completeRide);

module.exports = router;