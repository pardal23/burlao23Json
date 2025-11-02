
import React, { useState, useCallback } from 'react';
import { useNotification } from './hooks/useNotification';
import { Notification } from './components/Notification';
import { ResultDisplay } from './components/ResultDisplay';

const InfoBox: React.FC = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
    <div className="flex items-start">
      <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
      <div>
        <h3 className="font-semibold text-blue-800 mb-1">Como usar:</h3>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Digite o termo de pesquisa</li>
          <li>Escolha o motor de busca</li>
          <li>Clique em "Abrir Pesquisa"</li>
        </ul>
      </div>
    </div>
  </div>
);

function App() {
  const { notification, showNotification } = useNotification();
  const [searchEngine, setSearchEngine] = useState('google');
  const [searchTerm, setSearchTerm] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generateAndOrOpen = useCallback((openInNewTab = false) => {
    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) {
      showNotification('Por favor, digite um termo de pesquisa!', 'error');
      return;
    }

    let finalUrl;
    const trimmedBaseUrl = baseUrl.trim();

    if (trimmedBaseUrl) {
      const jsonParams = {
        q: trimmedSearchTerm,
        corp: "corporação",
        baseDados: "users",
        advanced: true,
      };
      const encodedParams = encodeURIComponent(JSON.stringify(jsonParams));
      finalUrl = trimmedBaseUrl.includes('?')
        ? `${trimmedBaseUrl}&params=${encodedParams}`
        : `${trimmedBaseUrl}?params=${encodedParams}`;
    } else {
      const encodedSearchTerm = encodeURIComponent(trimmedSearchTerm);
      if (searchEngine === 'google') {
        finalUrl = `https://www.google.com/search?q=${encodedSearchTerm}`;
      } else {
        finalUrl = `https://www.bing.com/search?q=${encodedSearchTerm}`;
      }
    }

    setGeneratedUrl(finalUrl);

    if (openInNewTab) {
      window.open(finalUrl, '_blank');
      showNotification('Pesquisa aberta em nova aba!', 'info');
    } else {
      showNotification('Link gerado com sucesso!', 'success');
    }
  }, [searchTerm, baseUrl, searchEngine, showNotification]);

  const handleGenerateClick = () => generateAndOrOpen(false);
  const handleSearchClick = () => generateAndOrOpen(true);

  const handleCopyClick = useCallback(async () => {
    if (!generatedUrl) {
      showNotification('Nenhum link para copiar!', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedUrl);
      showNotification('Link copiado para a área de transferência!', 'success');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      showNotification('Falha ao copiar o link.', 'error');
    }
  }, [generatedUrl, showNotification]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <i className="fas fa-search mr-3 text-blue-500"></i>
            Search Injector
          </h1>
          <p className="text-gray-600">Ferramenta avançada para pesquisas personalizadas</p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <label htmlFor="searchEngine" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-cogs mr-2"></i>Motor de Busca
            </label>
            <select
              id="searchEngine"
              value={searchEngine}
              onChange={(e) => setSearchEngine(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="google">Google</option>
              <option value="bing">Bing</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-keyboard mr-2"></i>Termo de Pesquisa
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite o que você quer pesquisar..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-link mr-2"></i>URL Base (Opcional)
            </label>
            <input
              type="text"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://exemplo.com/api/search"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleGenerateClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <i className="fas fa-bolt mr-2"></i>Gerar Link
            </button>
            <button
              onClick={handleSearchClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i>Abrir Pesquisa
            </button>
          </div>

          {generatedUrl && (
            <ResultDisplay url={generatedUrl} onCopy={handleCopyClick} copySuccess={copySuccess} />
          )}
        </main>
        <InfoBox />
      </div>
    </>
  );
}

export default App;
