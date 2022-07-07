const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post("/events", async (req, res) => {
  console.log("Event Received", req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    if (content.includes("orange")) {
      data.status = 'rejected';
    } else {
      data.status = 'approved';
    }

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: id,
        content: content,
        postId: postId,
        status: data.status,
      },
    });
  }

  res.send({});

});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
