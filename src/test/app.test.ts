import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { app } from "../app";

import envVars from "../bin/config";

chai.use(chaiHttp);

describe("app endpoints", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(envVars.MONGODB_URL);
    } catch (e) {
      console.log(e);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const user = {
    name: "Bob",
    email: "tes13@gmail.com",
  };

  it("should return created invite", done => {
    chai
      .request(app)
      .post("/invite/create")
      .set({
        "content-type": "application/json",
      })
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.keys([
          "inviteeName",
          "inviteeEmail",
          "created",
          "createdBy",
          "status",
          "_id",
        ]);
        done();
      });
  });

  it("should return error if invite with given id doesnt exist", done => {
    chai
      .request(app)
      .get("/invite/decline?id=6294a3788cab28bf36347157")
      .set({
        "content-type": "application/json",
      })
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.text).to.eq("Invite was not found.");
        done();
      });
  });

  it("should return error if change url doesnt have id", done => {
    chai
      .request(app)
      .get("/invite/decline?id=")
      .set({
        "content-type": "application/json",
      })
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.text).to.eq("Invite id was not provided");
        done();
      });
  });
});
