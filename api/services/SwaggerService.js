/**
 * about swagger
 */

const checkTypes = require('check-types');

module.exports = {


    /**
     * @param project
     * @param paths
     */
    convertToSwaggerObj: function(project, paths) {

        var swagger = {
            swagger: '2.0',
            info: project.info,
            host: project.host,
            basePath: project.basePath,
            tags: [],
            schemes: project.schemes,
            securityDefinitions: {},
            //definitions: {},
            //externalDocs: {},
            paths: {}
        };

        var swaggerPaths = {};
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var pathObj = {};
            pathObj['tags'] = path.tags;
            pathObj['summary'] = path.summary;
            pathObj['description'] = path.description;
            pathObj['operationId'] = path.operationId;
            pathObj['consumes'] = path.consumes;
            pathObj['produces'] = path.produces;
            pathObj['deprecated'] = path.deprecated;
            //pathObj['definitions'] = {};
            pathObj['parameters'] = convertParameters(path.parameters);
            pathObj['responses'] = convertResponses(path.responses);

            swaggerPaths[path.path] = {};
            swaggerPaths[path.path][path.method.toLowerCase()] = pathObj;

        }

        swagger['paths'] = swaggerPaths;
        return swagger;

    },


};

function convertResponses(dbPathResponses) {

    if (!dbPathResponses || dbPathResponses.length < 1) {
        return [];
    }

    var obj = {};
    for (var i = 0; i < dbPathResponses.length; i++) {
        var dbResponse = dbPathResponses[i];
        var statusObj = {};
        statusObj['description'] = dbResponse.description;
         //statusObj['default'] = dbResponse.default;
        if (dbResponse.dataSchema.properties) {
            statusObj['schema'] = dbResponse.dataSchema;
        }
        if (dbResponse.headers.length > 0) {
            statusObj['headers'] = convertHeaders(dbResponse.headers);
        }

        obj[dbResponse.httpCode] = statusObj;
    }
    return obj;

}

function convertHeaders(dbResponseHeaders) {
    if (!dbResponseHeaders || dbResponseHeaders.length < 1) {
        return [];
    }

    var obj = {};
    for (var i = 0; i < dbResponseHeaders.length; i++) {
        var item = dbResponseHeaders[i];
        obj[item.name] = {
            type: item.type,
            description: item.description,
            format: item.format
        };

    }
    return obj;
}

function convertParameters(dbPathParameters) {

    if (!dbPathParameters || dbPathParameters.length < 1) {
        return [];
    }

    return dbPathParameters.map(function(param) {
        return {
            name: param.name,
            in : param.in,
            description: param.description,
            required: param.required,
            type: param.type,
            format: param.format
        };

    });


}
