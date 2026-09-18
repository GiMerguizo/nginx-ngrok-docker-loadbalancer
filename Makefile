.PHONY: help setup up down logs build rebuild

help:
	@echo "Automação - Comandos disponíveis:"
	@echo "  setup				- Verifica e valida a existência do NGROK_AUTHTOKEN"
	@echo "  build				- Constrói as imagens e inicia os containers"
	@echo "  up				- Inicia os containers"
	@echo "  down				- Para e remove os containers e redes"
	@echo "  logs				- Exibe os logs dos containers"
	@echo "  rebuild			- Reconstrói as imagens e inicia os containers"

setup:
	@if [ ! -f .env ]; then \
		echo "Arquivo .env não encontrado."; \
		echo "Por favor, cole o seu NGROK_AUTHTOKEN e aperte Enter:"; \
		read token; \
		echo "NGROK_AUTHTOKEN=$$token" > .env; \
		echo "Arquivo .env criado com sucesso!"; \
	else \
		echo "Token do Ngrok já está configurado no .env."; \
	fi

build: setup
	@echo "Construindo imagens e subindo o ambiente..."
	docker compose up -d --build

up: setup
	@echo "Subindo o ambiente..."
	docker compose up -d

down:
	@echo "Derrubando o ambiente..."
	docker compose down

logs:
	@echo "Exibindo logs dos containers..."
	docker compose logs -f

rebuild: setup
	@echo "Reconstruindo imagens e subindo o ambiente..."
	docker compose up -d --build