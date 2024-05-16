const sgMail = require("@sendgrid/mail");

module.exports.sendNewCartEmail = (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/admin-panel/contactList";
  const msg = {
    to: email,
    from: process.env.SENDGRID_ORIGIN_EMAIL,
    subject: "New request for your product ",
    html: `<h1 > Click on the link below to view the application </h1><a href="${link}">Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.acceptCart = (cartId, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/user-panel/requestedProducts/" + cartId;
  const msg = {
    to: email,
    from: process.env.SENDGRID_ORIGIN_EMAIL,
    subject: "New request for your product ",
    html: `<h1 > Your request has been approved, click on the link below to view the result and download the cart </h1><a href="${link}">Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.rejectCart = (cartId, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/user-panel/requestedProducts/" + cartId;
  const msg = {
    to: email,
    from: process.env.SENDGRID_ORIGIN_EMAIL,
    subject: " New request for your product ",
    html: `<h1 > Your request was rejected, click on the link below to see the result and the reason for the rejection </h1><a href="${link}">Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.sendForgetPasswordLink = (code, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/resetPassword?code=" + code;
  const msg = {
    to: email,
    from: process.env.SENDGRID_ORIGIN_EMAIL,
    subject: " Request forgot password ",
    html: `<h1> Click the link below to recover your password </h1><a href="${link}"> Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendContactAdmin = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/admin-panel/contactList";
  const msg = {
    to: process.env.ADMIN_EMAIL_ADDRESS,
    from: process.env.SENDGRID_ORIGIN_EMAIL,
    subject: "new contact form filled",
    html: `<h1> Click on the link below to view the list of items </h1><a href="${link}"> Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
