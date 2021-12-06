import express  from "express";
import { HttpStatusCode } from "*/utilities/constants";
import { boardRoute } from "./board.route";
import { columnRoute } from "./column.route";
import { cardRoute } from "./card.route";


const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({status: 'OK!'}))

// Broad API
router.use('/boards', boardRoute)

// Column API
router.use('/columns', columnRoute)

// Card API
router.use('/cards', cardRoute)


export const apiV1 = router