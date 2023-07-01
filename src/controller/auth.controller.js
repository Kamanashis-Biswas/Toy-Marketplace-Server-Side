const setCookies = (req, res)=>{
    try{
        const {__session} = req.body;
        if(!__session) return res.status(400).json({msg: "Cookie not valid!!"});
        res.cookie('__session', __session, {
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60,
            domain: '.vercel.app'
        });
        return res.send("Cookie Sent!");
    }catch(err){
        return res.status(500).json({msg: "Internal Server Error!"});
    }
};

export default {
    setCookies
};