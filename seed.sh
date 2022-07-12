#!/usr/bin/env zsh

echo "Create database"
docker-compose exec backend python3 manage.py create_db
echo "Seed database"
docker-compose exec backend python3 manage.py seed_db
echo "Database created and seeded"

echo 'Check projects'
read -s -k $'?press any key to start...\n'
echo "Projects..."
curl -X GET  http://localhost:5050/api/projects/
echo "Add a project..."
curl -X POST -H "Content-Type: application/json" -d '{"title": "Most test data", "slug": "_more_test_data", "done_when": "This project will be done when... done"}' http://localhost:5050/api/projects/add/
echo 'Check if the new project is there' 
read -s -k $'?press any key to start...\n'
echo "Check the new project is there..."
curl -X GET  http://localhost:5050/api/projects/

echo "Add an action"
read -s -k $'?Press any key to start...\n'
curl -X POST -H "Content-Type: application/json" -d '{"description": "buy a thing", "date_added": "2022-06-27T06:43:24.281Z"}' http://localhost:5050/api/projects/detail/go_shop/action/
curl -X POST -H "Content-Type: application/json" -d '{"description": "Wash a thing", "date_added": "2022-06-27T06:43:24.281Z"}' http://localhost:5050/api/projects/detail/go_shop/action/
echo "Check the action is in the project"
read -s -k $'?Press any key to start...\n'
curl -X GET  http://localhost:5050/api/projects/detail/go_shop/

