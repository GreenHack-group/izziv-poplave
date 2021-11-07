// server.js
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const { Expo } = require("expo-server-sdk");
const app = express();
const port = 4000;

let expo = new Expo();
const BASE_URL = "https://pozivnikapi20211106154402-apim.azure-api.net/api/Map";

const lastDataTrigger = async () => {
  await axios.post(`${BASE_URL}/lastData`, {});
};

const fetchNotifications = async () => {
  const response = await axios.post(`${BASE_URL}/notification`, {});
  const data = response.data;
  return data;
};

const createMessages = (notifications) => {
  const { Message, Tokens } = notifications;
  let messages = [];
  for (let token of Tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: token,
      sound: "default",
      body: Message,
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  sendNotifications(chunks);
};

const sendNotifications = async (chunks) => {
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};

// Schedule tasks to be run on the server.
cron.schedule("*/10 * * * *", async function () {
  console.log("running every 10 min task seconds");
  await lastDataTrigger();
  const notifications = await fetchNotifications();
  if (notifications.Tokens && notifications.Tokens.length > 0) {
    createMessages(notifications);
  }
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
