import urllib
import requests

from bs4 import BeautifulSoup
import pandas as pd
import os

# Extracting raw HTML
def getJobs(job_name, location):
    search_variables = {'q': job_name, 'l': location, 'fromage': 'last', 'sort': 'date'}
    link_url = 'https://ca.indeed.com/jobs?' + urllib.parse.urlencode(search_variables)
    get_page = requests.get(link_url)
    soup_item = BeautifulSoup(get_page.content, "html.parser")
    job_hunt = soup_item.find(id='resultsCol')
    return job_hunt

# Extracting details
def getTitle(job_elem):
    title_elem = job_elem.find('h2', class_='title')
    title = title_elem.text.strip()
    return title

def getComp(job_elem):
    company_elem = job_elem.find('span', class_='company')
    company = company_elem.text.strip()
    return company

def getLink(job_elem):
    link_elem = job_elem.find('a')['href']
    link = 'www.ca.indeed.com/' + link_elem
    return link

def getDate(job_elem):
    date_elem = job_elem.find('span', class_='date')
    date = date_elem.text.strip()
    return date

    
# Getting the job information
def getJobInfo(job_hunt, desired_charac):
    job_elems = job_hunt.find_all('div', class_='jobsearch-SerpJobCard')

    col = []
    extracted_info = []
    
    if 'titles' in desired_charac:
        titles = []
        col.append('titles')
        for job_elem in job_elems:
            titles.append(getTitle(job_elem))
        extracted_info.append(titles)
    
    if 'companies' in desired_charac:
        companies = []
        col.append('companies')
        for job_elem in job_elems:
            companies.append(getComp(job_elem))
        extracted_info.append(companies)

    if 'links' in desired_charac:
        links = []
        col.append('links')
        for job_elem in job_elems:
            links.append(getLink(job_elem))
        extracted_info.append(links)
        
    if 'date_listed' in desired_charac:
        dates = []
        col.append('date_listed')
        for job_elem in job_elems:
            dates.append(getDate(job_elem))
        extracted_info.append(dates)
    
    jobs_list = {}
    
    for i in range(len(col)):
        jobs_list[col[i]] = extracted_info[i]
    
    list_len = len(extracted_info[0])
    
    # Convert to JSON
    # jobs_list = pd.DataFrame.to_json(orient='split')
    
    
    return jobs_list,list_len
print(getJobInfo(getJobs('data+science', 'Toronto'), 'job_description'))