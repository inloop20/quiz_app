import 'dotenv/config';
import express from "express";
import { WebSocketServer } from "ws";
import { questions } from "./question.js";
import { connectRedis } from "./util.js";
const PORT = 3000;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
const wss = new WebSocketServer({ server });

const generateQuestion = (set) => {
  if (set.size >= 50) return false;

  let index;
  do {
    index = Math.floor(Math.random() * 50) + 1;
  } while (set.has(index));

  set.add(index);
  return index;
};

const getLeaderboard = async (redis, page, username = "") => {
  const raw = await redis.zrevrange(
    "leaderboard",
    page * 20,
    page * 20 + 19,
    "WITHSCORES"
  );
  const leaderboard = [];

  for (let i = 0; i < raw.length; i += 2) {
    leaderboard.push({
      rank: page * 20 + i / 2 + 1,
      username: raw[i],
      score: parseInt(raw[i + 1], 10),
    });
  }

  return { leaderboard: leaderboard };
};

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  const redis = connectRedis();
  let set = new Set();
  let score = 0;
  let streak = 0;
  ws.on("message", async (event) => {
    try {
      event = JSON.parse(event.toString());
      const { type, payload } = event;
      let questionIndex;
      if (type === "getQuestion") {
        questionIndex = generateQuestion(set);
        let data = {
          id: questionIndex,
          question: questions[questionIndex].question,
        };

        ws.send(JSON.stringify({ data, type: "question" }));
      }
      if (type === "Answer") {
        let isAnswerCorrect =
          questions[payload.id].answer.toLowerCase() ===
          payload.answer.toLowerCase();
        if (isAnswerCorrect) {
          streak++;
          const maxTime = 10;
          const basePoints = Math.floor((payload.timeLeft / maxTime) * 100);
          const streakBonus = Math.min(streak * 7, 35);
          const total = basePoints + streakBonus;
          score += total;
          ws.send(
            JSON.stringify({
              type: "checkAnswer",
              data: { isCorrect: true, earned: total, streak, score },
            })
          );
        } else {
          streak = 0;
          ws.send(
            JSON.stringify({
              type: "checkAnswer",
              data: { isCorrect: false, earned: 0, streak, score },
            })
          );
        }
      }
      if (type === "submitScore") {
        const existScore = await redis.zscore("leaderboard", payload.username);
        if (existScore === null || Number(existScore) < Number(payload.score)) {
          await redis.zadd(
            "leaderboard",
            Number(payload.score),
            payload.username
          );
          const leaderboard = await getLeaderboard(redis, 0, payload.username);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "getLeaderboard",
                  data: leaderboard,
                })
              );
            }
          });
        }
      }
      if (type === "getLeaderboard") {
        let raw = await redis.zrevrange(
          "leaderboard",
          payload.page * 20,
          payload.page * 20 + 19,
          "WITHSCORES"
        );
        const leaderboard = [];
        for (let i = 0; i < raw.length; i += 2) {
          leaderboard.push({
            rank: payload.page * 20 + i / 2 + 1,
            username: raw[i],
            score: parseInt(raw[i + 1], 10),
          });
        }
        let rank = await redis.zrevrank("leaderboard", payload.username);
        ws.send(
          JSON.stringify({
            type: "getLeaderboard",
            data: { leaderboard, rank: rank === null ? "unranked" : rank + 1 },
          })
        );
      }
      // if (type === 'score') {
      //     console.log(`score: ${score}`);

      //     ws.send(JSON.stringify({ type: 'score', data: score }))
      // }
    } catch (error) {
      console.warn("something went wrong: ", error.message);
    }
  });
});
