const {Op} = require('sequelize');
const {JobPosting, Company, sequelize} = require("../../models");
const {isFailUpdate, isFailDelete} = require("../utils/queryUtils");
const {getPaging} = require("../utils/pagingUtils");
const {notfoundJobPostingException} = require("../../exceptions/jobPostingException");

exports.postJobPosting = async (jobPosting) => {
    return JobPosting.create(jobPosting);
}

exports.getJobPostings = async (searchForm) => {
    const search = searchForm.search ? searchForm.search : '';
    const paging = getPaging(searchForm.page);

    return JobPosting.findAll({
        attributes: ['id', 'title', 'country', 'region', 'position', 'requiredSkills', 'deadlineAt'],
        include: [
            {
                model: Company,
                attributes: ['id', 'name'],
            }
        ],
        where: {
            [Op.or] : [
                // 검색어의 대상은 채용공고명, 내용, 국가, 지역, 포지션, 요기술, 회사명
                {title : {[Op.like] : `%${search}%`}},
                {description : {[Op.like] : `%${search}%`}},
                {country : {[Op.like] : `%${search}%`}},
                {region : {[Op.like] : `%${search}%`}},
                {position : {[Op.like] : `%${search}%`}},
                {requiredSkills : {[Op.like] : `%${search}%`}},
                {'$company.name$' : {[Op.like] : `%${search}%`}}
            ],
        },
        offset: paging.offset,
        limit: paging.limit,
        order: [
            ['id', 'DESC']
        ]
    })
}

exports.getJobPosting = async (jobPostingId) => {
    const jobPosting = await JobPosting.findOne({
        include: [
            {
                model: Company,
                attributes: ['name'],
            }
        ],
        where: {id: jobPostingId}
    });

    if (jobPosting) {
        const companyId = jobPosting.companyId;
        jobPosting.relatedJobPostings = await JobPosting.findAll({
            include: [
                {
                    model: Company,
                    attributes: ['name'],
                }
            ],
            where: {
                companyId,
                [Op.not] : [{id : jobPostingId}]
            }
        });

        return jobPosting;
    }

    throw notfoundJobPostingException.error();
}

exports.patchJobPosting = async (jobPosting) => {
    const updatedJobPosting = await JobPosting.update(
        {...jobPosting},
        {where : {id : jobPosting.id}}
    );

    if (isFailUpdate(updatedJobPosting)) throw notfoundJobPostingException.error();

    return updatedJobPosting;
}

exports.deleteJobPosting = async (jobPostingId) => {
    const result = await JobPosting.destroy({where: {id : jobPostingId}});

    if (isFailDelete(result)) throw notfoundJobPostingException.error();

    return result;
}