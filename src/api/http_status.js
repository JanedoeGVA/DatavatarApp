/**
 * 200 Created, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">HTTP/1.1 documentation</a>}.
 */
export const OK = { statusCode: 200, reasonPhrase: 'OK' };
/**
 * 201 Created, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.2">HTTP/1.1 documentation</a>}.
 */
export const CREATED = { statusCode: 201, reasonPhrase: 'Created' };
/**
 * 202 Accepted, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.3">HTTP/1.1 documentation</a>}.
 */
export const ACCEPTED = { statusCode: 202, reasonPhrase: 'Accepted' };
/**
 * 204 No Content, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.5">HTTP/1.1 documentation</a>}.
 */
export const NO_CONTENT = { statusCode: 204, reasonPhrase: 'No Content' };
/**
 * 205 Reset Content, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.6">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const RESET_CONTENT = { statusCode: 205, reasonPhrase: 'Reset Content' };
/**
 * 206 Reset Content, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.7">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const PARTIAL_CONTENT = {
  statusCode: 206,
  reasonPhrase: 'Partial Content'
};
/**
 * 301 Moved Permanently, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.2">HTTP/1.1 documentation</a>}.
 */
export const MOVED_PERMANENTLY = {
  statusCode: 301,
  reasonPhrase: 'Moved Permanently'
};
/**
 * 302 Found, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.3">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const FOUND = { statusCode: 302, reasonPhrase: 'Found' };
/**
 * 303 See Other, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.4">HTTP/1.1 documentation</a>}.
 */
export const SEE_OTHER = { statusCode: 303, reasonPhrase: 'See Other' };
/**
 * 304 Not Modified, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.5">HTTP/1.1 documentation</a>}.
 */
export const NOT_MODIFIED = { statusCode: 304, reasonPhrase: 'Not Modified' };
/**
 * 305 Use Proxy, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.6">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const USE_PROXY = { statusCode: 305, reasonPhrase: 'Use Proxy' };
/**
 * 307 Temporary Redirect, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.8">HTTP/1.1 documentation</a>}.
 */
export const TEMPORARY_REDIRECT = {
  statusCode: 307,
  reasonPhrase: 'Temporary Redirect'
};
/**
 * 400 Bad Request, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">HTTP/1.1 documentation</a>}.
 */
export const BAD_REQUEST = { statusCode: 400, reasonPhrase: 'Bad Request' };
/**
 * 401 Unauthorized, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2">HTTP/1.1 documentation</a>}.
 */
export const UNAUTHORIZED = { statusCode: 401, reasonPhrase: 'Unauthorized' };
/**
 * 402 Payment Required, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.3">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const PAYMENT_REQUIRED = {
  statusCode: 402,
  reasonPhrase: 'Payment Required'
};
/**
 * 403 Forbidden, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">HTTP/1.1 documentation</a>}.
 */
export const FORBIDDEN = { statusCode: 403, reasonPhrase: 'Forbidden' };
/**
 * 404 Not Found, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">HTTP/1.1 documentation</a>}.
 */
export const NOT_FOUND = { statusCode: 404, reasonPhrase: 'Not Found' };
/**
 * 405 Method Not Allowed, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.6">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const METHOD_NOT_ALLOWED = {
  statusCode: 405,
  reasonPhrase: 'Method Not Allowed'
};
/**
 * 406 Not Acceptable, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">HTTP/1.1 documentation</a>}.
 */
export const NOT_ACCEPTABLE = {
  statusCode: 406,
  reasonPhrase: 'Not Acceptable'
};
/**
 * 407 Proxy Authentication Required, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.8">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const PROXY_AUTHENTICATION_REQUIRED = {
  statusCode: 407,
  reasonPhrase: 'Proxy Authentication Required'
};
/**
 * 408 Request Timeout, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.9">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const REQUEST_TIMEOUT = {
  statusCode: 408,
  reasonPhrase: 'Request Timeout'
};
/**
 * 409 Conflict, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">HTTP/1.1 documentation</a>}.
 */
export const CONFLICT = { statusCode: 409, reasonPhrase: 'Conflict' };
/**
 * 410 Gone, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.11">HTTP/1.1 documentation</a>}.
 */
export const GONE = { statusCode: 410, reasonPhrase: 'Gone' };
/**
 * 411 Length Required, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.12">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const LENGTH_REQUIRED = {
  statusCode: 411,
  reasonPhrase: 'Length Required'
};
/**
 * 412 Precondition Failed, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.13">HTTP/1.1 documentation</a>}.
 */
export const PRECONDITION_FAILED = {
  statusCode: 412,
  reasonPhrase: 'Precondition Failed'
};
/**
 * 413 Request Entity Too Large, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.14">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const REQUEST_ENTITY_TOO_LARGE = {
  statusCode: 413,
  reasonPhrase: 'Request Entity Too Large'
};
/**
 * 414 Request-URI Too Long, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.15">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const REQUEST_URI_TOO_LONG = {
  statusCode: 414,
  reasonPhrase: 'Request-URI Too Long'
};
/**
 * 415 Unsupported Media Type, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.16">HTTP/1.1 documentation</a>}.
 */
export const UNSUPPORTED_MEDIA_TYPE = {
  statusCode: 415,
  reasonPhrase: 'Unsupported Media Type'
};
/**
 * 416 Requested Range Not Satisfiable, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.17">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const REQUESTED_RANGE_NOT_SATISFIABLE = {
  statusCode: 416,
  reasonPhrase: 'Requested Range Not Satisfiable'
};
/**
 * 417 Expectation Failed, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.18">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const EXPECTATION_FAILED = {
  statusCode: 417,
  reasonPhrase: 'Expectation Failed'
};
/**
 * 500 Internal Server Error, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">HTTP/1.1 documentation</a>}.
 */
export const INTERNAL_SERVER_ERROR = {
  statusCode: 500,
  reasonPhrase: 'Internal Server Error'
};
/**
 * 501 Not Implemented, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const NOT_IMPLEMENTED = {
  statusCode: 501,
  reasonPhrase: 'Not Implemented'
};
/**
 * 502 Bad Gateway, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.3">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const BAD_GATEWAY = { statusCode: 502, reasonPhrase: 'Bad Gateway' };
/**
 * 503 Service Unavailable, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4">HTTP/1.1 documentation</a>}.
 */
export const SERVICE_UNAVAILABLE = {
  statusCode: 503,
  reasonPhrase: 'Service Unavailable'
};
/**
 * 504 Gateway Timeout, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.5">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const GATEWAY_TIMEOUT = {
  statusCode: 504,
  reasonPhrase: 'Gateway Timeout'
};
/**
 * 505 HTTP Version Not Supported, see {@link <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.6">HTTP/1.1 documentation</a>}.
 *
 * @since 2.0
 */
export const HTTP_VERSION_NOT_SUPPORTED = {
  statusCode: 505,
  reasonPhrase: 'HTTP Version Not Supported'
};
