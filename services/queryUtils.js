const isFailUpdate = (queryResult) => {
    return queryResult[0] === 0;
}

module.exports = {
    isFailUpdate
}