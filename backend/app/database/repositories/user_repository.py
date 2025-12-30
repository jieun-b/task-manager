from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.user import User


class UserRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, user_data: dict) -> User:
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_by_slack_id(self, slack_user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.slack_user_id == slack_user_id).first()
    
    def get_all(self) -> List[User]:
        return self.db.query(User).all()
    
    def update(self, user_id: int, user_data: dict) -> Optional[User]:
        user = self.get_by_id(user_id)
        if not user:
            return None
        
        for key, value in user_data.items():
            setattr(user, key, value)
        
        self.db.commit()
        self.db.refresh(user)
        return user

