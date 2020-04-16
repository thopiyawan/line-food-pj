const request = require('request-promise');


const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer {LI/SBj+Wa/zQwgOKRi4ThmhL8La5+V68JXS7c9INXh/utQp3i+3IsTdg8Jltg9QYZLQvYRnXn5H1R+DFX7KZzG80fc7WsMLUqdDmx0NpOlIpIaYAPh+4C+F078yis2JpY1cwxyQz3AicSv1Lkjv7PQdB04t89/1O/w1cDnyilFU=}`
};
module.exports = (req, res) => {
    console.log(req)
    //const msg = req.query.msg
    //const userId = req.query.userId
    //return push(res,msg,userId);
    res.status(200)
}
const push = (res,msg,userId) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            to: userId,
            messages: [
                {
                    type: `text`,
                    text: msg
                }
            ]
        })
    }).then(() => {
        return res.status(200).send(`Done`);
    }).catch((error) => {
        return Promise.reject(error);
    });
}

