import request from "supertest";
import app from "../src/app";
import { describe, test, expect, afterAll } from "vitest";
import { userMock, userUpdateMock } from "../src/mock/users";

describe("user controller", () => {
  // GET
  describe("GET /user", () => {
    test("should return all users", async () => {
      const response = await request(app).get("/api/users").expect(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /users/:id", () => {
    test("should return a user by id", async () => {
      const userId = 2;
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);        
      expect(response.body).toEqual(userMock);
    });

    test("should return 404 if user not found", async () => {
      const userId = 100;
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    test("should return 400 if invalid user id", async () => {
      const userId = "invalid";
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(400);
      expect(response.body).toEqual({ message: "Invalid user id" });
    });
  });

  // POST
  describe("POST /users", () => {
    test("should create a new user", async () => {
      const body = {
        id: 4,
        name: "Mario3",
        email: "mario3@example.com",
        payments: [],
      };
      const response = await request(app).post("/api/users").send(body);
      expect(response.status).toBe(201);
    });

    test("should return 409 if user already exists", async () => {
      const body = {
        id: 2,
        name: "Mario3",
        email: "mario3@example.com",
        payments: [],
      };
      const response = await request(app)
        .post("/api/users")
        .send(body)
        .expect(409);
      expect(response.body).toEqual({ message: "User already exists" });
    });
  });

  // PATCH
  describe("PATCH /users/:id", () => {
    test("should update a user by id", async () => {
      const userId = 2;
      const body = {
        id: 2,
        name: "pepe",
        email: "pepe@example.com",
      };
      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .send(body)
        .expect(200);
      expect(response.body).toEqual(userUpdateMock);
    });

    test("should return 404 if user not found", async () => {
      const userId = 100;
      const body = {
        id: 2,
        name: "Mario3",
        email: "mario3@example.com",
        payments: [],
      };
      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .send(body)
        .expect(404);
      expect(response.body).toEqual({ message: "User not found" });
    });
  });
});
