import type { ApiResponsesTypes } from "../types";
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";
import { UserTypes } from "../types";

const ApiService = (apiEndpoint: string) => {
  const session = storeToRefs(useSessionStore()).session;

  const verifyExercises = async () => {
    const headers = useRequestHeaders(['cookie']);
    const res = await fetch(`${apiEndpoint}/exercises/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        host: session.value.ssh.host,
        username: session.value.ssh.username,
      }),
      credentials: 'include'
    });

    const json = await res.json();

    if (!json.success) {
      return new Error('Impossible de se connecter au serveur');
    }

    return json.data;
  };

  const register = async (sessionId: string, user: UserTypes.Register) => {
    return fetch(`${apiEndpoint}/users/${sessionId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  const login = async (token: string) => {
    const res = fetch(`${apiEndpoint}/users/login?jwt=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    });

    return res
      .then((r: ApiResponsesTypes.Login) => {
        const tokenCookie = useCookie('token', {
          expires: new Date(r.data.tokens.access.expires)
        })
        tokenCookie.value = r.data.tokens.access.token;

        const refreshTokenCookie = useCookie('refreshToken', {
          expires: new Date(r.data.tokens.refresh.expires)
        })
        refreshTokenCookie.value = r.data.tokens.refresh.token;

        return r;
      })
      .catch((err) => {
        return err.message
      })
  }

  return {
    verifyExercises,
    register,
    login
  };
};

export default ApiService;