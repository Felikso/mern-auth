import { error } from "console";
import itemsModel from "../models/itemsModel.js";
import fs from 'fs';
import { succesMessage, errorMessage, removedMessage } from '../variables.js'


//add food item

const addItems = async (req,res) => {

    let image_filename = req.file ? `${req.file.filename}` : 'default.png';

    const items = new itemsModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        img:req.body.img,
    })
    try{
        await items.save()
        res.json({success:true,message: succesMessage})
    } catch(error){
        res.json({success:false,message: errorMessage})       
    }
}

// all items list
const itemsList = async (req,res) => {
    try {
        const items = await itemsModel.find({});
        res.json({success:true,data:items})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}

// all items cat
const itemsCat = async (req,res) => {
    try {
        const items = await itemsModel.find({});
        let catArr = [];
        Object.entries(items).map(([item, i]) => {
            if(!(i['category']=='undefined')&&!catArr.includes(i['category'])){
                catArr.push(i['category'])
            }})

        res.json({success:true,data:catArr})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}

//remove item
const removeItem = async (req,res) => {
    try {
        const item = await itemsModel.findById(req.body.id);
        if(item.image!=='default.png'){
            fs.unlink(`uploads/${item.image}`,()=>{})
        }

        await itemsModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message: removedMessage})
    } catch {
        res.json({success:false,message: errorMessage})
    }
}

const updateItem = async (req,res) => {
    let image_filename = req.file ? req.file.filename : 'default.png';
    try {
        await itemsModel.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename,
        });
        res.json({success:true,message:'item updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'error'})
    }
}


export {addItems,itemsList,removeItem,updateItem,itemsCat}