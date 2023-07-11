import type { ApiResponsesTypes } from "../types";
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";
import { UserTypes } from "../types";

const ApiService = (apiEndpoint: string) => {
  const session = storeToRefs(useSessionStore()).session;

  const verifyExercises = async () => {
    const res = await fetch(`${apiEndpoint}/exercises/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: session.value.ssh.host,
        username: session.value.ssh.username,
      }),
    });

    const json = await res.json();

    if (!json.success) {
      return new Error('Impossible de se connecter au serveur');
    }

    return json.data;
  };

  const register = async (sessionId: string, user: UserTypes.Register) => {
    const res = await fetch(`${apiEndpoint}/users/${sessionId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (!json.success) {
      return new Error('Impossible de rejoindre la session');
    }

    return json.data;
  }

  return {
    verifyExercises,
  };
};

export default ApiService;