const express = require("express");

const SkateparkCtrl = require("../controllers/skatepark-ctrl");

const router = express.Router();

router.post("/skatepark", SkateparkCtrl.createSkatepark);
router.put("/skatepark/:id", SkateparkCtrl.updateSkatepark);
router.delete("/skatepark/:id", SkateparkCtrl.deleteSkatepark);
router.get("/skatepark/:id", SkateparkCtrl.getSkateparkById);
router.get("/skateparks", SkateparkCtrl.getSkateparks);

module.exports = router;
