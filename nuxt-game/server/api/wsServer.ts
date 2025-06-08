// import express from 'express'
// import { WebSocketServer } from 'ws'
// import type { IncomingMessage } from 'http'
// import type { Socket } from 'net'
//
// const app = express()
// app.use(express.json())
//
// const clients = new Set<WebSocket>()
//
// export const setupWebSocket = (server: any) => {
//
//     console.log('🟢 WebSocket сервер инициализирован')
//     cosole.log("запустился")
//     const wss = new WebSocketServer({ noServer: true })
//
//     // Обработка подключения WebSocket
//     server.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
//         if (req.url === '/ws') {
//             wss.handleUpgrade(req, socket, head, (ws) => {
//                 wss.emit('connection', ws, req)
//             })
//         } else {
//             socket.destroy()
//         }
//     })
//
//     // Подключение клиента
//     wss.on('connection', (ws) => {
//         clients.add(ws)
//         console.log('🧍 Клиент подключён. Всего клиентов:', clients.size)
//
//         if (clients.size > 1) {
//             ws.send(JSON.stringify({ type: 'setPlayer', state: 2 }))
//         } else {
//             ws.send(JSON.stringify({ type: 'setPlayer', state: 1 }))
//         }
//
//         ws.on('close', () => {
//             clients.delete(ws)
//             console.log('🚪 Клиент отключён. Осталось клиентов:', clients.size)
//         })
//     })
//
//     // REST endpoint для отправки данных всем клиентам
//     app.post('/broadcast', (req, res) => {
//         const gameState = req.body
//
//         for (const client of clients) {
//             if (client.readyState === 1) {
//                 client.send(JSON.stringify({ type: 'update', state: gameState }))
//             }
//         }
//
//         res.sendStatus(200)
//     })
//
//     // Подключаем Express к тому же серверу
//     server.on('request', app)
// }


// server/wsServer.ts
import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
app.use(express.json())

const clients = new Set<WebSocket>()

export const setupWebSocket = (server: any) => {
    const wss = new WebSocketServer({ noServer: true })

    console.log('🟢 WebSocket сервер инициализирован')

    server.on('upgrade', (req, socket, head) => {
        if (req.url === '/ws') {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req)
            })
        } else {
            socket.destroy()
        }
    })

    wss.on('connection', (ws) => {
        clients.add(ws)
        console.log('🧍 Клиент подключён. Всего:', clients.size)

        ws.on('message', (message) => {
            console.log('📩 Получено сообщение:', message.toString())
        })

        ws.on('close', () => {
            clients.delete(ws)
            console.log('🚪 Клиент отключён. Осталось:', clients.size)
        })
    })
}
