const {Company, JobPosting} = require("../../../models");
exports.getJobPostings = async () => {
    const wantedInfo = {
        "name" : "원티드",
        "description" : "채용사이트 원티드",
        "country" : "대한민국",
        "region" : "서울",
        "linkUrl" : "https://www.wanted.co.kr",
        "employees" : 200,
        "recruiterEmail" : "wanted@gamil.com",
        "recruiterName" : "백승수",
        "password" : "sadas",
    }
    const wanted = await Company.create(wantedInfo);

    const now = new Date();
    let deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
    const wantedJobPostingInfos = [
        {
            title: '원티드 사이트 개발',
            description: '원티드는 개발자들의 채용을 돕는 플랫폼입니다.',
            country: '대한민국',
            region: '서울',
            position: '개발자,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: wanted.id
        },
        {
            title: '원티드 사이트 개발',
            description: '원티드는 개발자들의 채용을 돕는 플랫폼입니다.',
            country: '대한민국',
            region: '서울',
            position: '개발자,프론트엔드',
            requiredSkills: '자바스크립트, 노드',
            deadlineAt,
            companyId: wanted.id
        },
        {
            title: '원티드 유지보수',
            description: '원티드는 개발자들의 채용을 돕는 플랫폼입니다.',
            country: '대한민국',
            region: '서울',
            position: 'DevOps',
            requiredSkills: 'AWS',
            deadlineAt,
            companyId: wanted.id
        }
    ];
    const wantedJobPostings = await JobPosting.bulkCreate(wantedJobPostingInfos);
    wantedJobPostings.forEach(jp => jp.company = wanted);

    const appleInfo = {
        "name" : "애플",
        "description" : "Apple(애플)은 1976년 4월 1일에 설립된 미국의 IT 기업이다. 하드웨어, 소프트웨어, 온라인 서비스를 디자인(설계), 개발, 제조(제작), 판매한다.",
        "country" : "미국",
        "region" : "캘리포니아",
        "linkUrl" : "https://www.apple.com/",
        "employees" : 500,
        "recruiterEmail" : "apple@gamil.com",
        "recruiterName" : "팀 쿡",
        "password" : "1241412",
    }

    const apple = await Company.create(appleInfo);

    deadlineAt = new Date(now.setMonth(now.getMonth() + 2));
    const appJobPostingInfos = [
        {
            title: 'iOS 개발자',
            description: 'iOS 개발 엔지니어를 모집합니다.',
            country: '미국',
            region: '캘리포니아',
            position: '개발,백엔드',
            requiredSkills: 'Swift',
            deadlineAt,
            companyId: apple.id
        },
        {
            title: 'macOS 개발자',
            description: 'macOS 개발자를 모집합니다.',
            country: '미국',
            region: 'LA',
            position: '백엔드',
            requiredSkills: 'UNIX',
            deadlineAt,
            companyId: apple.id
        }
    ];
    const appleJobPostings = await JobPosting.bulkCreate(appJobPostingInfos);
    appleJobPostings.forEach(jp => jp.company = apple);

    return [...wantedJobPostings, ...appleJobPostings];
}