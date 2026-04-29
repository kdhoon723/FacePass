import { useNavigate } from 'react-router-dom';
import ScreenInviteError from './ScreenInviteError';

export default function InviteError() {
  const navigate = useNavigate();
  return (
    <ScreenInviteError
      onClose={() => navigate('/')}
    />
  );
}
