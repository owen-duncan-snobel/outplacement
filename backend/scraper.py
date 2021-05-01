import urllib
import requests

from bs4 import BeautifulSoup
import selenium
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd
import os

def getjobs(job_name, location):
    search_variables = {'q': job_name, 'l': location, 'fromage': 'last', 'sort': 'date'}
    link_url = 'https://ca.indeed.com/jobs?' + urllib.urlencode(search_variables)
    get_page = requests.get(link_url)
    soup_item = BeautifulSoup(get_page.content, "html.parser")
    job_hunt = soup_item.find(id='resultsCol')
    return job_hunt

def getTitle(job_elem):
    title_elem = job_elem.find('h2', class_='title')
    title = title_elem.text.strip()
    return title

def getComp(job_elem):
    company_elem = job_elem.find('span', class_='company')
    company = company_elem.text.strip()
    return company

def getLink(job_elem):
    link = job_elem.find('a')['href']
    link = 'www.ca.indeed.com/' + link
    return link

def getDate(job_elem):
    date_elem = job_elem.find('span', class_='date')
    date = date_elem.text.strip()
    return date
