/**
 * about swagger
 */

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
            securityDefinitions: [],
            definitions: {},
            externalDocs: {},
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
        if (dbResponse.default) {
            statusObj['default'] = dbResponse.default;
        }

        statusObj['schema'] = dbResponse.dataSchema;
        statusObj['headers'] = dbResponse.headers;

        obj[dbResponse.httpCode] = statusObj;
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
