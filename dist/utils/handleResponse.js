"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const handleResponse = (req, res, response) => {
    const responsePayload = {
        status: res.statusCode,
        metadata: {
            endpoint: req.originalUrl,
            method: req.method,
        },
        data: [],
    };
    if (response && typeof response === 'object' && 'error' in response && response.error) {
        responsePayload.error = response.error;
    }
    else {
        responsePayload.data = response;
    }
    if (Array.isArray(response))
        responsePayload.metadata.count = response.length;
    res.status(res.statusCode);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return responsePayload;
};
exports.handleResponse = handleResponse;
