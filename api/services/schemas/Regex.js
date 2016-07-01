'use strict';

const NAME_PATTERN = '^[a-zA-Z]+([_-\.]*[a-zA-Z])*$';
const VERSION_PATTERN = '^\\d+\\.\\d+\\.\\d+$';
const GENERAL_URL_PATTERN_NO_PROTOCOL = '([^/\\n\\r\\s]+)(\\/([^\\?#\\n\\r\\s]+)?(\\?([^\\?#\\/\\n\\r\\s]+))?(#([^\\?#\\/\\n\\r\\s]+))?)*$';
const HTTP_URL_PATTERN = '^https?:\\/\\/' + GENERAL_URL_PATTERN_NO_PROTOCOL;
const ONLY_HTTPS_URL_PATTERN = '^https:\\/\\/' + GENERAL_URL_PATTERN_NO_PROTOCOL;
const MICROREST_URL_PATH_PATTERN = '^(\\/:?[a-zA-Z0-9_]+)+$';
const EMAIL_PATTERN = "^[a-zA-Z0-9]+(?:(\\.|_)[A-Za-z0-9!#$%&\\'*+\/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\\.[a-zA-Z0-9]*\\.[a-zA-Z0-9]*\\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";
const DIRECTORY_URL_PATTERN = '^directory:\\/\\/' + GENERAL_URL_PATTERN_NO_PROTOCOL;
const DIRECTORY_PATTERN = '^directory$' + '|' + DIRECTORY_URL_PATTERN + '|' + ONLY_HTTPS_URL_PATTERN;
const HTTP_METHOD_PATTERN = '^GET$|^HEAD$|^POST$|^PUT$|^DELETE$|^PATCH$';
const IN_URL_PARAMETER = '^query$|^path$';
const TYPE_URL_PARAMETER = '^string$|^integer$|^number$|^boolean$';
const BSON_ID = '^[0-9a-fA-F]{24}$';

/**
 * Regular Expressions to check:
 *   - The name of the api
 *   - The version of the api
 *   - URLs
 *   - URL Paths
 *   - Emails
 *   - Directories expressions
 *   - HTTP Methods
 *   - URL Parameters
 *
 * @public
 * @static
 * @readonly
 * @constant {Object}
 */
module.exports = {
    name: NAME_PATTERN,
    version: VERSION_PATTERN,
    httpUrl: HTTP_URL_PATTERN,
    urlPath: MICROREST_URL_PATH_PATTERN,
    email: EMAIL_PATTERN,
    directory: DIRECTORY_PATTERN,
    httpMethod: HTTP_METHOD_PATTERN,
    inUrlParameter: IN_URL_PARAMETER,
    typeUrlParameter: TYPE_URL_PARAMETER,
    bsonId: BSON_ID,
};
