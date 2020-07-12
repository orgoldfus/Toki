import RecordRTC, {
  RecordRTCPromisesHandler,
  invokeSaveAsDialog,
} from 'recordrtc';

export const getRecorder = async () => {
  const mic = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
  return new RecordRTCPromisesHandler(mic, {
    type: 'audio',
    numberOfAudioChannels: 2,
    checkForInactiveTracks: true,
    bufferSize: 16384,
  });
};

export const invokeSaveDialog = (blob) => {
  return invokeSaveAsDialog(blob);
};
