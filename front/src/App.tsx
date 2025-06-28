import { useState } from 'react';
import { ReservaForm } from './components/ReservaForm';
import { ReservaList } from './components/ReservaList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReservaSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Sistema de Reservas
          </h1>
          <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ReservaForm onSuccess={handleReservaSuccess} />
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full">
              <ReservaList refreshKey={refreshKey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;