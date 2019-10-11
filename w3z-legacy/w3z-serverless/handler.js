"use strict";

module.exports.hello = function(event, context, callback) {
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "My Header Value"
        },
        body: JSON.stringify({ message: "Hello World!" })
    };

    callback(null, response);
};
