help:
	@echo "Run 'make build' to build docker."
	@echo "Run 'make push' to build docker."

build:
	@docker-compose build
push:
	@echo "Pushing docker images..."
	@docker tag cuoiass-api rockerbom/cuoiass
	@docker push rockerbom/cuoiass
pull:
	@docker pull rockerbom/cuoiass
