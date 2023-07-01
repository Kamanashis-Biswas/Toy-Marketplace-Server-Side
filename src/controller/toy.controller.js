import Toy from "../models/toy.model.js"
import {StatusCodes} from 'http-status-codes';

const createToy = async (req, res)=>{
    try{

        if(req.body){
            const {toy_name, price, avail_qty, descriptions, category, rating, photoUrl} = req.body;
            const toy = await Toy.create({
                toy_name,
                uid: req.user.uid,
                price,
                category, 
                avail_qty,
                descriptions,
                rating,
                photoUrl,
                seller_name: req.user.name,
                seller_email: req.user.email
        });
        if(toy) return res.status(StatusCodes.OK).json(toy);
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Toy not created!"});
    }
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Internal Server Error!"});
    }
};

const updateToy = async (req, res)=>{
    try{
        if(req.body){
            const {id} = req.params;
            if(!id) return res.status(400).json({msg: "Please give a valid Id!"});
            const {toy_name, price, avail_qty, descriptions, category, rating, photoUrl} = req.body;
            const toy = await Toy.findById(id);
            if(toy.uid !== req.user.uid) return res.status(400).json({msg: "you are not supposed to have the privilege to update."});
            if(!toy) return res.status(400).json({msg: "Toy Could not found to update!"});

            await toy.updateOne({
                toy_name,
                uid: req.user.uid,
                price,
                category, 
                avail_qty,
                descriptions,
                rating,
                photoUrl,
                seller_name: req.user.name,
                seller_email: req.user.email
            });
            return res.json({msg: "Toy Updated!"});
    }
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Internal Server Error!"});
    }
};

const getAllToys = async(req, res)=>{
    try{
        const {search_query} = req.query;
        const perPage = 20;
        const counts = await Toy.countDocuments();
        const page = Math.max(1, req.query.page || 1);
        let where = {};
        if(search_query.length){
            const regex = new RegExp(search_query, "i");
            where = {toy_name: regex};
        };
        const toys = await Toy.find(where)
            .skip((page - 1) * perPage)
            .limit(perPage).exec();
        if(toys){
            return res.json({
                toys,
                count: counts,
                page: page,
                perPage: perPage,
                totalPage: Math.ceil(counts/ perPage)
            })
        }
        return res.status(400).json({msg: "No Toys found!"});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error!"})
    }
}

const getMyToys = async(req, res)=>{
    try{
        const {sort_order} = req.query;
        const perPage = 20;
        const page = Math.max(1, req.query.page || 1);
        let where = {};
        if(sort_order?.length){
            if(sort_order === "asc") where = {price: 1};
            else if(sort_order === "desc") where = {price: -1};
        }
        const toys = await Toy.find({uid: req.user.uid})
            .sort(where)
            .skip((page - 1) * perPage)
            .limit(perPage).exec();
        if(toys){
            return res.json({
                toys,
                count: toys.length,
                page: page,
                perPage: perPage,
                totalPage: Math.ceil(toys.length / perPage)
            })
        }
        return res.status(400).json({msg: "No Toys found!"});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error!"})
    }
}

const deleteMyToys = async(req, res)=>{
    try{
        const {id} = req.params;
        const toy = await Toy.findOne({_id: id});
        if(!toy) return res.status(400).json({msg: "Toy Not found!"});
        if(toy.uid !== req.user.uid) return res.status(400).json({msg: "You are not authorized to delete the toy!"});
        await toy.deleteOne();
        return res.json({msg: "Toy Deleted"});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error!"});
    }
}

const getToyDetails = async(req, res)=>{
    try{

        const {id} = req.params;
        if(!id) return res.status(400).json({msg: "Toy Id not valid!"});
        const toy = await Toy.findOne({_id: id});
        if(!toy) return res.status(400).json({msg: "Toy Not found!"});
        return res.json(toy);
    }catch(err){
        return res.status(500).json("Internal Server ERror!");
    }

};

const getToysByCategory = async(req, res)=>{
    try{
        const {category} = req.query;
        const toys = await Toy.find({category});
        if(!toys) return res.status(400).json({msg: "Please input a valid category!"});
        return res.json(toys);
    }catch(err){
        return res.status(500).json({msg: "Internal Sever Error!"});
    }
};


const controller = {
    createToy,
    updateToy,
    getAllToys,
    getMyToys,
    getToyDetails,
    deleteMyToys,
    getToysByCategory
};
export default controller;