// // ws-server.js
// import { WebSocketServer } from 'ws'
// import { createServer } from 'http'
//
// const server = createServer()
//
// const wss = new WebSocketServer({ noServer: true })
//
// server.on('upgrade', (request, socket, head) => {
//     if (request.url === '/ws') {
//         wss.handleUpgrade(request, socket, head, (ws) => {
//             wss.emit('connection', ws, request)
//         })
//     } else {
//         socket.destroy()
//     }
// })
//
// wss.on('connection', (ws) => {
//     console.log('🔌 Клиент подключился')
//
//     ws.on('message', (message) => {
//         console.log('📩 Получено сообщение:', message.toString())
//         ws.send('✅ Принято: ' + message)
//     })
//
//     ws.on('close', () => {
//         console.log('❌ Клиент отключен')
//     })
// })
//
// server.listen(3001, () => {
//     console.log('🧠 WebSocket сервер слушает порт 3001')
// })
