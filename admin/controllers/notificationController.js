var Notification = require('../models/Notifications');
var User = require('../../api/models/User');
var FCM = require('fcm-push');
var serverkey = '<insert-server-key>';  //
var fcm = new FCM(serverkey);

function getUsers(){
    return new Promise((reject,resolve)=>{
        User.find({}, function(err,users){
            if(err){
                reject(err);
            }
            else{
                var userTokens = [];
                users.forEach(obj => {
                    obj.deviceTokens.forEach(object => {
                        userTokens.push(object.token);
                    })
                })
                resolve(userTokens);
            }
        });
    });
}

module.exports.sendNotifs = async (request,response) => {
    var tokens = await getUsers();
    var message = {  
        to : tokens,
        collapse_key : '<insert-collapse-key>', //
        notification : {
            title : request.body.title,
            body : request.body.notifBody
        }
    };
    fcm.send(message, function(err,response){  
        if(err) {
            response.send({
                success: false,
                msg : "Something has gone wrong! "+err
            });
        } else {
            response.send({
                success: true,
                msg : "Sent Notifications to users"
            });
        }
    });
    if(!request.body.oneTime){
        var notification = new Notification({
            title : request.body.title,
            body : request.body.notifBody
        });
        notification.save((err) => {
            if(err){
                comsole.log('Cannot save notification but it was sent');
            }
        })
    }
}

module.exports.getNotifications = (request,response) =>{
    Notification.find({})
    .limit(perPage)
    .skip((perPage * request.body.page) - perPage)
    .exec(function(err, notifications){
        if(err){
            console.log(err+ "");
            response.send({
                success:false,
                msg: err +""
            });
        }
        else{
            Notification.count(query, function(err, count){
                response.send({
                    success:true,
                    notifications: notifications,
                    page: request.body.page,
                    perPage:perPage,
                    pageCount: Math.ceil(count/perPage)
                });
            })
            
        }
    });
}

module.exports.deleteNotification = (request,response) => {
    Notification.findByIdAndRemove(request.params.id,function(err){
        if(err){
            console.log(err);
            response.send({
                success:false,
                msg: err + ""
            });
        }
        else{
            response.send({
                success:true,
                msg: "Notification deleted"
            });
        }  
    })
}