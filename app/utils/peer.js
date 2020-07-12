import Peer from 'peerjs';

export default class Connector {
  constructor(messageHandler) {
    this.peer = new Peer({
      host: 'peerjs-server.herokuapp.com',
      secure: true,
      port: 443,
    });
    this.messageHandler = messageHandler;
    // this.connections = []

    this.peer.on('connection', (conn) => {
      console.log(`connection received. metadata: ${conn.metadata}`);
      conn.on('data', this.messageHandler);
    });
  }

  connectToPeer(peerId) {
    const conn = this.peer.connect(peerId);

    conn.on('open', () => {
      console.log(`connection to peer ${peerId} is now open`);
    });

    conn.on('data', this.messageHandler);

    this.connection = conn;
    // this.connections.push(conn);
  }

  sendToPeer(data) {
    this.connection.send(data);
  }
}
