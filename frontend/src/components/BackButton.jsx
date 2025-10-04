import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={handleBack}
      variant="outline"
      className="mb-4 flex items-center space-x-2"
    >
      <FaArrowLeft />
      <span>Back</span>
    </Button>
  );
}
