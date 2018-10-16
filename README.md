koa-better-cors
===

CORS middleware for Koa

## Installation

[https://npmjs.org/package/koa-better-cors](https://npmjs.org/package/koa-better-cors)

```bash
$ npm install koa-better-cors
```

## Usage

```javascript
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-better-cors')

const app = new Koa()
const router = new Router()

app.use(cors())

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World'
})

app.use(router.routes())

app.listen(10086)
```

## Options
```javascript
// example
// {
//   credentials: true,
//   expose: ['Cache-Control','Content-Type'],
//   headers: ['Accept','Content-Type'],
//   maxAge: 600,
//   methods: ['GET','HEAD','PUT','POST','DELETE'],
//   origin: 'https://www.love.com',
// }

// defaults
// const defaults = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,POST,DELETE',
// }
```

## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)