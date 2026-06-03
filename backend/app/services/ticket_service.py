from datetime import datetime
from app.models.ticket import Ticket
from app.utils.ticket_generator import generate_ticket_id
from app.models.note import Note

def create_ticket(db, data):
    count = db.query(Ticket).count() + 1

    ticket_number = generate_ticket_id(count)

    ticket = Ticket(
        ticket_id=ticket_number,
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        subject=data.subject,
        description=data.description
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


def search_and_filter_tickets(
    db,
    status=None,
    search=None
):
    query = db.query(Ticket)

    if status:
        query = query.filter(
            Ticket.status == status
        )

    if search:
        query = query.filter(
            Ticket.customer_name.contains(search)
        )

    return query.all()


def get_ticket_by_id(db, ticket_id):
    return (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )


def update_ticket_status(
    db,
    ticket_id,
    status
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if not ticket:
        return None

    ticket.status = status
    ticket.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return ticket

def add_note(
    db,
    ticket_id,
    note_text
):
    note = Note(
        ticket_id=ticket_id,
        note_text=note_text
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


def get_notes(
    db,
    ticket_id
):
    return (
        db.query(Note)
        .filter(
            Note.ticket_id == ticket_id
        )
        .order_by(
            Note.created_at.desc()
        )
        .all()
    )