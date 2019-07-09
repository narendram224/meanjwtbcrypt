const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{

	//cheking for email alrealy exits

	console.log(req.body.email);
	User.find({email:req.body.email}).exec()
	.then(user=>{
		if (user.length>=1) {
			return res.status(409).json({
				message:'email already exist'
			})
		} else {
			bcrypt.hash(req.body.password,10,(err,hash)=>{
				if (err) {

					return res.status(500).json({
						error:err
					})
				} else {
					//creating the insyance of the user
					const user = new User({
						_id = mongoose.Types.ObjectId(),
						email:req.body.email,
						password:hash,
						name:req.body.name,
						user_type:'user',
					})
					user.save().then(result=>{
						res.status(201).json({
							message:'User created successfully',
						})
					}).catch(err=>{
						res.status(500).json({
							message:'failure to create user',
							error:err
						})
					})
				}

			})
		}
	})
})


router.post('/admin-signup',(req,res,next)=>{
	console.log(req.body.email);
	User.find({email:req.body.email}).exec()
	.then(user=>{
		if(user.length>=1){
			res.status(409).json({
			message:'email is already exist'
			})

		}else{
			bcrypt.hash(req.body.password,10,(err,hash)=>{
				if (err) {
					return res.status(500).json({
						error:err
					})
				}else{
					const user = new User({
						_id:mongoose.Types.ObjectId(),
						email:req.body.email,
						password:hash,
						name:req.body.name,
						user_type:'admin'
					})
					user.save()
					.then(result=>{
						res.status(201).json({
							message:'admin successfully created',
						})
					}).catch(err=>{
						res.status(500).json({
							error:err
						});
					});
				}
			})
		}
		
	})
})


router.post('/login',(req,res,next)=>{

	console.log(req.body.email);
	console.log(req.body.password);

	User.find({email:req.body.email})
	.exec()
	.then(user=>{
		if (user.length<1) {
			return res.status(409).json({
				message:'auth failure'
			})
		}
		bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
			if (err) {
				return res.status(401).json({
					message:'auth failed'
				})
			} if(result) {
				const token = jwt.sign({
					email:user[0].email,
					userId :user[0]._id
				},
				'secret',{
					expiresIn:"1h"
				}

				)
				return res.status(200).json({
					message:"auth successfull",
					user_type:user[0].user_type,
					token:token
				});
			}
			res.status(401).json({
				message:"auth failed"
			});
		})
	}).catch(err=>{
		res.status(500).json({
			error:err
		});
	});
});

module.exports = router;