module.exports = app => {
  const logs = require("../controllers/log.controller.js");

  var router = require("express").Router();

  // Create a new Logs
  router.post("/", logs.create);

  // Retrieve all Tutorials
  router.get("/", logs.findAll);

  app.use('/api', router);
};
