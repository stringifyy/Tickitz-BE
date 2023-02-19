const express = require("express");
const router = express();

//import route mvp
const authRoute = require("./route_auth");
const moviesRoute = require("./route_movies");
const cinemaRoute = require("./route_cinema");
const historyRoute = require("./route_history.js");
const seatsLeftRoute = require("./route_seatsLeft.js");
const seatsRightRoute = require("./route_seatsRight");
// end

router.get("/", (req, res) => {
  return res.send("Backend for tickitz");
});

// route.use("/apa", panggil inisial importnya)
router.use("/auth", authRoute);
router.use("/movies", moviesRoute);
router.use("/cinema", cinemaRoute);
router.use("/history", historyRoute);
router.use("/seats_left", seatsLeftRoute);
router.use("/seats_right", seatsRightRoute);
//end

module.exports = router;
