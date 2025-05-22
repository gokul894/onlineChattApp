import { getIO } from "../sockets";
import { onlineUsers } from "../sockets/onlineUsersMap";



function sendMessage(req, res) {

    const senderId = req.User.id;
    const {recieverId, text} = req.body;
    let smsRecieved = false;

    console.log('here reciever and text', recieverId, text) // just for debug purpose

    const recieverSocketId = onlineUsers.get(recieverId);

    if(recieverSocketId){

        getIO().to(recieverSocketId).emit('smsDelivery', {}, (ack) => {
            if(ack === 'delivered'){
                smsRecieved = true;

                // client side code
                // Socket.on('smsDelivery', (sms, callback) => {
                //     console.log(sms)
                //     callback('delivered')
                // })

            };
        });

    }else{
        if(!smsRecieved){
            //then store massage in database with enbale flag deleverd: false;
        }
    }

};

//-----------------------------------


export {sendMessage, deleteMessage};
