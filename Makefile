.PHONY: dev dev-detached dev-down dev-logs dev-build prod prod-detached prod-down prod-logs prod-build

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-detached:
	docker-compose -f docker-compose.dev.yml up --build -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-build:
	docker-compose -f docker-compose.dev.yml build

# Production commands
prod:
	docker-compose up --build

prod-detached:
	docker-compose up --build -d

prod-down:
	docker-compose down

prod-logs:
	docker-compose logs -f

prod-build:
	docker-compose build