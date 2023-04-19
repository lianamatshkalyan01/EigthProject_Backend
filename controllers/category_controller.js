const { Category } = require(".")

function category_get(req,res){
    Category.findAll().then((category)=>{
        res.json(category)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function category_get_id(req, res){
    const {id}=req.params
    Category.findByPk(id).then((category)=>{
        res.json(category)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function category_post(req, res){
    const name = req.body.name
    Category.create({name}).then((category)=>{
        res.status(201).json(category)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function category_put(req,res){
    const {id}=req.params
    const {name} = req.body
    Category.update({name:name}, {where:{id:id}}).then((category)=>{
        res.status(201).json(category)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function category_delete(req, res){
    const {id}=req.params
    Category.destroy({where: {id}}).then((category)=>{
        res.status(201).json(category)
    }).catch((err)=>{
        res.status(500).json({error: err.message})
    })
}

module.exports = {
    category_get, category_get_id, category_post, category_put, category_delete
    
}