import Messages from "../model/messageModel.js";

export async function addMessage(req,res,next){
try{
const {from,to,message}=req.body;
const data = await Messages.create({
    message:{text: message},
    users: [from,to],
    sender: from,
})

if(data) return res.json({msg:"Message added"});
else return res.json({msg: "Failed"})
}
catch(ex){
    next(ex)
}
}

export async function getAllMessage(req,res,next){
try{
    const {from,to} = req.body;
    const messages = await Messages.find({
        users:{
            $all:[from,to],
        },
    }).sort({updatedAt:1});
    const projectMessages = messages.map((msg)=>{
        return {
            fromSelf:(msg.sender.toString() === from),
            message:msg.message.text,
        }
    })
    res.json(projectMessages)
}
catch(ex){
    next(ex)
}
}


