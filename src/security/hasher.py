import bcrypt


def hash_pw(password: str):
    salt = _generate_salt(12)
    encoded_pw = f'{password}'.encode('utf-8')
    hashed_pw = bcrypt.hashpw(encoded_pw, salt)
    return hashed_pw, salt

def check_pw(password: str, hashed_pw: str) -> bool:
    encoded_pw = f'{password}'.encode('utf-8')
    return bcrypt.checkpw(encoded_pw, hashed_pw)

def _generate_salt(log_round: int = 12) -> str:
    return bcrypt.gensalt(log_round)