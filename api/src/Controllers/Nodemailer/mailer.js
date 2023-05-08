require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, REDIRECT_URI } = process.env;
const mailer = async () => {
  const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI // Esta URL no importa en realidad, solo es necesaria para OAuth2
  );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      type: "OAuth2",
      user: "aquiestoy.prueba01@gmail.com",
      clientId: oauth2Client.CLIENT_ID,
      clientSecret: oauth2Client.CLIENT_SECRET,
      refreshToken: oauth2Client.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
  return transporter;
};

module.exports = mailer;
