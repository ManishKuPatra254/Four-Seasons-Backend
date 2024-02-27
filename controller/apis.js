import apis from "../model/apis";
import bcrypt from 'bcrypt';
import responseMessages from '../responseMessage'

export const userFormSignup = async (req, res) => {
    console.log("enter");
    try {
        const { first_name, last_name, email, password } = req.body;

        console.log(req.body, "req.body");
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await apis.findOne({ email });

        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }

        const userData = new apis({ first_name, last_name, email, password: hashedPassword });
        const result = await userData.save();

        res.send({
            status: 200,
            success: true,
            msg: 'user registered successfully',
            result: result._doc
        });
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
};


export const userFormLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body, "req.body");
        const userData = await apis.findOne({ email });

        console.log(userData, "gfkjl;");

        if (!userData) {
            throw new Error('userNotFound');
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            throw new Error('incorrectPassword');
        }

        res.send({
            status: responseMessages.loginSuccess.statusCode,
            success: true,
            msg: responseMessages.loginSuccess.message,
        });
    } catch (error) {
        const errorMsg = responseMessages[error.message] || responseMessages.genericError;

        res.send({
            status: errorMsg.statusCode,
            success: false,
            msg: errorMsg.message,
        });

        console.log(errorMsg.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.query;

        const user = await apis.findById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({
            status: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user,
        });
    } catch (error) {
        res.status(500).send('An error occurred while fetching the user');
    }
};