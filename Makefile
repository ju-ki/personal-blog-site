up:
	docker-compose up -d
build:
	docker-compose build
down:
	docker-compose down
restart:
	@make down
	@make up
test:
	docker-compose exec web php artisan test
	cd frontend && bun test
tinker:
	docker-compose exec web php artisan tinker
migrate:
	docker-compose exec web php artisan migrate
migrate-status:
	docker-compose exec web php artisan migrate:status
rollback:
	docker-compose exec web php artisan migrate:rollback
fresh:
	docker-compose exec web php artisan migrate:fresh --seed
seed:
	docker-compose exec web php artisan db:seed
optimize:
	docker-compose exec web php artisan optimize
optimize-clear:
	docker-compose exec web php artisan optimize:clear
cache-clear:
	docker-compose exec web composer clear-cache
	@make optimize-clear
	docker-compose exec web php artisan event:clear
	docker-compose exec web php artisan view:clear
db:
	docker-compose exec db bash
