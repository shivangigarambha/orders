const common = {
  getPagination(perPage, page, total) {
    return {
      total,
      perPage,
      currentPage: page,
      totalPages: total === 0 ? 0 : Math.ceil(total / +perPage)
    };
  }
};

module.exports = common;