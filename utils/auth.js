const jwt = require("jsonwebtoken");

exports.sendToken = (user, req, res, statuscode) => {
    const token = user.gettoken();

    res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        // expires: new Date(Date.now() + 20*1000),
        httpOnly: true,
        // secure: true
    });

    res.json({ message: "user logged in", token });
};

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const { id } = jwt.verify(token, "SECRETKEYJWT");
        req.id = id;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res
                .status(500)
                .json({ message: "can not access the resource" });
        } else if (error.name === "TokenExpiredError") {
            res.status(500).json({ message: "session timeout! login again" });
        } else {
            res.status(500).json(error);
        }
    }
};
