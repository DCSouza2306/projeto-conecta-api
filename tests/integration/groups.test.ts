import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { createGroup } from "../factories/groups-factory";
import { cleanDb } from "../helpers";

beforeAll(async () => {
 await init();
});

beforeEach(async () => {
 await cleanDb();
});

const server = supertest(app);

describe("GET /group", () => {
 it("Should response with status 200", async () => {
  const response = await server.get("/group");

  expect(response.status).toBe(httpStatus.OK);
 });
});

describe("GET /group/:groupId", () => {
 it("Should response with status 404 when given id is not valid", async () => {
  const response = await server.get("/group/0");

  expect(response.status).toBe(httpStatus.NOT_FOUND);
 });

 it("Should response with status 200 and group infos", async () => {
  const group = await createGroup();
  const response = await server.get(`/group/${group.id}`);
  expect(response.status).toBe(httpStatus.OK);
  expect(response.body).toEqual({
   id: group.id,
   name: group.name,
   about: group.about,
   description: group.description,
   urlImage: group.urlImage,
   status: group.status,
   Members: expect.any(Array),
   NextReadings: expect.any(Array),
   CurrentReading: expect.any(Object),
   Meeting: expect.any(Object),
   Links: expect.any(Array),
  });
 });
});
