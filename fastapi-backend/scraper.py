import urllib
import requests

from bs4 import BeautifulSoup
import pandas as pd
import json

"""
 MORE PARAMETERS THAT CAN BE USED CAN BE FOUND HERE https://opensource.indeedeng.io/api-documentation/docs/job-search/#request_params
"""
# Extracting raw HTML
def get_jobs(job_name, location, page):
    search_variables = {'q': job_name, 'l': location, 'fromage': 'last', 'sort': 'date', 'start': page * 10}
    link_url = 'https://ca.indeed.com/jobs?' + urllib.parse.urlencode(search_variables)
    get_page = requests.get(link_url)
    soup_item = BeautifulSoup(get_page.content, "html.parser")
    job_hunt = soup_item.find(id='resultsCol')
    return job_hunt
    
# Extracting details
def get_title(job_elem):
    title_elem = job_elem.find('h2', class_='title')
    title = title_elem.text.strip()
    return title

def get_loc(job_elem):
    location_elem = job_elem.find('div', class_='recJobLoc')
    return(location_elem.get("data-rc-loc"))
   

def get_comp(job_elem):
    company_elem = job_elem.find('span', class_='company')
    company = company_elem.text.strip()
    return company

def getLink(job_elem):
    link = job_elem.find('a')['href']
    link = 'ca.indeed.com/viewjob?' + link[8:len(link)-1]
    return link

def get_date(job_elem):
    date_elem = job_elem.find('span', class_='date')
    date = date_elem.text.strip()
    return date

def getJobDescription(job_elem):
    list_of_desc = []
    desc = job_elem.find_all('div', attrs={'class':'summary'})
    for d in desc:
        list_of_desc.append(d.text.strip())
    
    return list_of_desc
        
    
# Getting the job information
def get_job_info(job_hunt):
    job_elems = job_hunt.find_all('div', class_='jobsearch-SerpJobCard')

    col = []
    extracted_info = []
    
    titles = []
    col.append('titles')
    for job_elem in job_elems:
        titles.append(get_title(job_elem))
    extracted_info.append(titles)
    

    companies = []
    col.append('companies')
    for job_elem in job_elems:
        companies.append(get_comp(job_elem))
    extracted_info.append(companies)

    
    links = []
    col.append('links')
    for job_elem in job_elems:
        links.append(getLink(job_elem))
    extracted_info.append(links)
        

    dates = []
    col.append('date_listed')
    for job_elem in job_elems:
        dates.append(get_date(job_elem))
    extracted_info.append(dates)
    

    locations = []
    col.append('location_job')
    for job_elem in job_elems:
        locations.append(get_loc(job_elem))
    extracted_info.append(locations)  
        

    descriptions = []
    col.append('description')
    for job_elem in job_elems:
        descriptions.append(getJobDescription(job_elem))
    extracted_info.append(descriptions)
          
    jobs_list = {}

    for i in range(len(col)):
        jobs_list[col[i]] = extracted_info[i]

    json_jobs_list = json.loads(pd.DataFrame.from_dict(jobs_list).to_json(orient='records'))
    return json_jobs_list
