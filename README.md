# Teste prático DevOps
> Ambiente local utilizando Docker, Docker Compose e Nginx (proxy reverso e load balancer), em múltiplas instâncias, exposto externamente com Ngrok.

## 🚧 Estrutura do Projeto
```bash
.
├── README.md
├── app
│   ├── Dockerfile
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── js
│   │       └── script.js
│   ├── index.html
│   └── index.js
├── docker-compose.yml
├── docs
└── nginx
    └── nginx.conf           
```

## 🛠️ Tecnologias Utilizadas
- **Docker & Docker Compose**: Criação e gerenciamento dos containers.
- **Nginx**: Atuando como reverse proxy e load balancer.
- **Ngrok**: Exposição externa do serviço.

## ⚙️ Funcionamento
1.  **Aplicação**: O Docker Compose sobe múltiplas instâncias (réplicas) de um servidor web simples.
2.  **Load Balancer**: O Nginx recebe as requisições na porta `80` e as distribui entre as instâncias da aplicação.

## 🚀 Como Executar

1. Clonar o repositório:
   ```bash
   git clone https://github.com/GiMerguizo/teste-pratico-devops.git
   cd teste-pratico-devops
   ```
2. Configurar o Token do Ngrok _(caso ainda não tenha)_
   1. Crie uma conta gratuita em [ngrok.com](ngrok.com) se ainda não tiver.
   2. No painel do Ngrok, vá em Your Authtoken e copie o token.
   3. No seu terminal, antes de rodar o Docker Compose, exporte essa variável:
      - Linux: `export NGROK_AUTHTOKEN="seu_token"`
      - Windows: `$env:NGROK_AUTHTOKEN="seu_token_aqui"`

3. Subir o ambiente:
   ```bash
   docker-compose up -d
   ```

4. Escalar instâncias (Opcional):
   Para testar o load balancer com mais instâncias:
   ```bash
   docker-compose up -d --scale app=3
   ```

## Documentações
- [Ngrok](https://ngrok.com/docs/using-ngrok-with/docker/compose)