const Logs = require("../models/log.model.js");

// Create and Save a new Logs
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const currentDate = new Date();
    const currentDateTimeUTC = currentDate.toISOString().replace("Z", "+00:00");
    const currentTimeUTC = currentDate.toISOString().slice(11, 19);
    const routeData=req.body.route;
    const serviceData=req.body.service;
    const latencieData=req.body.latencies;
    const requestData=req.body.request;
    const responseData=req.body.response;
    const upstreamData=req.body.upstream_uri;
    console.log("routeData",req.body)

    // Create a Logs
    const logs = new Logs({
        host: serviceData?.host ?? "",
        protocol: serviceData?.protocol ?? "",
        port: serviceData?.port ?? 0,
        latencies_proxy: latencieData?.proxy ?? 0,
        latencies_request: latencieData?.request ?? 0,
        latencies_kong: latencieData?.kong ?? 0,
        request_uri: requestData?.uri ?? "",
        request_method: requestData?.method ?? "",
        request_full_url: requestData?.url ?? "",
        response_status: responseData?.status ?? "",
        upstream_uri: upstreamData ?? "",
        time: currentTimeUTC
    });

    // Save Logs in the database
    Logs.create(logs, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Logs."
            });
        else res.send(data);
    });
};

// Retrieve all logs from the database (with condition).
exports.findAll = (req, res) => {

    Logs.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logs."
            });
        else res.send(data);
    });
};


