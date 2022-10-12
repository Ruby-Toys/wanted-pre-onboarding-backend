const {Sequelize} = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];

const jobSeekerModel = require('./models/jobSeeker');
const resumeModel = require('./models/resume');
const companyModel = require('./models/company');
const jobPostingModel = require('./models/jobPosting');
const applicationModel = require('./models/application');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const JobSeeker = jobSeekerModel(sequelize, Sequelize);
const Resume = resumeModel(sequelize, Sequelize);
const Company = companyModel(sequelize, Sequelize);
const JobPosting = jobPostingModel(sequelize, Sequelize);
const Application = applicationModel(sequelize, Sequelize);

JobSeeker.hasMany(Resume, {as: 'resumes', onDelete: 'CASCADE'})
Resume.belongsTo(JobSeeker);
JobPosting.belongsTo(Company);
Application.belongsTo(Resume);
Application.belongsTo(JobPosting);

module.exports = {
  sequelize, JobSeeker, Resume, Company, JobPosting, Application
};