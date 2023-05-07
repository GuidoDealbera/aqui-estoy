// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>  COMANDS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >> https://console.cloud.google.com/

// >> URI de redireccionamiento autorizados
// https://developers.google.com/oauthplayground

// >> https://developers.google.com/oauthplayground

// >> Authorize APis
// https://mail.google.com/

// npm i googleapis --save

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>  account_transport.json  >>>>>>>>>>>>>>>>

// {
//   "service": "gmail",
//   "auth": {
//     "type": "OAuth2",
//     "user": "TU_CORREO___OJO____@gmail.com",
//     "clientId": "",
//     "clientSecret": "",
//     "refreshToken": ""
//   }
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>  app.js  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

// const accountTransport = require("./account_transport.json");

// const mail_rover = async (callback) => {
//   const oauth2Client = new OAuth2(
//     accountTransport.auth.clientId,
//     accountTransport.auth.clientSecret,
//     "https://developers.google.com/oauthplayground"
//   );
//   oauth2Client.setCredentials({
//     refresh_token: accountTransport.auth.refreshToken,
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   oauth2Client.getAccessToken((err, token) => {
//     if (err) return console.log(err);
//     accountTransport.auth.accessToken = token;
//     callback(nodemailer.createTransport(accountTransport));
//   });
// };

// // ......
// // ...
// // .........
// // ...

// function send(idAplicativo, calback) {
//   var id = 0;
//   try {
//     var id = parseInt(idAplicativo);
//   } catch (error) {
//     console.log(`error parse idAplicativo feedback.js ${error}`);
//   }
//   mail_rover(function (emailTransporter) {
//     switch (id) {
//       case _ID_APP_1:
//         json = {
//           url: _SERVER + "check/",
//           mail: emailTransporter,
//           app: "CHECK",
//           from: "Check <check@planck.biz>",
//           to: "CHECK <check@planck.biz>",
//           slogan: "😋 Comida exquisita, entregas simples. 🛵 Compra YA! 👇🏻",
//           body_bienvanida: "Mensaje personalizado",
//           head_bienvanida:
//             "En Check pide a tu local favorito, o chatea con un asesor por medicina, y te lo llevamos lo antes posible.",
//           bcc: "Info <planck.biz@gmail.com>",
//           head: head,
//           footer: footer,
//         };
//         return calback(json);
//       default:
//         json = {
//           url: _SERVER + "check/",
//           mail: emailTransporter,
//           app: "CHECK",
//           from: "Check <check@planck.biz>",
//           to: "CHECK <check@planck.biz>",
//           slogan: "😋 Comida exquisita, entregas simples. 🛵 Compra YA! 👇🏻",
//           body_bienvanida: "Mensaje personalizado",
//           head_bienvanida:
//             "En Check pide a tu local favorito, o chatea con un asesor por medicina, y te lo llevamos lo antes posible.",
//           bcc: "Info <planck.biz@gmail.com>",
//           head: head,
//           footer: footer,
//         };
//         return calback(json);
//     }
//   });
// }
