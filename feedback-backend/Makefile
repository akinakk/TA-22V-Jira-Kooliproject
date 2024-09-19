run:
	go run main.go

postgres:
	docker run --name feedbackform -p 5433:5433 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=Passw0rd -d postgres:12-alpine

createdb:
	docker exec -it feedbackform createdb --username=postgres --owner=postgres feedbackform

dropdb:
	docker exec -it feedbackform dropdb -U postgres feedbackform

migrateup:
	migrate -path db/migration -database "postgresql://postgres:Passw0rd@localhost:5433/feedbackform?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migration -database "postgresql://postgres:Passw0rd@localhost:5433/feedbackform?sslmode=disable" -verbose down

.PHONY: run postgres createdb dropdb migrateup migratedown
