import { BeatLoader } from 'react-spinners';

interface SpinnerProps {
  text: string;
}
export const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <BeatLoader size={25} color={'#ea5050'} />
      <span className="text-8 text-point font-semibold">{text}</span>
    </div>
  );
};
