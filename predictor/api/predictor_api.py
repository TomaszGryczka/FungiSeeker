import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from predictor import Predictor

security = HTTPBasic()
app = FastAPI(dependencies=[Depends(security)])

users = {
    os.environ.get("FUNGI_SEEKER_PREDICTOR_LOGIN"): {
        "password": os.environ.get("FUNGI_SEEKER_PREDICTOR_PASSWORD"),
        "token": "",
        "priviliged": True
    }
}

model_url = os.environ.get("FUNGI_SEEKER_PREDICTOR_MODEL_URL")
predictor = Predictor(model_url)

def verification(creds: HTTPBasicCredentials = Depends(security)):
    username = creds.username
    password = creds.password
    if username in users and password == users[username]["password"]:
        print("User Validated")
        return True
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )

@app.get("/")
async def root(url: str, Verifcation = Depends(verification)):
    
    return predictor.predict(url)

    

