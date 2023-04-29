const ExperienceData = require('../schemas/experience_data');
const UserExperience = require('../schemas/user_experienceSchema');

const addExperience = ((req, res) => {
    const { username, final_company_name, final_drive, final_compensation, final_description, final_rounds, final_total_students,
    final_selected_students, final_tips, final_difficulty, selected_skills } = req.body;
    const experience_id = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    const experience = new ExperienceData({
        experience_id: experience_id,
        company_name: final_company_name,
        drive: final_drive,
        compensation: final_compensation,
        description: final_description,
        rounds: final_rounds,
        total_students: final_total_students,
        selected_count: final_selected_students,
        tips: final_tips,
        difficulty: final_difficulty,
        skills: selected_skills
    });

    experience.save().then(() => {
        console.log('experience saved...');
    }).catch((err) => console.log(err));

});

module.exports = { addExperience }