require('dotenv').config()
import userService, { findUserByEmail, findUserByPhoneNumber, findUserOAuthId, saveUser } from './users.service';

const { roles, passwordLessSignup, passwordSignUp } = require('../../utils/constants');
const userController = {
    /**
     * Get user 
     * @param {id} req 
     * @param {valid,error, message} res 
     * @returns 
     */
    async getUser(req, res) {
        try {
            const id = req.query.id;
            if (req.user["http://xyz.com"].indexOf(roles.SuperAdmin) == -1 &&
                req.user["http://xyz.com/roles"].indexOf(roles.CustomerAdmin) == -1
            ) {
                res.status(HttpStatus.FORBIDDEN).json({ valid: false, error: 'You are not authorized to view profile' });
            }
            const users = await userService.getUsers({ id: id });

            return res.json({ valid: true, data: users });

        } catch (err) {
            return res.status(500).json({ valid: false, data: null, error: 'Something went wrong', stack: err });
        }
    },
    
    /**
     * Update user status
     * @param {id} req 
     * @param {valid,error, message} res 
     * @returns 
     */
    async updateUserStatus(req, res) {
        try {
            let id = req.params.id
            let user = await userService.findUserById(id);
            if (user) {
                let request = req.body;
                await userService.updateUser(id, request);
                return res.json({ valid: true, message: 'User updated successfully' });
            }
            else return res.status(400).json({ valid: false, message: 'Invalid user' });
        } catch (err) {
            return res.status(500).json({ valid: false, error: `${err.response?.data?.message || err.message}` });
        }
    },

}

export default userController;