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
  }, [recorder]);

  const handleMessageReceived = (data) => {
    const url = URL.createObjectURL(data);
    audio.src = url;
    audio.play();
  };

  const handleConnectPeer = (peerId) => {
    const conn = new Connection(handleMessageReceived);
    conn.connectToPeer(peerId);
    setConnection(conn);
  };

  const handleRecord = () => {
    setIsRecording(true);
    recorder.startRecording();
  };

  const handleStopRecording = async () => {
    await recorder.stopRecording();
    const blob = await recorder.getBlob();
    connection.sendToPeer(blob);
    // const url = URL.createObjectURL(blob);
    // audio.src = url;
    // audio.play();
    setIsRecording(false);
  };

  return (
    <ConnectPeer
      isPeerConnected={!!connection}
      isRecording={isRecording}
      onConnectPeer={handleConnectPeer}
      onRecord={handleRecord}
      onStopRecording={handleStopRecording}
    />
  );
}
