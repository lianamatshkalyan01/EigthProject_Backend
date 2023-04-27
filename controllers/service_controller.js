const { Service, Category} = require(".")

function service_get(req, res){
    Service.findAll({include: Category}).then((services)=>{
        res.json(services)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function service_get_id(req, res){
    const {service_id}=req.params
    Service.findAll({where:{id:service_id}}).then((services)=>{
        res.json(services)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function service_post(req, res){
    const {name, price, image, category_id}=req.body
    Service.create({name, price, image, category_id}).then((service)=>{
        res.status(201).json(service)
    }).catch((err)=>{
        res.status(500).json({err:err.message})
    })
}

function service_put(req, res){
    const{service_id}=req.params
    const {name, price, image}=req.body
    Service.update({name:name, price:price, image:image}, {where:{id:service_id}}).then((service)=>{
        res.status(201).json(service)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

function service_delete(req, res){
    const{service_id}=req.params
    Service.destroy({where:{id:service_id}}).then((service)=>{
        res.status(201).json(service)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

module.exports = {
    service_get, service_get_id, service_post, service_put, service_delete
    
}