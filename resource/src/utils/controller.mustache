/**
 * Creates a controller with extra methods
 *
 * @param {Class} model
 * @param {Object} extra methods
 * @return {Object} controller
 */
exports.createController = (Model, subController) => {
  const baseController = exports.baseController(Model);
  Object.setPrototypeOf(subController, baseController);
  return subController;
};

/**
 * basic CRUD controller generator
 *
 * @param {Class} model
 * @return {Object} base controller generator
 */
exports.baseController = Model => ({
  *all(params) {
    return yield Model.standardQuery(params).run();
  },

  *watch(params) {
    const [feed, count] = yield [
      Model.standardFeed(params),
      Model.standardQuery(params).count().execute()
    ];
    return { feed, count };
  },

  *find(id) {
    return yield Model.get(id);
  },

  *create(params) {
    return yield new Model(params).save();
  },

  *update(id, params) {
    const record = yield this.find(id);
    return yield record.update(params);
  },

  *replace(id, params) {
    const record = yield this.find(id);
    return yield record.replace(params);
  },

  *delete(id) {
    const record = yield this.find(id);
    yield record.delete();
    return record;
  }
});
