import { faMicrophone, faMicrophoneAlt, faMicrophoneSlash, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';

const VoiceRecorder = ({ recording, setRecording, sendVN }) => {
  //const [recording, setRecording] = useState(false);
  const audioRef = useRef(null); // Initialize with null
  const [record, setRecord] = useState(null)
  const [timer, setTimer] = useState(0);
  const timerInterval = useRef(null);



  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = event => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecord(audioUrl)
      sendVN(audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);

    timerInterval.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    // Store the mediaRecorder and stream in the audioRef to access later
    audioRef.current = {
      mediaRecorder,
      stream,
      timerInterval: timerInterval.current,
    };
  };

  const stopRecording = () => {
    if (audioRef.current) {
      audioRef.current.mediaRecorder.stop();
      audioRef.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(audioRef.current.timerInterval); // Clear the timer interval
      setRecording(false);
      setTimer(0);
    }
  };

  const deleteRecording = () => {
    if (audioRef.current) {
      clearInterval(audioRef.current.timerInterval); // Clear the timer interval
      setRecording(false);
      setTimer(0);
      audioRef.current.stream.getTracks().forEach(track => track.stop());
      audioRef.current = null;
    }
  };

  return (
    <div>
      <div>
        {/* {!record && <audio ref={audioRef} src={record ?? ''} controls />} */}
        {recording ? (
          <>
            <FontAwesomeIcon
              onClick={deleteRecording}
              icon={faTrash}
              size='md'
              className={`mr-2    text-red-600     cursor-pointer `} />

            <span className='mr-2 font-poppins'>{timer} seconds</span>
            <FontAwesomeIcon
              onClick={stopRecording}
              icon={faStop}
              size='xl'
              className={`mr-2 text-rose-500   cursor-pointer `} />

          </>

        ) : (
          <>
            <FontAwesomeIcon
              onClick={startRecording}
              icon={faMicrophone}
              size='xl'
              className={`mr-2  text-gray-500  cursor-pointer `} />

          </>

        )}
      </div>

    </div>
  );
};

export default VoiceRecorder;
