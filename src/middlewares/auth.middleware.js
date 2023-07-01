import admin from 'firebase-admin';
export const authenticationMiddleWare = async (req, res, next) => {
    let {authorization} = req.headers;
    if(authorization){
        authorization = authorization.split(" ")[1];
    }
    if (authorization) {
        try {
            const user = await admin.auth().verifyIdToken(authorization);
            if (user) {
                req.user = {
                    uid: user.uid,
                    email: user.email,
                    name: user.name
                };
                return next();
            }
            return res.status(400).json({ msg: "Invalid Token!" });
        } catch (err) {
            return res.status(400).json({ msg: "Invalid Token!" });
        }
    }
    return res.status(500).json({ msg: "User not Logged in!" });

};