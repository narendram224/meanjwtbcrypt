const jwt=  require('jsonwebtoken');

module.exports  = (req,res,next)=>{
	try{
		const token = req.headers.authrization.split(" ")[1];
		const decoded = jwt.verify(token,'secret');
		req.userData  = decoded;
		next();

	}catch(error){
		return res.status(401).json({
			message:"authrization  failed"
		})

	}
}