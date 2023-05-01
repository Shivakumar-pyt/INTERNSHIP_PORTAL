const ExperienceData = require('../schemas/experience_data');
const UserExperience = require('../schemas/user_experienceSchema');

const addExperience = ((req, res) => {
    const { username, company_name, drive, compensation, description, rounds, roundsInfo, selected_skills,
        total_students, selected_students, tips } = req.body;

    console.log(req.body);
    const experience_id = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    const new_experience = new ExperienceData({
        experience_id: experience_id,
        username: username,
        company_name: company_name,
        drive: drive,
        description: description,
        compensation: compensation,
        rounds: rounds,
        rounds_info: roundsInfo,
        skills: selected_skills,
        total_students: total_students,
        selected_count: selected_students,
        tips: tips
    });

    new_experience.save().then(() => {
        console.log('new experience saved...');
    });

    UserExperience.findOne({ username: username }).then((data) => {
        if (!data) {
            const company_array = [];
            company_array.push(company_name);
            const exp_array = []
            exp_array.push(experience_id);
            const user_experience = new UserExperience({
                username: username,
                no_of_experiences: 1,
                companies: company_array,
                experience_ids: exp_array
            })
            user_experience.save().then(() => {
                console.log('user experience saved...');
            })
        }
        else {
            if (!data.companies.includes(company_name)) {
                UserExperience.updateOne({ username: username }, {
                    $set: { no_of_experiences: data.no_of_experiences + 1 }, $push: {companies: company_name}
                }).then(() => {
                    console.log('updated...');
                })

                UserExperience.updateOne({ username: username }, {
                    $push: {experience_ids: experience_id}
                }).then(() => {
                    console.log('updated...');
                })

            }
            else {
                UserExperience.updateOne({ username: username }, {
                    $set: { no_of_experiences: data.no_of_experiences + 1 },$push: { experience_ids: experience_id }
                }).then(() => {
                    console.log('updated')
                });
            }
        }
    })

    return res.json({ message: 'Experience successfully saved...' })
})

module.exports = { addExperience };