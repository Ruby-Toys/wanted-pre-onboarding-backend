const where = (condition) => {
    return {
        where : condition
    }
}

const leftJoin = (...models) => {
    const include = [];
    models.forEach(model => {
        include.push({model});
    })

    return {include};
}
