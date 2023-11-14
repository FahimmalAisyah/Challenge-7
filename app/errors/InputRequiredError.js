const ApplicationError = require('./ApplicationError');

class InputRequiredError extends ApplicationError {
  constructor(fields) {
    super(`${fields.join(', ')} are required!`);
    this.fields = fields;
  }

  get details() {
    return { fields: this.fields };
  }
}

module.exports = InputRequiredError;
