exports.getPaging = (page, pageSize) => {
    page = page ? page : 1;
    const limit = pageSize ? pageSize : 10;
    const offset = limit * Math.max((page - 1), 0);

    return {offset, limit}
}