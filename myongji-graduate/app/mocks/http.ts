// msw가 RSC에서 동작하지 않는 이슈 발생 - 참고: https://github.com/mswjs/msw/issues/1644
// 이슈 해결을 위해 아래의 코드를 추가함
// https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052

import express from 'express'
import { createMiddleware } from '@mswjs/http-middleware'
import { handlers } from './handlers.mock'

const app = express()
const port = 9090

app.use(express.json())
app.use(createMiddleware(...handlers))

app.listen(port, () => console.log(`Mock server is running on port: ${port}`))