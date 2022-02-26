const Blogs = require('../models/blogModel')

const blogCtrl = {
    getBlogs: async (req,res)=>{
        try{
            const blogs = await Blogs.find({user_id: req.user.id})
            res.json(blogs)
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createBlog: async (req,res)=>{
        try{
            const {title,content,date} = req.body
            const newBlog = new Blogs({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newBlog.save()
            res.json({msg:"create blog"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteBlog: async (req,res)=>{
        try{
            await Blogs.findByIdAndDelete(req.params.id)
            res.json({msg:"delete"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateBlog: async (req,res)=>{
        try{
            const {title,content,date} = req.body
            await Blogs.findByIdAndUpdate({_id:req.params.id},{
                title,
                content,
                date
            })
            res.json({msg:"update blog"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getBlog: async (req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            res.json(blog)
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = blogCtrl