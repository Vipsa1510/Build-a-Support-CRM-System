from sqlalchemy import Column,String,Integer,Text,DateTime
from datetime import datetime

from app.database.db import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True)

    ticket_id = Column(String, unique=True)

    customer_name = Column(String)
    customer_email = Column(String)

    subject = Column(String)
    description = Column(Text)

    status = Column(String, default="Open")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow
    )