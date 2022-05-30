# Usage

## Environment files

### For database

Create a file named '.env' in the root directory (the same as docker-compose.yml) with the following:

  ```
  POSTGRES_PASSWORD='your_password'
  POSTGRES_USER=your_postgres_username
  POSTGRES_DB='your_postgres_database_name'
  ```

### For Django (backend)

Create a file named '.env.yml' in the 'backend/web' directory (the same as django settings.py file) with the following:

  ```
  SECRET_KEY: 'your_django_secret_key'
  DEBUG: 1 for debug, 0 for production
  ALLOWED_HOSTS:
    - '127.0.0.1'
    - 'localhost'
    - 'etc'
  SQL_ENGINE: 'django.db.backends.postgresql'
  SQL_DATABASE: 'your_postgres_database_name'
  SQL_PASSWORD: 'your_password'
  SQL_HOST: 'yrap_db'
  SQL_PORT: 5432
  SQL_USER: 'your_postgres_username'
  ```
