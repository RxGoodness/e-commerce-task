"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    let statusCode = err.http_code || res.statusCode || 500;
    if (statusCode == 200)
        statusCode = 500;
    let msg = err.message ? err.message.replaceAll('"', "") : err;
    if (err.message && err.message.includes("E11000")) {
        statusCode = 400;
        let dupKey = err.message.split("dup key: ")[1];
        msg = `${dupKey} field has to be unique`.replaceAll('"', "");
    }
    if (err.name === "ValidationError" && err.details) {
        statusCode = 400;
        msg = Object.values(err.details)
            .map((item) => item.message.replaceAll('"', ""))
            .join(" ");
    }
    res.status(statusCode).json({ msg });
};
exports.default = errorHandler;
