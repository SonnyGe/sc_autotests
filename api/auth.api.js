export class AuthApi {
  constructor(request) {
    this.request = request;
  }

  async login(email, password) {
    const response = await this.request.post('/front/v1/auth/login', {
      form: {
        usernameOrEmail: email,
        password,
      },
    });

    if (!response.ok()) {
      throw new Error(`Login failed with status ${response.status()}`);
    }

    return response;
  }
}
