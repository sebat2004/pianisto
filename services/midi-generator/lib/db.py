import os
from psycopg_pool import AsyncConnectionPool
from psycopg2 import connect


async def getDbPool():
    """Establishes and returns a connection to PSQL database"""
    try:
        connString = _getConnString()
        pool = AsyncConnectionPool(conninfo=connString, min_size=2, max_size=10)
        return pool
    except:
        print("ERROR: DB could not connect")  # log-replace


def getDbConn():
    """Establishes and returns a connection to PSQL database"""
    try:
        connString = _getConnString()
        conn = connect(connString)
        return conn
    except:
        print("ERROR: DB could not connect")  # log-replace


def _getConnString():
    """Builds and returns a connection string for a PostgreSQL database"""

    user = os.environ.get("TRANSCRIPTIONS_DB_USER")
    password = os.environ.get("TRANSCRIPTIONS_DB_PASSWORD")
    host = os.environ.get("TRANSCRIPTIONS_DB_HOST")
    port = os.environ.get("TRANSCRIPTIONS_DB_PORT")

    connString = f"postgresql://{user}:{password}@{host}:{port}/"
    return connString
