import { useMutation } from '@tanstack/react-query';

interface PostSpeechResponse {
  text: string;
}

interface PostSpeechResponse {
  intent: {
    matched: true;
    function: 'risk_assessment';
    best_score: 'risk_assessment';
    second_best: 'myhouse';
  };
}

const postSpeech = async (body: FormData): Promise<PostSpeechResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/audio/speech-to-text`, {
    method: 'POST',
    body,
  });

  return await res.json();
};

export const usePostSpeech = () => {
  const { mutate } = useMutation({
    mutationFn: (body: FormData) => postSpeech(body),
  });

  return mutate;
};
