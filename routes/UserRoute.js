import express from "express";
import { getUsers } from "../controller/UsersController.js";

const Router = express.Router();

Router.get("/api/users", getUsers);

export default Router;
