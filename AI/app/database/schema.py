from sqlalchemy import (
    Column,
    Integer,
    VARCHAR,
)
from app.database.conn import Base

class correction(Base):
    __tablename__ = "correction"
    correction_id = Column(Integer, primary_key=True, index=True)
    correction_before = Column(VARCHAR(255), nullable=False)
    correction_after = Column(VARCHAR(255), nullable=False)
    correction_category = Column(Integer, nullable=True)

    def __init__(self, correction_before, correction_after, correction_category):
        self.correction_before = correction_before
        self.correction_after = correction_after
        self.correction_category = correction_category

    def __repr__(self):
        return "<word('%s', '%s', '%s')>" % (self.correction_before, self.correction_after, self.correction_category)
