const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/validate`;
const createUserUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/create`;
const PostOptions = {
  method: 'POST',
};

export async function doLogin({ user, pass }) {
  let body = new FormData();
  body.append('user', user);
  body.append('pass', pass);

  let step1 = await fetch(loginUrl, {
    ...PostOptions,
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
  body.append('pass', pass);

  let step1 = await fetch(createUserUrl, {
    ...PostOptions,
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
