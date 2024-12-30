import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { MediaServer } from './media/MediaServer';
import cors from 'cors';
import { supabase } from './config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const mediaServer = new MediaServer();

app.use(cors());
app.use(express.json());

// Initialize MediaSoup
mediaServer.init().catch(console.error);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-room', async (roomId) => {
    const room = await mediaServer.createRoom(roomId);
    socket.join(roomId);
    
    // Handle WebRTC signaling
    socket.on('transport-connect', async ({ transportId, dtlsParameters }) => {
      await room.connectTransport(transportId, dtlsParameters);
    });

    socket.on('transport-produce', async ({ transportId, kind, rtpParameters }, callback) => {
      const producer = await room.createProducer(transportId, kind, rtpParameters);
      callback({ id: producer.id });
    });

    socket.on('transport-consume', async ({ producerId, rtpCapabilities }, callback) => {
      const { transport, consumer } = await room.createConsumer(producerId, rtpCapabilities);
      callback({ transport, consumer });
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});