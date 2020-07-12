import React, { useEffect, useState } from 'react';
import { getRecorder } from '../utils/audio';
import Connection from '../utils/peer';
import ConnectPeer from '../components/ConnectPeer/ConnectPeer';

export default function RecordPage() {
  const [recorder, setRecorder] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [connection, setConnection] = useState();
  const audio = new Audio();

  useEffect(() => {
    async function createRecorder() {
      if (recorder) return;
      const recorderInstance = await getRecorder();
      setRecorder(recorderInstance);
    }

    createRecorder();
    if (connection) return;
    const connectionInstance = new Connection(handleMessageReceived);
    setConnection(connectionInstance);
  }, [recorder, connection]);

  const handleMessageReceived = (data) => {
    const url = URL.createObjectURL(data);
    audio.src = url;
    audio.play();
  };

  const handleConnectPeer = (peerId) => {
    connection.connectToPeer(peerId);
  };

  const handleRecord = () => {
    setIsRecording(true);
    recorder.startRecording();
  };

  const handleStopRecording = async () => {
    await recorder.stopRecording();
    const blob = await recorder.getBlob();
    connection.sendToPeer(blob);
    setIsRecording(false);
  };

  console.log('^^^render^^^', connection && connection.peer.id);

  return (
    <ConnectPeer
      connectionId={connection && connection.peer.id}
      isPeerConnected={connection && connection.connection}
      isRecording={isRecording}
      onConnectPeer={handleConnectPeer}
      onRecord={handleRecord}
      onStopRecording={handleStopRecording}
    />
  );
}
