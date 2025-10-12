import express from 'express';
import { WebSocketServer } from 'ws'
import { softwareEngineerQuestions } from './question.js';
const PORT = 3000;

const app = express()

const server =
    app.listen(PORT, () => {
        console.log(`server is running at ${PORT}`);

    })
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




wss.on('connection', (ws) => {
    ws.on('error', console.error);
    console.log('connected'); 
    let set = new Set();
    let score = 0;
    let streak = 0;
    ws.on('message', (event) => {
        event = JSON.parse(event.toString());
        console.log('got message: ', event);
        const { type, payload } = event
        let questionIndex;
        if (type === 'getQuestion') {

            questionIndex = generateQuestion(set);
            console.log(questionIndex);

            console.log(softwareEngineerQuestions[questionIndex]);


            let data = {
                id: questionIndex,
                question: softwareEngineerQuestions[questionIndex].question
            }
            console.log(data);
            
            ws.send(JSON.stringify({ data, type: 'question' }));

        }
        if (type === 'Answer') {
            console.log('correct answer: ', softwareEngineerQuestions[payload.id].answer.toLowerCase());
            console.log('given answer: ', payload.answer);

            let isAnswerCorrect = softwareEngineerQuestions[payload.id].answer.toLowerCase() === payload.answer.toLowerCase()
            if (isAnswerCorrect) {
                streak++;

                const maxTime = 10;
                const basePoints = Math.floor((payload.timeLeft / maxTime) * 100);
                const streakBonus = Math.min(streak * 7, 35);
                const total = basePoints + streakBonus;
                score += total;
                ws.send(JSON.stringify({
                    type: 'checkAnswer',
                    data: { isCorrect: true, earned: total, streak, score }
                }));
            } else {
                streak = 0;
                ws.send(JSON.stringify({
                    type: 'checkAnswer',
                    data: { isCorrect: false, earned: 0, streak, score }
                }));
            }





        }
        // if (type === 'score') {
        //     console.log(`score: ${score}`);

        //     ws.send(JSON.stringify({ type: 'score', data: score }))
        // }

    })


})

