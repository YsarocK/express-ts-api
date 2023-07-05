import { Router } from "express";

const UserController = Router();
UserController.get('/link', function(req, res) {
  res.send("Envoi d'un magic link");
});

export default  UserController