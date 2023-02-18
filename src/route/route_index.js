const express = require("express");
const router = express();

//import route mvp
const authRoute = require("../route/route_auth");
const moviesRoute = require("../route/route_movies");
// end

router.get("/", (req, res) => {
  return res.send("Backend for tickitz");
});

// route.use("/apa", panggil inisial importnya)
router.use("/auth", authRoute);
router.use("/movies", moviesRoute);
//end

module.exports = router;
