"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const errorsHandler = (err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Server Error');
};
exports.errorsHandler = errorsHandler;
