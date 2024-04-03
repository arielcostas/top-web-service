# Top Web Service

An implementation of a REST GET endpoint implementing proper caching and rate limiting from scratch.

## Usage

Using node and npm, install the dependencies:

```bash
npm install
```

Then, start the server:

```bash
npm run serve
```

The server will start on port 3000 by default, unless a `PORT` environment variable is set.
You can then query the server using curl or a browser:

```http
GET http://localhost:3000/weather/Sabadell
```

You can 

## Requirements

- [X] Returns an object with a random weather report for a city
- [X] The weather report is randomly generated every 30 seconds (it is generated if the last one is older than 30 seconds)
- [X] Response caching
	- [X] A hash of the report is provided in the response (`ETag` header)
	- [X] The `If-None-Match` header is used to check if the client has the latest version
	- [X] If the client has the latest version, a `304 Not Modified` response is returned instead of the report
	- [X] The last report generation time is provided in the response (`Last-Modified` header)
	- [X] The `If-Modified-Since` header is used to check if the client has the latest version
	- [X] If the client has the latest version, a `304 Not Modified` response is returned instead of the report
- [X] If a city doesn't exist, a `404 Not Found` response is returned
- [ ] Format support
	- [ ] The response format can be specified using the `Accept` header
	- [ ] A `406 Not Acceptable` response is returned if the requested format is not supported
	- [X] A JSON response is returned when `application/json` is requested
	- [X] A `application/problem+json` response is returned if there's an error and JSON is requested, as per [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457)
	- [ ] A XML response is returned when `application/xml` is requested
	- [X] A plain text response is returned when `text/plain` is requested
- [ ] Rate limiting
	- [ ] A `429 Too Many Requests` response is returned if the client has exceeded the rate limit
	- [ ] The rate limit is 5 requests per minute
	- [ ] The rate limit is per client IP
	- [ ] The rate limit is reset every minute
- [ ] Language variation
	- [ ] The response language can be specified using the `Accept-Language` header
	- [ ] English, Spanish, Catalan and Galician are supported
	- [ ] The response language is provided in the response (`Content-Language` header)
	- [ ] A `406 Not Acceptable` response is returned if the requested language is not supported

## Implementation Details

### MD-5 ETag generation

An MD-5 hash of the weather report is used as the ETag value. While MD-5 is not considered secure for cryptographic, we use it to generate a short hash that can be used to check if the report has changed.

## License

This project is provided under the BSD 3-Clause licence, because it's not a production-ready implementation and it's meant to be used as a learning resource.

You can do whatever you want with this code, but you can't hold me responsible for any damage it may cause, and you can't use my name to promote any derivative work.
