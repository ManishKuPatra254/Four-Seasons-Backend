import apis from "../model/apis";
import bcrypt from 'bcrypt';

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
        const userDataEmail = await apis.findOne({ email });
        const userDataPassword = await apis.findOne({ password });


        console.log(userDataEmail, "emaillogin")
        console.log(userDataPassword, "passwordlogin")

        if (!userDataEmail && userDataPassword) {
            console.log("entrr")
            throw new Error('User not found');
        }

        res.send({
            status: 200,
            success: true,
            msg: 'user login successfully',
        });
    }
    catch (error) {
        res.send({ status: 400, success: false, msg: error.message });

    }
}
