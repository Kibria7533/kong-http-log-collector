const sql = require("./db.js");

// constructor
const Logs = function(logs) {
  this.host = logs.host ?? "";
  this.protocol = logs.protocol ?? "";
  this.port = logs.port ?? "";
  this.latencies_proxy = logs.latencies_proxy ?? "";
  this.latencies_request = logs.latencies_request ?? "";
  this.latencies_kong = logs.latencies_kong ?? "";
  this.request_uri = logs.request_uri ?? "";
  this.request_method = logs.request_method ?? "";
  this.request_full_url = logs.request_full_url ?? "";
  this.response_status = logs.response_status ?? "";
  this.upstream_uri = logs.upstream_uri ?? "";
  this.time = logs.time ?? "";
};

Logs.create = (Logs, result) => {
  sql.query("INSERT INTO logs SET ?", Logs, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created logs: ", { id: res.insertId, ...Logs });
    result(null, { id: res.insertId, ...Logs });
  });
};


Logs.getAll = ( result) => {
  let query = "SELECT * FROM logs";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("logs: ", res);
    result(null, res);
  });
};



module.exports = Logs;
