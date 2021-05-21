from dataclasses import dataclass
from os import path, environ
import json
from app.common import cryption

base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))

@dataclass
class Config:
    # 기본 Configuration
    BASE_DIR = base_dir

    # DB 환경설정
    DB_POOL_RECYCLE: int = 900
    DB_ECHO: bool = True
    SECRET_FILE = path.join(path.dirname(path.dirname(path.abspath(__file__)))+"/database", 'secrets.json')
    secrets = json.loads(open(SECRET_FILE).read())
    DB = secrets["DB"]
    DB_URL: str = f"mysql+pymysql://{cryption.Cipher().decrypt_str(DB['user'])}:{cryption.Cipher().decrypt_str(DB['password'])}@{cryption.Cipher().decrypt_str(DB['host'])}:{cryption.Cipher().decrypt_str(DB['port'])}/{cryption.Cipher().decrypt_str(DB['database'])}"

@dataclass
class LocalConfig(Config):
    # 로컬 환경설정
    PROJ_RELOAD: bool = True

    # Cross Origin설정
    ALLOW_SITE = ["*"]

@dataclass
class ProdConfig(Config):
    # 배포 환경설정
    PROJ_RELOAD: bool = False

    # Cross Origin 설정
    ALLOW_SITE = ["*"]

def conf():
    # 환경 불러오기
    config = dict(prod=ProdConfig(), local=LocalConfig())
    return config.get(environ.get("API_ENV", "local"))
