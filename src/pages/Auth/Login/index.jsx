import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {faThreads} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Login = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
    </div>
  );
};

export default Login;

