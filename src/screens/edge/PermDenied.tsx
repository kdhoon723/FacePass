import { useNavigate } from 'react-router-dom';
import ScreenPermDenied from './ScreenPermDenied';

export default function PermDenied() {
  const navigate = useNavigate();
  return (
    <ScreenPermDenied
      onBack={() => navigate('/')}
      onEmpno={() => navigate('/empno')}
    />
  );
}
