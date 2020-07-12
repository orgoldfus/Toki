import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './ConnectPeer.css';

export default function ConnectPeer({
  connectionId,
  isPeerConnected,
  isRecording,
  onConnectPeer,
  onStopRecording,
  onRecord,
}) {
  const [peerId, setPeerId] = useState('');
  const onChangePeerId = (event) => {
    console.log('peer id changed', event.target.value);
    setPeerId(event.target.value);
  };

  return (
    <div className={styles.container}>
      <p>{`Connection ID: ${connectionId}`}</p>
      {!isPeerConnected && (
        <div>
          <input onChange={onChangePeerId} />
          <button type="button" onClick={() => onConnectPeer(peerId)}>
            Connect to peer
          </button>
        </div>
      )}
      {isPeerConnected && (
        <div>
          <button
            type="button"
            onClick={isRecording ? onStopRecording : onRecord}
          >
            {isRecording ? 'Stop Recording' : 'Record'}
          </button>
        </div>
      )}
      <Link to={routes.HOME}>Go home</Link>
    </div>
  );
}
