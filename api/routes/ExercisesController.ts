import { Router } from "express";
import { session } from "../utils/ssh";
import userFolderExist from "../exercises/user-folder-exist";
import connectToHost from "../exercises/connect-to-host";

const TESTS_STEPS = [
  userFolderExist,
  connectToHost
]

const ExercisesController = Router();
ExercisesController.post('/verify', async function(req, res) {
  const { host, username } = req.body;
  const getResults = async () => {
    const results = await session(host, username)
      .then((el) => {
        return TESTS_STEPS.map(async (test) => {
          return await test(el);
        });
      })
      .catch((err) => {
        return []
      });

    const resolvedResults = Promise.all(results)
    return resolvedResults;
  };

  console.log(`Request for ${host}:${username}`)

  const results = await getResults();

  res.json({
    score: results.filter((el) => el.passed).length,
    tests: results.length ? results : 'Cannot connect to host'
  })
});

export default  ExercisesController