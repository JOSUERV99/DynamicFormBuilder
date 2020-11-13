const User = require("../models/User");

/*
    All functions related to user maniupulation in the database.
*/
const usersController = {};

/* ==================
     C   R    U   D
   ================== */

// Creates a new user, hashing it's password.
usersController.createUser = async (req, res) => {

    // Creates the new user
    const newUser = new User({
        username: req.body.username, // Unique username handled in model
        password: req.body.password,
        isAdmin: false
    });

    const token = await newUser.generateToken();

    // Tries to save the user
    try {
        await newUser.save();

        // 201: user was created and saved successfully
        res.status(201).send({newUser, token});

        // TODO - UnhandledPromiseRejectionWarning on duplicate usernames.

    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }
}

// Gets a single user based on their username.
usersController.findUser = async (req, res) => {
    try {
        const user = await User.getFromCredentials(req.body.username, req.body.password);
        
        // No user was found
        if (!user) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const token = await User.generateToken();
        // 200: OK
        res.status(200).json({user, token});
    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }
}


// Obtains a single user by its credentials 
usersController.login = async (req, res) => {

    try {
        const user = await User.getFromCredentials(req.body.username, req.body.password);
        const token = await user.generateToken();

        // 200: OK
        res.status(200).json({user, token});
    } catch (error) {
        // 401: Unathorized
        res.status(401).send(error);
    }
}


// Obtains all the users
usersController.getUsers = async (req, res) => {

    try {
        const users = await User.find({});

        // 200: OK
        res.status(200).json(users);
    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }

}

// Obtains all the users with minimal details
usersController.getUsersWithMinimalDetails = async (req, res) => {

    try {
        const users = await User.find({}, { username:true});

        // 200: OK
        res.status(200).json(users);
    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }

}

// Updates the information of a single user
usersController.updateUser = async (req, res) => {
    try {
        const updatedUser= await User.updateOne({_id: req.body._id}, {$set: {username: req.body.username, password: req.body.password}});

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}


// Deletes a single user
usersController.deleteUser = async (req, res) => {
    try {
        
        const removedUser= await User.deleteOne({_id: req.body._id});

        res.status(200).json(removedUser);
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}


// Logs off the user from a single system (removes one token)
usersController.logoff = async (req, res) => {

    try {
        // Removes the token being used
        req.user.tokens = req.user.tokens.filter((tk) => {
            return tk.token != req.token;
        });

        // Updates the tokens
        await req.user.save();
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }

}

// Logs off the user from all devices (removes all tokens)
usersController.forceLogoff = async (req, res) => {

    try {
        // Removes all tokens from the account
        req.user.tokens = [];

        // Updates the tokens
        await req.user.save();
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }

}

// Checks if the user is an administrator.
usersController.isAdmin = async (req, res) => {
    try {
        res.status(200).json({isAdmin: req.user.isAdmin});
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}
module.exports = usersController;
