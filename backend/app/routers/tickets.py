from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.note import NoteCreate
from app.database.db import SessionLocal
from app.schemas.ticket import TicketCreate
from app.services.ticket_service import (
    create_ticket,
    search_and_filter_tickets
)

from app.services.ticket_service import (
    create_ticket,
    search_and_filter_tickets,
    get_ticket_by_id,
    update_ticket_status,
    add_note,
    get_notes
)
router = APIRouter(
    prefix="/api/tickets",
    tags=["Tickets"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Ticket
@router.post("/")
def create_new_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    return create_ticket(db, ticket)


# Get All Tickets
@router.get("/")
def fetch_tickets(
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return search_and_filter_tickets(
        db,
        status,
        search
    )

from app.schemas.ticket import (
    TicketCreate,
    TicketUpdate
)

from app.services.ticket_service import (
    create_ticket,
    search_and_filter_tickets,
    get_ticket_by_id,
    update_ticket_status
)

@router.get("/{ticket_id}")
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    return get_ticket_by_id(
        db,
        ticket_id
    )


@router.put("/{ticket_id}")
def update_ticket(
    ticket_id: str,
    data: TicketUpdate,
    db: Session = Depends(get_db)
):
    return update_ticket_status(
        db,
        ticket_id,
        data.status
    )

@router.post("/{ticket_id}/notes")
def create_note(
    ticket_id: str,
    data: NoteCreate,
    db: Session = Depends(get_db)
):
    return add_note(
        db,
        ticket_id,
        data.note_text
    )

@router.get("/{ticket_id}/notes")
def fetch_notes(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    return get_notes(
        db,
        ticket_id
    )