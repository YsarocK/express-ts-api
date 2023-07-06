import { ExerciceResultType } from "../types/ExerciceResultType";
import { NodeSSH } from "node-ssh";

export default async function(session: NodeSSH): Promise<ExerciceResultType> {
  const response: ExerciceResultType = {
    passed: false,
  }

  try {
    const command = session.execCommand(`ls -l`)
    response.passed = true
  } catch (err) {
    response.error = JSON.stringify(err)
  }

  return response
}