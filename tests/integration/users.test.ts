import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import faker from "@faker-js/faker";
import { createUser } from "../factories/users-factory";
import { duplicatedUserOrEmail } from "../../src/services/user-service/errors";

beforeAll(async () => {
 await init();
});

beforeEach(async () => {
    await cleanDb()
})

const server = supertest(app);

describe("POST /user/sign-up", () => {
 it("Should response with 400 when body is not given", async () => {
  const response = await server.post("/user/sign-up");

  expect(response.status).toBe(httpStatus.BAD_REQUEST);
 });

 it("Should response with 400 when body is not valid", async () => {
const invalidBody = {[faker.lorem.word()]: faker.lorem.word()}

  const response = await server.post("/user/sign-up").send(invalidBody);

  expect(response.status).toBe(httpStatus.BAD_REQUEST);
 });

 describe("when body is valid", () => {
    const generateValidBody = () => ({
        userName: faker.lorem.word(6),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        urlImage: faker.internet.avatar()
    })
    it("Should response with status 409 when email or user name is already registred", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/user/sign-up").send(body);
        expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("Should response with status 201 and create user when email and user name is valid", async () =>{
        const body = generateValidBody();

        const response = await server.post("/user/sign-up").send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
            id: expect.any(Number),
            user: body.userName
        })
    })
 })
});
