import * as fun from './callFunction'
import * as db from './database'

export const ENV_PRODUCTION = '<生产环境云ID>'
    , ENV_DEVELOPMENT = '<开发环境云ID>'
    , MODEL = fun.MODEL
    , FUNC = fun.FUNC
    , callFunction = fun.callFunction
    , getDocument = db.getDocument