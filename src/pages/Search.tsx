import { useRef, useState } from 'react';

import { usePostSpeech } from '@/api/stt';

export const Search = () => {
  const postSpeech = usePostSpeech();
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    let chunks: Blob[] = [];

    // 🔊 AudioContext로 음성 크기 측정
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);

    const checkSilence = () => {
      analyser.getByteTimeDomainData(dataArray);

      // 파형 중앙(128)에서 얼마나 벗어났는지 측정 → 작으면 무음
      const volume = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0) / dataArray.length;

      if (volume < 2) {
        // 무음 구간 시작
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            stopRecording();
          }, 5000);
        }
      } else {
        // 다시 소리 감지 → 타이머 초기화
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

      // 서버에 전송
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
    <div style={{ padding: '20px' }}>
      <h2>🎤 자동 제출 녹음기</h2>
      <button onClick={recording ? stopRecording : startRecording}>{recording ? '⏹ 수동 중지' : '🎙 녹음 시작'}</button>

      {/* {audioURL && (
        <div style={{ marginTop: '20px' }}>
          <h3>녹음된 파일</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )} */}
    </div>
  );
};
