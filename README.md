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
- **HTML, CSS e JS:** Aplicação web simples para teste.
- **Docker & Docker Compose**: Criação e gerenciamento dos containers.
- **Nginx**: Atuando como reverse proxy e load balancer.
- **Ngrok**: Exposição externa do serviço.
- **Node.js**: Backend leve servindo a página web e métricas de health check.

## ⚙️ Funcionamento
1.  **Aplicação**: O Docker Compose sobe múltiplas instâncias (réplicas) de um servidor web simples.
2.  **Load Balancer**: O Nginx recebe as requisições na porta `80` e as distribui em formato Round-Robin entre as instâncias da aplicação.

## 🚀 Como Executar

1. Clonar o repositório:
   ```bash
   git clone https://github.com/GiMerguizo/teste-pratico-devops.git

   cd teste-pratico-devops
   ```

2. Configurar o Token do Ngrok _(caso ainda não tenha)_:
   1. Crie uma conta gratuita em [ngrok.com](https://ngrok.com) se ainda não tiver.
   2. No painel do Ngrok, vá em **Your Authtoken** e copie o token.
   3. No seu terminal, antes de rodar o Docker Compose, exporte essa variável:
      - Linux / Mac: `export NGROK_AUTHTOKEN="seu_token_aqui"`
      - Windows (PowerShell): `$env:NGROK_AUTHTOKEN="seu_token_aqui"`

3. Subir o ambiente:
   ```bash
   docker-compose up -d --build
   ```

### 🧪 Testar o Balanceamento

1. Acesse o painel local do Ngrok em `http://localhost:4040`.
2. Copie a URL pública gerada (ex: `https://xxxx.ngrok-free.app`) e abra no navegador.
3. Observe o campo **"Container ID"** na tela inicial. 
4. Clique no botão **"Testar Health Check"** repetidas vezes. Você verá o ID do container alternando dinamicamente entre `app1` e `app2` sem precisar recarregar a página inteira, evidenciando o funcionamento do Load Balancer.

## 🧠 Decisões Técnicas

* **Node.js Nativo:** A aplicação web foi construída utilizando apenas as bibliotecas nativas do Node.js (`http`, `fs`, `os`), dispensando o uso de frameworks como Express. Isso reduziu o tamanho do projeto, acelerou o tempo de build e eliminou vulnerabilidades de dependências de terceiros.
* **Segurança no Docker:** O `Dockerfile` utiliza uma imagem `alpine` leve, especifica a versão LTS do Node (20) para garantir estabilidade e executa o container com o usuário restrito `node` (não-root) para maior segurança.
* **Headers no Nginx:** Foram configurados os headers `X-Real-IP` e `X-Forwarded-For` no proxy reverso para garantir que a aplicação real conheça a origem do tráfego e mantenha logs precisos.

## 📈 Possíveis Melhorias para Produção

Para escalar este ambiente para um cenário real de produção, considerando boas práticas de DevOps, recomendam-se as seguintes evoluções na arquitetura:

1. **Observabilidade Avançada:** Implementação de uma stack de monitoramento utilizando **Prometheus** para coletar as métricas e **Grafana** para a criação de dashboards.
2. **Infraestrutura como Código (IaC) e Cloud:** Migração do ambiente local para a nuvem (como **AWS**) provisionando toda a infraestrutura (instâncias EC2, Security Groups e balanceadores de carga nativos) de forma automatizada e versionada utilizando **Terraform**.
3. **Automação de CI/CD:** Criação de pipelines automatizadas utilizando **Jenkins** para realizar o *build* das imagens Docker, rodar testes de integração e realizar o deploy contínuo das novas versões da aplicação de forma transparente.


## 📚 Documentações
- [Ngrok no Docker Compose](https://ngrok.com/docs/using-ngrok-with/docker/compose)
