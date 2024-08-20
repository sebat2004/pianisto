import os
from psycopg_pool import AsyncConnectionPool

async def getDbPool():
    """ Establishes and returns a connection to PSQL database """
    try:
        user = os.environ.get("DB_USER")
        password = os.environ.get("DB_PASSWORD")
        host = os.environ.get("DB_HOST")
        port = os.environ.get("DB_PORT")
        dbName = os.environ.get("DB_NAME")

        connString = f"postgresql://{user}:{password}@{host}:{port}/{dbName}"
        pool = AsyncConnectionPool(
            conninfo=connString,
            min_size=2,
            max_size=10
        )
        return pool
    except:
        print("ERROR: DB could not connect") # log-replace

