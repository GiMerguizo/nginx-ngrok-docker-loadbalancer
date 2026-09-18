# Teste prático DevOps
> Ambiente local utilizando Docker, Docker Compose e Nginx (proxy reverso e load balancer), em múltiplas instâncias, exposto externamente com Ngrok.

- **Link:** [Demonstração do funcionamento do projeto](https://youtu.be/yWgKaDhfNvM)

## 🚧 Estrutura do Projeto
```text
.
├── Makefile
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
├── grafana
│   └── provisioning
│       ├── dashboards
│       │   ├── Infra.json
│       │   └── dashboards.yml
│       └── datasources
│           └── datasource.yml
├── nginx
│   └── nginx.conf
└── prometheus
    └── prometheus.yml
```

## 🛠️ Tecnologias Utilizadas
- **Node.js, HTML, CSS e JS:** Backend leve servindo a página web e métricas de health check, sem frameworks pesados.
- **Docker & Docker Compose**: Criação, orquestração e gerenciamento dos containers.
- **Nginx**: Atuando como reverse proxy e load balancer.
- **Ngrok**: Exposição externa do serviço de forma segura.
- **Prometheus**: Coleta e armazenamento de métricas em tempo real (Observabilidade).
- **Grafana**: Dashboards para visualização da saúde do ambiente

## ⚙️ Funcionamento
1.  **Aplicação**: O Docker Compose sobe múltiplas instâncias (réplicas) de um servidor web simples.
2.  **Load Balancer**: O Nginx recebe as requisições na porta `80` e as distribui entre as instâncias da aplicação.

## 🚀 Como Executar

1. Clonar o repositório:
   ```bash
   git clone https://github.com/GiMerguizo/teste-pratico-devops.git

   cd teste-pratico-devops
   ```

### De forma automatizada (Recomendado)
2. O projeto conta com um `Makefile` inteligente. Basta executar o comando abaixo. Caso seja a sua primeira execução, o script solicitará interativamente o seu token do Ngrok (que você pode obter em [ngrok.com](https://ngrok.com) > Your Authtoken) para configurar o ambiente com segurança.
   ```bash
   make up
   ```

3. Outros comandos:
   - `make help`: exibe os comandos disponíveis com o Makefile
   - `make logs`: exibe os logs dos containers
   - `make down`: derruba o ambiente
   - `make rebuild`: reconstrói as imagens e sobe o ambiente

### De forma manual
2. Configurar o Token do Ngrok _(se ainda não tiver)_:
   1. Crie uma conta gratuita em [ngrok.com](https://ngrok.com).
   2. No painel do Ngrok, vá em **Your Authtoken** e copie o token.
   3. No terminal, antes de rodar o Docker Compose, exporte essa variável:
      - Linux / Mac: `export NGROK_AUTHTOKEN="seu_token_aqui"`
      - Windows (PowerShell): `$env:NGROK_AUTHTOKEN="seu_token_aqui"`

3. Subir o ambiente:
   ```bash
   docker compose up -d --build
   ```

## 🧪 Como Testar as Funcionalidades

### 1. Testar o Balanceamento (Nginx)
1. Acesse o painel local do Ngrok em `http://localhost:4040`.
2. Copie a URL pública gerada (ex: `https://xxxx.ngrok-free.app`) e abra no navegador.
3. Observe o campo **"Container ID"** na tela inicial. 
4. Clique no botão **"Testar Health Check"** repetidas vezes. Você verá o ID do container alternando dinamicamente entre `app1` e `app2` sem precisar recarregar a página inteira, evidenciando o funcionamento do Load Balancer.

### 2. Testar a Observabilidade (Prometheus)
1. Com o ambiente rodando, acesse `http://localhost:9090` no seu navegador.
2. No menu superior, vá em **Status > Targets** para verificar os containers `app1` e `app2` sendo monitorados ativamente (Status UP).
3. Na aba principal (Graph), pesquise pela métrica `node_uptime_seconds` e clique em **Execute** para ver a coleta de dados dos containers em tempo real.

## 🧠 Decisões Técnicas

* **Node.js Nativo e Endpoint Customizado:** A aplicação foi construída utilizando apenas bibliotecas nativas do Node.js. Além da rota de saúde (`/health`), foi criada uma rota específica (`/metrics`) formatada nos padrões do Prometheus para viabilizar o *scrape* dos dados.
* **Segurança no Docker:** O `Dockerfile` utiliza uma imagem `alpine` leve, especifica a versão LTS do Node (20) para garantir estabilidade e executa o container com o usuário restrito `node` (não-root).
* **Headers no Nginx:** Foram configurados os headers `X-Real-IP` e `X-Forwarded-For` no proxy reverso para garantir que a aplicação real conheça a origem do tráfego.

## 📈 Possíveis Melhorias para Produção

Para escalar este ambiente para um cenário real de produção, recomendam-se as seguintes evoluções na arquitetura:

1. **Infraestrutura como Código (IaC) e Cloud:** Migração do ambiente local para a nuvem (como **AWS**), provisionando toda a infraestrutura (instâncias EC2, Security Groups e balanceadores de carga nativos) de forma automatizada e versionada utilizando **Terraform**.
2. **Automação de CI/CD:** Criação de pipelines automatizadas utilizando **Jenkins** para realizar o *build* das imagens Docker, rodar testes e realizar o deploy contínuo das novas versões da aplicação de forma transparente.
3. **Aplicação Web:** Pegar automaticamente o ambiente de desenvolvimento.

## 📚 Documentações
- [Makefile Tutorial](https://makefiletutorial.com/)
- [Ngrok no Docker Compose](https://ngrok.com/docs/using-ngrok-with/docker/compose)
- [Prometheus Scrape Configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)
- [Utilizando o nginx como balanceador de carga HTTP](https://nginx.org/en/docs/http/load_balancing.html)
- [X-Forwarded-For](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers/X-Forwarded-For)
