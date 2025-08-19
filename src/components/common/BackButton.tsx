import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="cursor-pointer" onClick={() => navigate(-1)}>
      <object className="pointer-events-none" data="icons/arrow_left.svg" />
    </button>
  );
};
