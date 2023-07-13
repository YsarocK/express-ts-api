import type { ApiResponsesTypes } from "../types";
import type { FormTypes } from "../types";
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";
import AdminInterceptor from "./utils/AdminInterceptor";

const ApiService = (apiEndpoint: string) => {
  // AdminInterceptor();

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

        const tokenCookie = useCookie('token', {
          domain: `${document.location.host}`,
        });
        tokenCookie.value = json.data.tokens.access.token;

        const refreshTokenCookie = useCookie('refreshToken', {
          domain: `${document.location.host}`,
        })
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
        }),
      })

      return res
        .then(async (r) => {
          const json = await r.json()

          if(json.success === false) {
            return json.success
          }

          const tokenCookie = useCookie('token',{
            domain: `${document.location.host}`,
          });
          tokenCookie.value = json.data.tokens.access.token;

          const refreshTokenCookie = useCookie('refreshToken',{
            domain: `${document.location.host}`,
          })
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
          'Content-Type': 'application/json',
          ...headers
        },
        credentials: 'include'
      })

      if(res.status === 403 || res.status === 500) {
        return await navigateTo('/admin/login')
      }

      return res.json()
    },
    getAllSessions: async () => {
      const headers = useRequestHeaders(['cookie']);
      const res = await fetch(`${apiEndpoint}/admin/get_all_session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        credentials: 'include'
      })

      if(res.status === 403 || res.status === 500) {
        return await navigateTo('/admin/login')
      }

      return res.json()
    },
    createSession: async (name: string) => {
      const headers = useRequestHeaders(['cookie']);
      const res = await fetch(`${apiEndpoint}/admin/create_session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          name: name
        }),
        credentials: 'include'
      })

      if(res.status === 403 || res.status === 500) {
        return await navigateTo('/admin/login')
      }

      return res.json()
    },
    updateSession: async (sessionId: string, isActive: boolean) => {
      const headers = useRequestHeaders(['cookie']);
      const res = await fetch(`${apiEndpoint}/admin/update_session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          id: sessionId,
          isActive: isActive
        }),
        credentials: 'include'
      })

      if(res.status === 403 || res.status === 500) {
        return await navigateTo('/admin/login')
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