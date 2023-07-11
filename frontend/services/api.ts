import type { ApiResponsesTypes } from "../types";
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";
import { FormTypes } from "../types";

const ApiService = (apiEndpoint: string) => {
  const { store } = storeToRefs(useSessionStore());

  const verifyExercises = async () => {
    if(!store.value) throw new Error('Store is undefined');

    const headers = useRequestHeaders(['cookie']);
    const res = await fetch(`${apiEndpoint}/exercises/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        host: store.value.user_session.ssh_ip,
        username: store.value.user_session.ssh_user,
      }),
      credentials: 'include'
    });

    const json = await res.json();

    if (!json.success) {
      return new Error('Impossible de se connecter au serveur');
    }

    return json;
  };

  const register = async (sessionId: string, user: FormTypes.Register) => {
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
    })

    return res
      .then(async (r) => {
        const json: ApiResponsesTypes.Login = await r.json()

        const tokenCookie = useCookie('token');
        tokenCookie.value = json.data.tokens.access.token;

        const refreshTokenCookie = useCookie('refreshToken')
        refreshTokenCookie.value = json.data.tokens.refresh.token;

        return json;
      })
      .catch((err) => {
        return err.message
      })
  }

  const admin = {
    login: (email: string, password: string) => {
      const res = fetch(`${apiEndpoint}/admin/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      return res
        .then(async (r) => {
          const json = await r.json()

          if(json.success === false) {
            return json.success
          }

          const tokenCookie = useCookie('token');
          tokenCookie.value = json.data.tokens.access.token;

          const refreshTokenCookie = useCookie('refreshToken')
          refreshTokenCookie.value = json.data.tokens.refresh.token;

          return json;
        })
        .catch((err) => {
          return new Error(err.message)
        })
    },
    getSession: async (sessionId: string) => {
      const headers = useRequestHeaders(['cookie']);
      const res = await fetch(`${apiEndpoint}/admin/${sessionId}/users_sessions`, {
        method: 'GET',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })

      if(res.status === 403) {
        return navigateTo('/admin/login')
      }

      return res.json()
    }
  }

  return {
    verifyExercises,
    register,
    login,
    admin,
  };
};

export default ApiService;