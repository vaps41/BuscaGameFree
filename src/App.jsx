import React, { useState, useEffect } from 'react';
import { Gift, ExternalLink, Monitor, Tag, RefreshCw, AlertCircle } from 'lucide-react';

export default function GameHunter() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); 

  const API_URL = "https://www.gamerpower.com/api/giveaways";

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Falha na conexão com o servidor de jogos.');
      }
      const data = await response.json();
      const activeGames = data.filter(game => game.status === 'Active');
      setGames(activeGames);
    } catch (err) {
      setError('Não foi possível carregar os jogos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = games.filter(game => {
    if (filter === 'All') return true;
    return game.platforms.includes(filter) || game.instructions.includes(filter);
  });

  const getStoreBadgeColor = (store) => {
    if (store.includes('Steam')) return 'bg-blue-600 text-white';
    if (store.includes('Epic')) return 'bg-gray-800 text-white border border-gray-600';
    if (store.includes('GOG')) return 'bg-purple-600 text-white';
    if (store.includes('Ubisoft')) return 'bg-blue-500 text-white';
    return 'bg-green-600 text-white';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-green-500 selection:text-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-8 h-8 text-green-400" />
            <h1 className="text-xl font-bold tracking-tight">
              Game<span className="text-green-400">Hunter</span>
            </h1>
          </div>
          <button 
            onClick={fetchGames}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            title="Atualizar Lista"
          >
            <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold mb-2">Jogos Gratuitos Disponíveis</h2>
          <p className="text-slate-400">
            Monitorizamos as principais lojas (Steam, Epic, GOG) para encontrar jogos oficiais que estão 100% grátis agora.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
          {[
            { label: 'Todos', value: 'All' },
            { label: 'Steam', value: 'Steam' },
            { label: 'Epic Games', value: 'Epic Games Store' },
            { label: 'GOG', value: 'GOG' },
            { label: 'PC', value: 'PC' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === option.value
                  ? 'bg-green-500 text-slate-900 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 animate-pulse">A procurar ofertas nas lojas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-xl flex items-center gap-4 max-w-2xl mx-auto">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Erro ao carregar</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <button 
              onClick={fetchGames}
              className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {!loading && !error && filteredGames.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Monitor className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Nenhum jogo encontrado para este filtro.</p>
            <button onClick={() => setFilter('All')} className="mt-4 text-green-400 hover:underline">
              Ver todos os jogos
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div 
                key={game.id} 
                className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded shadow-lg backdrop-blur-md ${getStoreBadgeColor(game.platforms)}`}>
                      {game.platforms.split(',')[0]}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                     <span className={`text-xs font-bold px-2 py-1 rounded shadow-lg backdrop-blur-md ${game.type === 'DLC' ? 'bg-orange-600 text-white' : 'bg-slate-700/80 text-white'}`}>
                      {game.type}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold leading-tight mb-2 text-white group-hover:text-green-400 transition-colors line-clamp-2">
                    {game.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {game.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-700 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 line-through font-medium">
                        {game.worth === "N/A" ? "Grátis" : game.worth}
                      </span>
                      <span className="text-green-400 font-bold text-lg">GRÁTIS</span>
                    </div>
                    
                    <a 
                      href={game.open_giveaway_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-lg font-bold text-sm transition-all active:scale-95"
                    >
                      Resgatar
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Tag className="w-3 h-3" />
                    <span className="truncate">{game.end_date === "N/A" ? "Tempo Limitado" : `Até: ${game.end_date}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="border-t border-slate-800 bg-slate-900 py-8 mt-12 text-center text-slate-500 text-sm">
        <p>Dados fornecidos pela API GamerPower. Este sistema verifica apenas lojas licenciadas.</p>
        <p className="mt-2">Sistema desenvolvido para monitorização segura de jogos.</p>
      </footer>
    </div>
  );
}