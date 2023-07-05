import { Router } from "express";
import sshConnexion from "../exercices/ssh-connexion";

const ExercisesController = Router();
ExercisesController.post('/verify', async function(req, res) {
  res.send(await sshConnexion(req.body.host, req.body.username))
});

export default  ExercisesController