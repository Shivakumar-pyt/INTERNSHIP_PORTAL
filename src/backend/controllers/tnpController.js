const DriveSchema = require('../schemas/driveSchema');

const addCompanyDrive = ((req,res) => {
    const {final_drive, final_company, final_description, final_pay, branches, final_link,
        criteria, drive_deadline} = req.body;
    const new_drive_id = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    const new_drive = new DriveSchema({
        drive_id: new_drive_id,
        drive_type: final_drive,
        company_name: final_company,
        company_description: final_description,
        pay_per_month: parseInt(final_pay),
        branches: branches,
        link: final_link,
        criteria: criteria,
        drive_deadline: drive_deadline
    })

    new_drive.save().then(() => {
        return res.json({'message':'Drive succesfully created...'})
    }).catch((err) => {
        console.log(err);
    })
});

const getUpcomingDrives = (async (req,res) => {
    const { current_date } = req.body;
    try{
        const result = await DriveSchema.find({drive_deadline: {$gte: current_date}});
        return res.json({'result':result});
    }catch(err) {
        console.log(err);
    }
})

module.exports = { addCompanyDrive, getUpcomingDrives }