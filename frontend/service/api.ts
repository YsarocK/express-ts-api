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
    return fetch(`${apiEndpoint}/users/${sessionId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  const login = async (token: string) => {
    const [
      tokenCookie,
      refreshTokenCookie]
      = [
      useCookie('token'),
      useCookie('refreshToken'),
    ];

    const res = fetch(`${apiEndpoint}/users/login?jwt=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res
      .then(r => r.json())
      .then((r) => {
        if (r.success) {
          tokenCookie.value = r.data.tokens.access.token;
          useCookie('token', {
            expires: r.data.tokens.access.expires
          })
          refreshTokenCookie.value = r.data.tokens.refresh.token;
          useCookie('refreshToken', {
            expires: r.data.tokens.refresh.expires
          })
          console.log(r.data)
        }
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