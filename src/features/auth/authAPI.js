const baseUrl = process.env.REACT_APP_API_BASE_URL || ''
const loginUrl = `${baseUrl}/auth/validate`;
const createUserUrl = `${baseUrl}/auth/create`;

export async function doLogin({ user, pass }) {
  let body = new FormData();
  body.append('user', user);
  body.append('auth', pass);

  let step1 = await fetch(loginUrl, {
    method: 'POST',
    body,
  });

  if (step1.ok) {
    return {
      ...(await step1.json()),
      user,
    };
  } else {
    return {
      error: 'Login Failed',
    };
  }
}

export async function createUser({ user, pass }) {
  let body = new FormData();
  body.append('user', user);
  body.append('auth', pass);

  let step1 = await fetch(createUserUrl, {
    method: 'POST',
    body,
  });

  if (step1.ok) {
    return {
      ...(await step1.json()),
      user,
    };
  } else {
    return {
      error: 'User Creation Failed',
    };
  }
}
