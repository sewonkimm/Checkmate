from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from hanspell import spell_checker
from app.database.conn import db
from app.database.schema import correction

router = APIRouter()

class Data(BaseModel):
    sentence: str

@router.post('/recommendWords')
def recommendWords(Sentences: Data, session: Session = Depends(db.session)):
    sentence = Sentences.sentence
    checked_sent = spell_checker.check(sentence)

    correction_words = session.query(correction).all()
    arr1 = []
    arr2 = []
    arr3 = []
    arr4 = []
    arr5 = []
    arr6 = []
    arr7 = []

    for w in correction_words:
        if w.correction_before in checked_sent.checked:
            if w.correction_category == 1:
                arr1.append((w.correction_before, w.correction_after))
            elif w.correction_category == 2:
                arr2.append((w.correction_before, w.correction_after))
            elif w.correction_category == 3:
                arr3.append((w.correction_before, w.correction_after))
            elif w.correction_category == 4:
                arr4.append((w.correction_before, w.correction_after))
            elif w.correction_category == 5:
                arr5.append((w.correction_before, w.correction_after))
            elif w.correction_category == 6:
                arr6.append((w.correction_before, w.correction_after))
            elif w.correction_category == 7:
                arr7.append((w.correction_before, w.correction_after))

    return {1: arr1, 2: arr2, 3: arr3, 4: arr4, 5: arr5, 6: arr6, 7: arr7}
