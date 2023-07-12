const AdminInterceptor = async () => {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, options] = args;
    if (resource.includes('/admin') && !(resource.includes('/login'))) {
      const headers = useRequestHeaders(['cookie']);
      options.headers = {
        ...headers,
        ...options.headers,
      };
      options.credentials = 'include';
    }

    const res = await originalFetch(resource, options);

    if(res.status === 403 || res.status === 500) {
      return await navigateTo('/admin/login')
    }

    return res;
  };
}

export default AdminInterceptor;