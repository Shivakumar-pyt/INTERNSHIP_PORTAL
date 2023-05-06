const ExperienceData = require('../schemas/experience_data');
const UserExperience = require('../schemas/user_experienceSchema');
const SavedExperience = require('../schemas/savedExperienceSchema');

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
                    $set: { no_of_experiences: data.no_of_experiences + 1 }, $push: { companies: company_name }
                }).then(() => {
                    console.log('updated...');
                })

                UserExperience.updateOne({ username: username }, {
                    $push: { experience_ids: experience_id }
                }).then(() => {
                    console.log('updated...');
                })

            }
            else {
                UserExperience.updateOne({ username: username }, {
                    $set: { no_of_experiences: data.no_of_experiences + 1 }, $push: { experience_ids: experience_id }
                }).then(() => {
                    console.log('updated')
                });
            }
        }
    })

    return res.json({ message: 'Experience successfully saved...' })
})

const getExperiences = (async (req, res) => {
    const filters = req.body;
    console.log(filters);
    var company_list;
    try {
        if(filters.companies !== undefined) {
            company_list = await ExperienceData.find({company_name: {$in: filters.companies}});
        }
        else if(filters.drive !== undefined) {
            company_list = await ExperienceData.find({drive: {$in: filters.drive}});
        }
        else if(filters.skills !== undefined) {
            company_list = await ExperienceData.find({skills: {$in: filters.skills}});
        }
        else if(filters.min_compensation !== undefined && filters.max_compensation !== undefined) {
            company_list = await ExperienceData.find({compensation: {$gte: parseInt(filters.min_compensation),$lte: parseInt(filters.max_compensation)}})
        }
        else if(filters.min_compensation !== undefined && filters.max_compensation === undefined) {
            company_list = await ExperienceData.find({compensation: {$gte: parseInt(filters.min_compensation)}});
        }
        else if(filters.max_compensation !== undefined && filters.min_compensation === undefined) {
            company_list = await ExperienceData.find({compensation: {$lte: parseInt(filters.max_compensation)}});
        }
    }
    catch (err) {
        console.log(err);
    }

    var final_company_list = [];

    for(let i in company_list) {
        var flag = false;
        if(filters.companies !== undefined) {
            if(filters.companies.includes(company_list[i]["company_name"])) {
                flag = true;
            }
            else{
                flag = false;
                continue;
            }
        }
        if(filters.drive !== undefined) {
            if(filters.drive.includes(company_list[i]["drive"])) {
                flag = true;
            }
            else{
                flag = false;
                continue;
            }
        }
        if(filters.skills !== undefined) {
            var f1 = filters.skills.every(elem => company_list[i]["skills"].includes(elem));
            var f2 = company_list[i]["skills"].every(elem => filters.skills.includes(elem));
            if(f1 || f2) {
                flag = true;
            }
            else{
                flag = false;
                continue;
            }
        }

        if(filters.min_compensation !== undefined) {
            if(parseInt(filters.min_compensation) <= company_list[i]["compensation"]) {
                flag = true;
            }
            else{
                flag = false;
                continue;
            }
        }

        if(filters.max_compensation !== undefined) {
            if(parseInt(filters.max_compensation) >= company_list[i]["compensation"]) {
                flag = true;
            }
            else{
                flag = false;
                continue;
            }
        }

        if(flag) {
            final_company_list.push(company_list[i]);
        }
    }

    return res.json({'company_data': final_company_list})
    
})

const saveExperience = ((req,res) => {
    const experience = req.body;
    SavedExperience.findOne({username: experience.username}).then((data) => {
        if(data) {
            var flag = false;
            for(let i=0;i<data.experiences.length;i++) {
                if(data.experiences[i].experience_id == experience.experience_id) {
                    flag = true;
                    break;
                }
            }

            console.log(flag);

            if(flag) {
                return res.json({'message':'Already Saved...'});
            }
            else{
                SavedExperience.updateOne({username: experience.username}, {$push: {experiences: experience}})
                .then(() => {
                    return res.json({'message':'Saved...'});
                }).catch((err) => {
                    console.log(err);
                })
            }
            
        }
        else{
            const exp = new SavedExperience({
                username: experience.username,
                experiences: [experience]
            })

            exp.save().then(() => {
                return res.json({'message':'Saved...'});
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})

module.exports = { addExperience, getExperiences, saveExperience };