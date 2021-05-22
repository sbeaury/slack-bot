const SlackBot = require("slackbots");
const dotenv = require("dotenv");
const cron = require("node-cron");
const express = require("express");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "Timesheet Bot",
});

function createJob() {
  const task = cron.schedule(
    "57 13 * * 1-6",
    () => {
      bot.postMessageToChannel(
        "general",
        "Time to fill up your timesheet guys"
      );
    },
    {
      scheduled: true,
      timezone: "America/Toronto",
    }
  );

  task.start();
}

bot.on("start", function () {
  createJob();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.use("/home", (req, res) => {
//   res.status(200).json({ message: "Connected to Timesheet Bot API" });
// });
