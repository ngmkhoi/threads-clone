import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('NotFound');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {t('title')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
            {t('description')}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
            {t('backButton')}
        </button>
      </div>
    </div>
  );
};

export default NotFound;

