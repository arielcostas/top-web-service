import test from "node:test";
import { parseAcceptHeader } from "../src/parsers/accept";
import { SerializationFormat } from "../src/models/serializationFormat";
import assert from "node:assert";

test("passing xml returns xml", (t) => {
	assert.strictEqual(parseAcceptHeader("application/xml"), SerializationFormat.Xml);
});

test("passing text/plain returns text/plain", (t) => {
	assert.strictEqual(parseAcceptHeader("text/plain"), SerializationFormat.Plain);
});

test("passing application/json returns application/json", (t) => {
	assert.strictEqual(parseAcceptHeader("application/json"), SerializationFormat.Json);
});

test("passing application/json, application/xml returns application/json", (t) => {
	assert.strictEqual(parseAcceptHeader("application/json, application/xml"), SerializationFormat.Json);
});

test("Accept: text/plain;q=0.5, text/html, application/json;q=0.8, application/xml;q=0.7", (t) => {
	assert.strictEqual(parseAcceptHeader("text/plain;q=0.5, text/html, application/json;q=0.8, application/xml;q=0.7"), SerializationFormat.Json);
});

test("Accept: application/xml;q=0.7, application/json;q=0.8,*/*;q=0.1", (t) => {
	assert.strictEqual(parseAcceptHeader("application/xml;q=0.7, application/json;q=0.8,*/*;q=0.1"), SerializationFormat.Json);
});