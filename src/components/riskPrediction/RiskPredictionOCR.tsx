import { useState } from 'react';

import { usePostOCRImage } from '@/api/ocr';

import { ErrorComponent } from '../common/ErrorComponent';
import { Spinner } from '../common/Spinner';
import { CITY_FULLNAME_RISK_PREDICTION_MAP } from '../depositCheck/regionConstants';

interface RiskPredictionOCRProps {
  handleSubmitContractData: (depositAmount: number, region: string) => void;
}
const extractContractInfo = (lines: string[]) => {
  let address = '';
  let deposit = '';

  let addressFound = false;
  const depositFound = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!addressFound && line.includes('소재지')) {
      address = line.replace('소재지', '').trim();
      addressFound = true;
    }

    if (!depositFound && line.includes('보증금')) {
      const nextLine = lines[i + 1] || '';
      const numMatch = nextLine.match(/W?([\d,]+)/);

      if (numMatch) {
        deposit = numMatch[1].replace(/,/g, '');
      }
    }

    if (addressFound && depositFound) break;
  }

  return { address, deposit };
};

export const RiskPredictionOCR = ({ handleSubmitContractData }: RiskPredictionOCRProps) => {
  const postOCRImage = usePostOCRImage();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleRunOCR = async () => {
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
          const OCRResult = data.fullTextAnnotation?.text || null;

          if (OCRResult === null) return;

          const result = extractContractInfo(OCRResult.split('\n'));
          const address = result.address;

          const addressPieces = address.split(' ');

          const region = CITY_FULLNAME_RISK_PREDICTION_MAP[addressPieces[0]];

          handleSubmitContractData(+result.deposit, region);
        },
        onError: () => {
          setIsError(true);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    };

    reader.readAsDataURL(file);
  };

  if (isError) return <ErrorComponent goBackLink={'/'} />;

  return (
    <div className="flex flex-col gap-24  px-4 w-full">
      <div className="flex flex-col gap-2 items-center w-full">
        <input
          className="cursor-pointer bg-white w-full px-4 py-3 rounded-2xl border-2 border-divider-gray"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />

        <button
          className="cursor-pointer mt-2 self-end text-semibold w-[100px] px-4 py-2 bg-point text-white rounded-xl disabled:bg-point/50"
          onClick={handleRunOCR}
          disabled={!file || isLoading}
        >
          업로드
        </button>
        {isLoading && <Spinner text="계약서 분석 중이에요!" />}
      </div>
    </div>
  );
};
