.PHONY: setup up down logs rebuild

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