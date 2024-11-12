import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import transporter from "../utils/transporter.js";
/* import Stripe from "stripe"; */
import { customErrors, customInfo ,verifyUrl, frontend_url, deliveryChargesMess, modePayment, oderSlug, removedMessage, errorMessage } from '../utils/variables.js'



import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "../utils/emailTemplates.js";

/* const stripe = Stripe(process.env.STRIPE_SECRET_KEY); */

//placing user order for frontend
const placeOrder = async (req,res) => {

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();


    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
        })
        await newOrder.save();


        var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'kod weryfikacyjny',
            //text: ` przepisz kod we wskazanym miejscu  ${verificationToken}`
			html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}','test'),
			//html: `<h2>${verificationToken}<h/2><p>lol</p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });


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

const verifyOrderCode = async (req, res) => {
	const { code } = req.body;
	try {
		const order = await orderModel.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!order) {
			return res.status(400).json({ success: false, message: customErrors.expiriedCode});
		}

		order.isVerified = true;
		order.verificationToken = undefined;
		order.verificationTokenExpiresAt = undefined;
		await order.save();

		//await sendWelcomeEmail(user.email, user.name);

		/** mail */
		var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'potwierdzone zamówienie w trakcie realizacji',
			html: PASSWORD_RESET_REQUEST_TEMPLATE

          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(customInfo.emailSent + info.response);
              //return res.json({success:true,message:'shortPassMess'}) 
            }
          });

		res.status(200).json({
			success: true,
			message: customInfo.emailSentSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

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



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,removeOrder,verifyOrderCode}