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

    UserExperience.findOne({ username: username }).then((data) => {
        if (!data) {
            const user_experience = new UserExperience({
                username: username,
                no_of_experiences: 1,
                companies: [final_company_name],
            })
            user_experience.save().then(() => {
                console.log('user experience saved...');
            })
        }
        else {
            if (!data.companies.includes(final_company_name)) {
                UserExperience.updateOne({ username: username }, { $set: { no_of_experiences: data.no_of_experiences + 1 }, $push: { companies: final_company_name } })
                    .then(() => {
                        console.log('updated')
                    });
            }
            else {
                UserExperience.updateOne({ username: username }, { $set: { no_of_experiences: data.no_of_experiences + 1 } })
                    .then(() => {
                        console.log('updated')
                    });
            }
        }
    })

});

module.exports = { addExperience }