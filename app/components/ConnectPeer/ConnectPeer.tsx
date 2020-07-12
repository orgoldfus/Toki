import React from 'react';
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
  return (
    <div className={styles.container}>
      <p>{`Connection ID: ${connectionId}`}</p>
      {!isPeerConnected && (
        <div>
          <input />
          <button type="button" onClick={onConnectPeer}>
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
