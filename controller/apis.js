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


// export const userFormLogin = async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         console.log(req.body, "req.body");
//         const userData = await apis.findOne({ email });


//         console.log(userData, "gfkjl;")

//         if (!userData) {
//             console.log("entrr")
//             throw new Error('User not found');
//         }

//         res.send({
//             status: 200,
//             success: true,
//             msg: 'user login successfully',
//         });
//     }
//     catch (error) {
//         res.send({ status: 400, success: false, msg: error.message });

//     }
// }


export const userFormLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body, "req.body");
        const userData = await apis.findOne({ email });
        // console.log(object)

        console.log(userData, "gfkjl;");

        if (!userData) {
            console.log("entrr");
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }
        res.send({
            status: 200,
            success: true,
            msg: 'User login successful',
        });
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.msg });
    }
};