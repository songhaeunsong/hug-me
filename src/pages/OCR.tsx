import { useState } from 'react';

import { usePostOCRImage } from '@/api/ocr';

export const OCR = () => {
  const postOCRImage = usePostOCRImage();

  const [OCRResult, setOCRResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setIsLoading(true);

      const base64 = (reader.result as string).split(',')[1];

      const body = {
        requests: [
          {
            image: { content: base64 },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
          },
        ],
      };

      postOCRImage(body, {
        onSuccess: (data) => {
          console.log(data);
          setIsLoading(false);

          const result = data.fullTextAnnotation?.text || '인식 실패';
          setOCRResult(result);
        },
        onError: () => {
          setOCRResult('다시 시도해주세요.');
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
      {isLoading ? <p>인식 중...</p> : <pre>{OCRResult}</pre>}
    </div>
  );
};
