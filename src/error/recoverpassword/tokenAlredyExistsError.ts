export class TokenAlredyExistsError extends Error {
  constructor() {
    super('The token exists! check your email box.')
  }
}
