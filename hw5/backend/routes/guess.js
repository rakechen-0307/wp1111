import express from 'express'
import { genNumber, getNumber } from '../core/getNumber'

const router = express.Router()

router.post('/start', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
// 去 (memory) DB 拿答案的數字
// 用 req.query.number 拿到前端輸入的數字
// check if NOT a num or not in range [1,100]
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' })
// 如果沒有問題，回傳 status
    const ans = getNumber()
    const guessNumber = req.query.number
    if ((guessNumber >= 1) && (guessNumber <= 100) && (Math.floor(guessNumber) == guessNumber)){
        if (ans == guessNumber){res.json({msg: 'Equal'})}
        else if (ans < guessNumber){res.json({msg: 'Smaller'})}
        else{res.json({msg: 'Larger'})}
    }
    else{
        res.status(406).send({msg: `${guessNumber} is not a valid number.`})
    }
})

router.post('/restart', (_, res) => {
    genNumber()
    res.json({ msg: 'The game has restarted.' })
})

export default router