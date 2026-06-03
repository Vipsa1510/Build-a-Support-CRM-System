from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class Note(Base):

    __tablename__ = "notes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    ticket_id = Column(
        String,
        nullable=False
    )

    note_text = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )