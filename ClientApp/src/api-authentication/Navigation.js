import { useLocation, useNavigate } from "react-router-dom";

export const useDefaultNavigation = (path) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = () => navigate(location.state?.from?.pathname || path);
  return navigateTo;
};
