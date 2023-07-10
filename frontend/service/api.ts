import type { ApiResponsesTypes } from "../types";
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";

class ApiService {
  apiEndpoint: string;
  session: any;
  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
    const { session } = storeToRefs(useSessionStore());
    this.session = session;
  }

  verifyExercises = async () =>  {
    const res = await fetch(`${ this.apiEndpoint }/exercises/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: this.session.value.ssh.host,
        username: this.session.value.ssh.username,
      }),
    });

    const json: ApiResponsesTypes.Verify = await res.json()

    if (!json.success) {
      return new Error('Impossible de se connecter au serveur');
    }

    return json.data;
  }
}

export default ApiService;