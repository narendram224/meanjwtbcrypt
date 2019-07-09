const express = require('express')

const router  = express.router();
const checkAuth = require('../miiddleware/check-auth');
const Book = require('../../model/book');

router.get("/all-books",checkAuth,(req,res,next)=>{
	Book.find().exec()
	.then(docs=>{
		const response  = {
			book:docs.map(doc=>{
				return {
				title:doc.title,
				auther:doc.auther,
				_id:doc._id,
				isbn:doc.isbn,
				price:doc.price	,		
				};
			})
		}
		res.status(200).json(response);
		})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});
});

router.get("/book-details/:bookId",checkAuth,(req,res,next)=>{
	Book.find({_id:id})
	.exec()
	.then(docs=>{
		const response = {
			book:docs.map(doc=>{
				return{
				title:doc.title,
				auther: doc.auther,
				_id:doc._id,
				isbn:doc.isbn,
				price:doc.price,
			};
			})
		}
		res.status(200).json(response)
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		})
	})
});

router.post("/add-book",checkAuth,(req,res,next)=>{
	const Book = new Book({
		title:req.body.title,
		auther:req.body.auther,
		isbn:req.body.isbn,
		price:req.body.price
	})

	Book.save()
	.then(result=>{
		console.log(result);
		res.status(200).json({
			message:    "book successfully updated"
	})
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		})
	})
})

router.patch("/update-book/:bookId",checkAuth,(req,res,next)=>{
	const id = req.params.bookId;
	const updateOpt = {};
	console.log(req.body);

	Book.update({_id:id},{$set:req.body})
	.exec()
	.then(result=>{
		res.status(200).json({
		message:"dta is updated"
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		})
	})

})


router.delete("delete-book/:bookId",checkAuth,(req,res,next)=>{

	const id= req.params.bookId;

	consol.log(id);
	Book.remove({_id:id}).exec()
	.then(result=>{
		res.status(200).json({
			message:'book deleted',
		})
	}).catch(err=>{
		res.status(500).json({
			error:err
		});
	});

	
});
module.exports= router;