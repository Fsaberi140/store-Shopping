// In Controller steht Logische teil von diese api:

const Contact = require("../models/contact");
const { sendContactAdmin } = require("./emailController");

/*
mit find wird eine Request zu Datenbank geschickt
productRequerster von Model wird aufgerufen
controller of route POST /contact
 */
module.exports.sendMessage = async (req, res) => {
    const body = req.body;
    const userId = req.user?.id; // get User Id //Id von Request bekannt geben durch authMiddleware:

    const message = await Contact.create({
        name: body.name,
        email: body.email,
        message: body.message,
        userId: userId
    })
    sendContactAdmin()// notifiy Admin a new Contact Created
    res.send(message);
}
