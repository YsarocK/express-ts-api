import { Router } from "express";

const StepsController = Router();
StepsController.get('/', function(req, res) {
  res.send("Vérification des étapes");
});

export default  StepsController