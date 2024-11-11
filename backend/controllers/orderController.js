import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
/* import Stripe from "stripe"; */
import { verifyUrl, frontend_url, deliveryChargesMess, modePayment, oderSlug, removedMessage, errorMessage } from '../variables.js'

/* const stripe = Stripe(process.env.STRIPE_SECRET_KEY); */

//placing user order for frontend
const placeOrder = async (req,res) => {

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:'pln',
                product_data:{
                    namie:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'pln',
                product_data:{
                    name:deliveryChargesMess
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

/*         const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:modePayment,
            success_url: `${frontend_url}/verify?succes=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?succes=false&orderId=${newOrder._id}`,

            
        res.json({success:true,session_url:session.url})

        }) */

           // const session = `${frontend_url}${verifyUrl}?success=true&orderId=${newOrder._id}`
          // const session = `${frontend_url}/${oderSlug}`;
          const session = `${frontend_url}/${oderSlug}?success=true&orderId=${newOrder._id}`

        res.json({success:true,session_url:session})
    } catch (error) {
        res.json({success:false,message:'error :('})
    }

}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if(success=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:'paid'})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:'error with paid'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error ;('})
        
    }
}

//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:'error'})
    }
}

//listing orders for admin panel

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
    res.json({success:false,message:'error ;('})        
    }
}

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:'status updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'error'})
    }
}

//remove item
const removeOrder = async (req,res) => {

    try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        console.log(req.body.orderId)
        res.json({success:true,message: 'sdf'})
    } catch {
        res.json({success:false,message: errorMessage})
    }
}



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,removeOrder}