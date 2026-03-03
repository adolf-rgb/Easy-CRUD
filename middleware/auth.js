module.exports = function(req,res,next){
    if(req.session && req.session.admin) return next();
    return res.status(401).send("401 Unauthorized");
};
