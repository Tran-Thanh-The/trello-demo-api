import { WHITELIST } from "../utilities/constants"

export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 
}