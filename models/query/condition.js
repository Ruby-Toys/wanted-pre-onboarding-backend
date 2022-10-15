const {Op} = require("sequelize");
exports.like = (column, value) => {
    const condition = {};
    condition[column] = {[Op.like] : `%${value}%`};
    return condition;
}