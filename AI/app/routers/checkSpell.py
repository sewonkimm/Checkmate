from fastapi import APIRouter
from pydantic import BaseModel
from hanspell import spell_checker
from hanspell.constants import CheckResult

router = APIRouter()

class Data(BaseModel):
    sentence: str

@router.post('/checkSpell')
def checkSpell(Sentences: Data):
    sentence = Sentences.sentence.replace('\r', '').replace('\n', '')
    checked_sent = spell_checker.check(sentence)

    # 띄어쓰기가 없는 문장 임의로 만들기
    unspaced_sent = sentence.replace('\r', '').replace('\n', '').replace(' ', '')
    spaced_checked_sent = spell_checker.check(unspaced_sent)

    total = 0
    errors = 0
    wrong_spelling = 0
    wrong_spacing = 0
    ambiguous = 0
    statistical_correction = 0

    for key, value in checked_sent.words.items():

        total = total + 1

        if value == CheckResult.WRONG_SPELLING:
            wrong_spelling = wrong_spelling + 1
            errors = errors + 1
        elif value == CheckResult.WRONG_SPACING:
            wrong_spacing = wrong_spacing + 1
            errors = errors + 1
        elif value == CheckResult.AMBIGUOUS:
            ambiguous = ambiguous + 1
            errors = errors + 1
        elif value == CheckResult.STATISTICAL_CORRECTION:
            statistical_correction = statistical_correction + 1
            errors = errors + 1

    return {"original": checked_sent.original, "checked": spaced_checked_sent.checked,
            "errors": errors, "total": total, "errorRate": round(errors / total * 100, 2),
            "wrongSpelling": wrong_spelling, "wrongSpacing": wrong_spacing,
            "ambiguous": ambiguous, "statisticalCorrection": statistical_correction}
