const userType = {
    JOB_SEEKER: 'jobSeeker',
    COMPANY: 'company',
    isJobSeekerType: (value) => {
        return this.JOB_SEEKER === value;
    },
    isCompanyType: (value) => {
        return this.COMPANY === value;
    },
}

module.exports = userType;