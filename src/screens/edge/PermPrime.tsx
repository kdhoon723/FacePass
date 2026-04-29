import { useNavigate } from 'react-router-dom';
import ScreenPermPrime from './ScreenPermPrime';

export default function PermPrime() {
  const navigate = useNavigate();
  return (
    <ScreenPermPrime
      onAllow={() => navigate('/')}
      onLater={() => navigate('/')}
      onClose={() => navigate('/')}
    />
  );
}
