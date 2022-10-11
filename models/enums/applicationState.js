const applicationState = {
    SUPPORT: {
        code : 0,
        value : 'SUPPORT',
    },
    REVIEW: {
        code : 1,
        value : 'REVIEW',
    },
    PASS: {
        code : 2,
        value : 'PASS',
    },
    LEAVING: {
        code : 3,
        value : 'LEAVING',
    },
    CANCEL: {
        code : 4,
        value : 'CANCEL',
    },
    isStateCode: (code) => {
        return this.SUPPORT.code === code
            || this.REVIEW.code === code
            || this.PASS.code === code
            || this.LEAVING.code === code
            || this.CANCEL.code === code;
    }
}

module.exports = applicationState