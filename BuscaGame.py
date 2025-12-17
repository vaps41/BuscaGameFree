import requests
import json
from datetime import datetime

# URL da API pública do GamerPower (focada em giveaways legítimos)
API_URL = "https://www.gamerpower.com/api/giveaways"

def buscar_jogos_gratuitos():
    print(f"--- Iniciando varredura por jogos gratuitos [{datetime.now().strftime('%d/%m/%Y %H:%M')}] ---\n")
    
    try:
        # Faz a requisição para a API
        response = requests.get(API_URL)
        
        # Se a conexão for bem sucedida (Código 200)
        if response.status_code == 200:
            jogos = response.json()
            
            if not jogos:
                print("Nenhum jogo gratuito encontrado no momento.")
                return

            contador = 0
            
            for jogo in jogos:
                # Filtragem básica: garantindo que o status é ativo
                if jogo.get('status') == 'Active':
                    titulo = jogo.get('title')
                    loja = jogo.get('instructions') # Geralmente indica a plataforma/loja
                    link = jogo.get('open_giveaway_url')
                    tipo = jogo.get('type') # Jogo completo, DLC ou Alpha
                    plataforma = jogo.get('platforms')
                    
                    # Exibindo os dados de forma organizada
                    print(f"🎮 JOGO: {titulo}")
                    print(f"🏢 LOJA/PLATAFORMA: {plataforma}")
                    print(f"📦 TIPO: {tipo}")
                    print(f"🔗 LINK PARA RESGATE: {link}")
                    print("-" * 60)
                    
                    contador += 1
            
            print(f"\nTotal de ofertas encontradas: {contador}")
            
        else:
            print(f"Erro ao conectar com a API. Status Code: {response.status_code}")
            
    except Exception as e:
        print(f"Ocorreu um erro crítico: {e}")

if __name__ == "__main__":
    buscar_jogos_gratuitos()
