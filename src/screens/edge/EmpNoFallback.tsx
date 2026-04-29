import { useNavigate } from 'react-router-dom';
import ScreenEmpNo from './ScreenEmpNo';

export default function EmpNoFallback() {
  const navigate = useNavigate();
  return (
    <ScreenEmpNo
      onBack={() => navigate('/')}
      onSubmit={() => alert('사번 매칭 기능은 다음 업데이트에서 추가될 예정이에요. 얼굴 인식을 다시 시도해주세요.')}
    />
  );
}
