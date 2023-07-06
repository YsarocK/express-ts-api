import { Router } from "express";
import { session } from "../utils/ssh";
import userFolderExist from "../exercises/user-folder-exist";
import connectToHost from "../exercises/connect-to-host";

const testsSteps = [
  userFolderExist,
  connectToHost
]

const ExercisesController = Router();
ExercisesController.post('/verify', async function(req, res) {
  const getResults = async () => {
    const results = await session(req.body.host, req.body.username)
      .then((el) => {
        return testsSteps.map(async (test) => {
          return await test(el);
        });
      })
      .catch((err) => {
        return []
      });

    const resolvedResults = Promise.all(results)
    return resolvedResults;
  };

  const results = await getResults();

  res.json({
    score: results.filter((el) => el.passed).length,
    tests: results.length ? results : 'Cannot connect to host'
  })
});

export default  ExercisesController