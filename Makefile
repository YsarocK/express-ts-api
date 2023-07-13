install:
	cd api && npm install && cp .env ../.env
	cd frontend && npm install
	docker compose up --build -d

start:
	docker compose up -d

stop:
	docker compose down

restart:
	docker compose down && docker compose up -d

purify:
	rm -rf "._mysql_data_dir"
	cd api && rm -rf "build" && rm -rf "node_modules"
	cd frontend && rm -rf ".npm" && rm -rf ".nuxt" && rm -rf "node_modules"

deploy:
	sudo git pull origin main
	sudo docker-compose -f docker-compose.prod.yml up -d --build