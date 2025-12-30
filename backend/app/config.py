from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://user:password@localhost:5432/task_manager"
    
    # Backend
    backend_url: str = "http://localhost:8000"
    cors_origins: List[str] = ["http://localhost:3000"]
    
    # Slack (나중에 사용)
    slack_bot_token: str = ""
    slack_signing_secret: str = ""
    
    # Agent AI (나중에 사용)
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

