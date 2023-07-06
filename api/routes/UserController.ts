import { Router } from "express";

const UserController = Router();
UserController.get('/link', function(req, res) {
  res.send("Envoi d'un magic link lol");
});

export default  UserController