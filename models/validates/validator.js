const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // if (month < 10){
    //     month = "0" + month;
    // }
    //
    // var day = date.getDate();
    // if (day <= 9){
    //     day = "0" + month;
    // }

    return year
        + '-' + (month < 10 ? '0' + month : month)
        + '-' + (day < 10 ? '0' + day : day)
}

exports.notEmptyValidator = (columnName) => {
    return {
        notNull : {
            msg : columnName + ' 값은 필수 값입니다.'
        },
        customValidator : (value) => {
            if (!value) throw new Error(columnName + ' 값은 필수 값입니다.');
        }
    }
}

exports.dateValidator = (columnName) => {
    return {
        isDate: {
            msg: columnName + ' 값이 형식에 맞지 않습니다.'
        },
        customValidator : (value) => {
            if (value <= getToday()) throw new Error(columnName + ' 값은 오늘 이후 날짜이어야 합니다.');
        }
    }
}

exports.emailValidator = (columnName) => {
    return {
        isEmail: {
            msg: columnName + ' 값이 형식에 맞지 않습니다.'
        },
        customValidator : (value) => {
            if (!value) throw new Error(columnName + ' 값은 필수 값입니다.');
        }
    }
}

exports.unsignedNumberValidator = (columnName) => {
    return {
        isInt: {
            msg: columnName + ' 값이 형식에 맞지 않습니다.'
        },
        customValidator : (value) => {
            if (value < 0) throw new Error(columnName + ' 값은 0보다 큰 값이어야 합니다.');
        }
    }
}

exports.urlValidator = (columnName) => {
    return {
        isUrl: {
            msg: columnName + ' 값이 형식에 맞지 않습니다.'
        }
    }
}

exports.enumValidator = (columnName, enums) => {
    return {
        isIn: {
            args: [enums],
            msg: columnName + ' 값이 형식에 맞지 않습니다.'
        }
    }
}