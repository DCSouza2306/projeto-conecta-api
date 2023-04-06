import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createBooks } from "../factories/books-factory";

beforeAll(async () => {
 await init();
});

beforeEach(async () => {
 await cleanDb();
});

const server = supertest(app);

describe("GET /books", () => {
 it("Should response with status 400 if query params are invalid", async () => {
  const response = await server.get("/books?offset=-1");

  expect(response.status).toBe(httpStatus.BAD_REQUEST);
 });

 it("Shoul response with status 200 and book data", async () => {
  await createBooks();
  const response = await server.get("/books");
  expect(response.status).toBe(httpStatus.OK);
 });
});

describe("GET /books/count", () => {
 it("Should response with status 200", async () => {
  const response = await server.get("/books/count");

  expect(response.status).toBe(httpStatus.OK);
 });
});

describe("GET /books/:bookId", () => {
 it("Should response with status 404 if given id is not valid", async () => {
  const response = await server.get("/books/0");
  expect(response.status).toBe(httpStatus.NOT_FOUND);
 });

 it("Should response with status 200 and book infos", async () => {
    const book = await createBooks()
  const response = await server.get(`/books/${book.id}`);
  expect(response.status).toBe(httpStatus.OK)
  expect(response.body).toEqual({
    id: book.id,
        title: book.title,
        synopsis: book.synopsis,
        urlImage: book.urlImage,
        author: expect.any(String),
        CurrentReadings: expect.any(Array),
        NextReadings: expect.any(Array)
  });
 });
});
