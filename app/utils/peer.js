import Peer from 'peerjs';

export default class Connector {
  constructor(messageHandler) {
    this.peer = new Peer({
      host: '9000-b3bb8487-06a8-4e6d-871d-fd6e81b99764.ws-eu01.gitpod.io',
      secure: true,
      key: 'peerjs',
    });
    this.messageHandler = messageHandler;
    // this.connections = []

    this.peer.on('connection', (conn) => {
      console.log(`connection received. metadata: ${conn.metadata}`);
      conn.on('data', this.messageHandler);
    });
  }

  connectToPeer(peerId) {
    console.log(`connecting to ${peerId}`);
    const conn = this.peer.connect(peerId);
    console.log('connect was invoked');

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
