from fastapi import FastAPI, HTTPException
from scraper import get_jobs,get_job_info


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


# item_id: str, needy: str, skip: int = 0, limit: Optional[int] = None
@app.get("/jobs/")
async def jobs(q:str, l:str, page_id: int = 0):
    try:
        job_html = get_jobs(q, l, page_id)
        jobs_info = get_job_info(job_html)
        return jobs_info
    except Exception:

        raise HTTPException(400, 'Error unable to fetch jobs')  

