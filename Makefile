up:
	docker-compose up -d
build:
	docker-compose build
down:
	docker-compose down
restart:
	@make down
	@make up
php-unit:
	docker-compose exec web php artisan test
jest:
	cd frontend && bun run test
test:
	docker-compose exec web php artisan test
	cd frontend && bun run test
tinker:
	docker-compose exec web php artisan tinker
migrate:
	docker-compose exec web php artisan migrate
migrate-status:
	docker-compose exec web php artisan migrate:status
route:
	docker-compose exec web php artisan route:cache
	docker-compose exec web php artisan route:list
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
analyse:
	docker-compose exec web ./vendor/bin/phpstan analyse