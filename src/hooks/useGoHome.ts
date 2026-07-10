import { useLocation, useNavigate } from 'react-router-dom';

// Scrolls to top when already on the home page, otherwise navigates there.
export function useGoHome() {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };
}
