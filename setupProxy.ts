import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware'

module.exports = function (app: { use: (arg0: string, arg1: RequestHandler) => void }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mphlz5jhpg.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
    }),
  )
}
