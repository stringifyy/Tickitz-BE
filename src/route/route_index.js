const express = require("express");
const router = express();

//import route mvp
const authRoute = require("./route_auth");
const moviesRoute = require("./route_movies");
const cinemaRoute = require("./route_cinema");
const historyRoute = require("./route_history.js");
// end

router.get("/", (req, res) => {
  return res.send("Backend for tickitz");
});

// route.use("/apa", panggil inisial importnya)
router.use("/auth", authRoute);
router.use("/movies", moviesRoute);
router.use("/cinema", cinemaRoute);
router.use("/history", historyRoute);
//end

module.exports = router;
