const User = require('../schemas/userSchema');

const registerUser = ((req,res) => {
    const { current_account_type, currentUsername, currentEmail, currentPassword, currentCollege } = req.body;

    User.findOne({username: currentUsername}).then((data) => {
        if(data) {
            return res.json({'message': 'User already exists...'});
        }

        const user = new User(req.body);
        user.username = currentUsername;
        user.password = currentPassword;
        user.email = currentEmail;
        user.college = currentCollege;
        user.account_type = current_account_type;
        user.save().then(() => {return res.json({'message':'User Registered Successfully...'})})
    }).catch((err) => console.log(err));
});

const loginUser = ((req,res) => {
    const { username, password, account_type } = req.body;

    User.findOne({username: username, password: password, account_type: account_type }).then((data) => {
        if(data) {
            return res.json({'message': 'User logged in successfully...'});
        }
        else{
            return res.json({'message': 'User not found...'});
        }
    })
});

module.exports = {registerUser, loginUser}