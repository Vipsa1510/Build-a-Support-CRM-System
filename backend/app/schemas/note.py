from pydantic import BaseModel


class NoteCreate(BaseModel):
    note_text: str