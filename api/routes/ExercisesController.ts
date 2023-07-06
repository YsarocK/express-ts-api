import { Router } from "express";
import { session } from "../utils/ssh";
import userFolderExist from "../exercises/user-folder-exist";

const testsSteps = [
  userFolderExist,
]

const ExercisesController = Router();
ExercisesController.post('/verify', async function(req, res) {
  const tests = () => session(req.body.host, req.body.username)
    .then((el) => {
      return testsSteps.map(async (test) => {
        return await test(el)
      })
    })
    .catch((err) => {
      return 'Cannot connect to host'
    })

  res.json({
    score: 0,
    tests: tests
  })
});

export default  ExercisesController