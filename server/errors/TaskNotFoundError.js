module.exports = class TaskNotFoundError extends Error {
  constructor(message) {
    super(message);
  }
};
