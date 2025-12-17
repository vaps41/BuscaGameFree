🎮 GameHunter

GameHunter é uma aplicação web moderna desenvolvida em React que monitoriza e agrega ofertas de jogos gratuitos de lojas licenciadas (como Steam, Epic Games Store, GOG, Ubisoft, entre outras).

O objetivo do projeto é fornecer uma interface centralizada, segura e visualmente atraente para que os jogadores possam encontrar e resgatar jogos legítimos sem custos, evitando a pirataria.

✨ Funcionalidades

Feed em Tempo Real: Conexão direta com a API GamerPower para listar ofertas ativas.

Filtros Inteligentes: Permite filtrar jogos por plataforma (Steam, Epic Games, GOG, PC).

Links Seguros: Redireciona o utilizador diretamente para a página oficial da loja para o resgate.

Informações Detalhadas: Mostra o preço original ("Quanto valia"), tipo de oferta (Jogo completo ou DLC) e data de validade.

Design Responsivo: Interface adaptada para telemóveis, tablets e desktops.

Modo Escuro: Estética "Gamer" utilizando tons escuros e acentos em verde néon.

🛠️ Tecnologias Utilizadas

React: Biblioteca JavaScript para construção da interface.

Tailwind CSS: Framework de CSS utilitário para estilização rápida e responsiva.

Lucide React: Biblioteca de ícones leves e consistentes.

Fetch API: Para consumo de dados assíncronos.

GamerPower API: Fonte dos dados das ofertas.

🚀 Como Executar o Projeto

Para rodar este projeto localmente, precisará de ter o Node.js instalado.

1. Clonar ou criar o projeto

Se estiver a criar do zero num ambiente React (como Vite ou Create React App):

npm create vite@latest gamehunter -- --template react
cd gamehunter


2. Instalar dependências

Este projeto utiliza lucide-react para os ícones. O Tailwind CSS também deve estar configurado.

npm install
npm install lucide-react


Certifique-se de que o Tailwind CSS está configurado no seu projeto. Se não estiver, siga o guia oficial de instalação do Tailwind para React.

3. Adicionar o Código

Copie o código do componente principal para o ficheiro src/App.jsx (ou o ficheiro correspondente à sua estrutura).

4. Iniciar o Servidor de Desenvolvimento

npm run dev
# ou
npm start


A aplicação estará disponível em http://localhost:5173 (Vite) ou http://localhost:3000 (CRA).

📡 Sobre a API

Este projeto consome a API pública do GamerPower.

Endpoint: https://www.gamerpower.com/api/giveaways

Limitações: A API é gratuita, mas deve ser utilizada com respeito aos limites de requisição (rate limits).

CORS: Em ambientes de produção, pode ser necessário configurar um proxy ou verificar as políticas de CORS, embora a API geralmente permita requisições GET diretas.

⚠️ Nota Legal

O GameHunter não hospeda nenhum ficheiro de jogo. Ele atua apenas como um agregador de links que direcionam para ofertas oficiais fornecidas pelas próprias desenvolvedoras ou lojas digitais.

Desenvolvido com 💚 para a comunidade Gamer.
