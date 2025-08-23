import { useMutation } from '@tanstack/react-query';

interface OCRImage {
  requests: {
    image: {
      content: string;
    };
    features: {
      type: string;
    }[];
  }[];
}

interface PostOCRImageResponse {
  fullTextAnnotation: {
    text: string;
  };
  textAnnotations: {
    description: string;
  };
}
const postOCRImage = async (body: OCRImage): Promise<PostOCRImageResponse> => {
  const apiKey = import.meta.env.VITE_OCR_SECRET_KEY;
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return (await res.json()).responses[0];
};

export const usePostOCRImage = () => {
  const { mutate } = useMutation({
    mutationFn: (body: OCRImage) => postOCRImage(body),
  });

  return mutate;
};
