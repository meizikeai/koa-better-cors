module.exports = config => {
  // config
  const defaults = {
    origin: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
  }
  const options = Object.assign({}, defaults, config || {})

  if (Array.isArray(options.expose)) {
    options.expose = options.expose.join(',')
  }

  if (typeof options.maxAge === 'number') {
    options.maxAge = options.maxAge.toString()
  } else {
    options.maxAge = null
  }

  if (Array.isArray(options.methods)) {
    options.methods = options.methods.join(',')
  }

  if (Array.isArray(options.headers)) {
    options.headers = options.headers.join(',')
  }

  // middleware
  return async function cors (ctx, next) {
    let origin = false
    const source = options.origin
    if (typeof source === 'string') {
      origin = source
    } else if (source === true) {
      origin = ctx.get('origin') || '*'
    } else if (typeof source === 'function') {
      origin = options.origin(ctx.request)
    }

    if (origin === false) {
      await next()
      return
    }

    // Access-Control-Allow-Origin
    ctx.set('Access-Control-Allow-Origin', origin)

    // Access-Control-Expose-Headers
    if (options.expose) {
      ctx.set('Access-Control-Expose-Headers', options.expose)
    }

    // Access-Control-Max-Age
    if (options.maxAge) {
      ctx.set('Access-Control-Max-Age', options.maxAge)
    }

    // Access-Control-Allow-Credentials
    if (options.credentials === true) {
      ctx.set('Access-Control-Allow-Credentials', 'true')
    }

    // Access-Control-Allow-Methods
    ctx.set('Access-Control-Allow-Methods', options.methods)

    let headers = ''
    const header = options.headers

    if (header) {
      headers = header
    } else {
      headers = ctx.get('access-control-request-headers')
    }

    // Access-Control-Allow-Headers
    if (headers) {
      ctx.set('Access-Control-Allow-Headers', headers)
    }

    if (ctx.method === 'OPTIONS') {
      ctx.status = 204
    } else {
      await next()
    }
  }
}
