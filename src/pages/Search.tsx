import { useEffect, useRef, useState } from 'react';

import { type PostSpeechResponse, usePostSpeech } from '@/api/stt';

interface SearchProps {
  handleSearchResultFalse: () => void;
  handleSearchResultTrue: (data: PostSpeechResponse) => void;
}
export const Search = ({ handleSearchResultFalse, handleSearchResultTrue }: SearchProps) => {
  const postSpeech = usePostSpeech();
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    handleSearchResultFalse();
  }, [recording]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    let chunks: Blob[] = [];

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);

    const checkSilence = () => {
      analyser.getByteTimeDomainData(dataArray);

      const volume = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0) / dataArray.length;

      if (volume < 2) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            stopRecording();
          }, 5000);
        }
      } else {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }

      if (recording) requestAnimationFrame(checkSilence);
    };

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      chunks = [];

      sendToServer(audioBlob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
    checkSilence();
  };

  const sendToServer = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    postSpeech(formData, {
      onSuccess: (data) => {
        console.log('here', data);

        handleSearchResultTrue(data);
      },
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  return (
    <button onClick={recording ? stopRecording : startRecording} className="w-[270px] h-[270px]">
      {recording ? (
        <object className="pointer-events-none" data="icons/voicebtn_active.svg" width="100%" height="100%" />
      ) : (
        <object className="pointer-events-none" data="icons/voicebtn.svg" width="100%" height="100%" />
      )}
    </button>
  );
};
