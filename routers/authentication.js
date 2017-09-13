const User = require('../models/user');


module.exports = (router) => {


    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'you must provide an e-mail' });
        }
        else {
            if (!req.body.username) {
                res.json({ success: false, message: 'you must provide an username' });
            }
            else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'you must provide an password' });
                }
                else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or e-mail allready exists' });
                            }
                            else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message });
                                            } else {
                                                res.json({ success: false, message: err });
                                            }
                                        }
                                    }
                                }
                                else {
                                    res.json({ success: false, message: 'Could not save user. Error: ', err });
                                }
                            }
                        }
                        else {
                            res.json({ success: true, message: 'user saved!' })
                        }
                    });
                }
            }
        }

    });

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' });
                    } else {
                        res.json({ success: true, message: 'E-mail is avilable' });
                    }
                }
            });
        }
    });         // RETURNS ALL THE USERS IN THE DATABASE
    router.get('/listmember', function (req, res) {
        User.find({}, function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
        });
    });



    router.get('/findmember/:username', (req, res) => {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'User name is not found' });
                    } else {
                        res.json({ success: true, message: user.username +' is found',user:user});
                    }
                }
            });
    });
    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'User Name was not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'User name is already taken'});
                    } else {
                        res.json({ success: true, message: 'User name is avilable'});
                    }
                }
            });
        }
    });

    router.put('/update', (req, res) =>{
        if(!req.body.username)
            {
                res.json({ success: false, message: 'no find username' }); 
            }
      else
        {
            User.findOne({username:req.body.username},(err,user)=>{
                if(err)
                                {
                                   res.json({ success: false, message: err });  
                                }else{
                                    if(!user)
                                        {
                                            res.json({ success: false, message: 'false' });  
                                        }
                                        else{
                                            user.email=req.body.email;
                                            user.password=req.body.password;
                                            user.save((err)=>{
                                                if(err)
                                                    {
                                                res.json({ success: false, message: 'can not save' });  
                                                    }
                                                    else{
                                                        res.json({ success: true, message: 'data is updated' });  
                                                    }
                                            });
                                        }
                                }
            });
                      
        }
    });
                 // DELETES A USER FROM THE DATABASE
    router.delete('/deletemember',  (req, res) =>{
        if(!req.body.username)
            {
                res.json({ success: false, message: 'no find username' }); 
            }
            else{
                User.findOneAndRemove({username:req.body.username},  (err, user)=> {
                    if (err) 
                        {
                            res.json({ success: false, message: err });  
                        }
                        else{
                            if(!user)
                                {
                                    res.json({ success: false, message: 'can not found username' });  
                                }
                                else
                                    {
                            res.json({ success: true, message: "User "+ user.username + " was deleted"});  
                                    }
                        }
                });
            }
    });  

    return router;
}