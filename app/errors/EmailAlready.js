const ApplicationError = require('./ApplicationError');

class EmailAlreadyTakenError extends ApplicationError {
  constructor(email) {
    super(`${email} is Already use`);
    this.email = email;
  }

  get details() {
    return {
      email: this.email,
    };
  }
}

module.exports = EmailAlreadyTakenError;
