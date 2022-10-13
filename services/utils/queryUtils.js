exports.isFailUpdate = (queryResult) => {
    return queryResult[0] === 0;
}

exports.isFailDelete = (queryResult) => {
    return queryResult === 0;
}