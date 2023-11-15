class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this._details = {};
  }

  get details() {
    return this._details;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        details: this.details,
      },
    };
  }
}

module.exports = ApplicationError;
