const router = require('express').Router()
const blogCtrl = require('../controller/blogCtrl')
const auth = require('../middleware/auth')

router.route('/')
    .get(auth,blogCtrl.getBlogs)
    .post(auth,blogCtrl.createBlog)



router.route('/:id')
    .get(auth,blogCtrl.getBlog)
    .put(auth,blogCtrl.updateBlog)
    .delete(auth,blogCtrl.deleteBlog)


module.exports = router