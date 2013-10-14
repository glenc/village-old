var ListProjection = module.exports = (function() {
  return {
    name: 'detail',
    model: 'family',
    select: 'id name status contacts createdAt updatedAt'
  };
})();
