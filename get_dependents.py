from selenium import webdriver
from bs4 import BeautifulSoup
import time
import json


CHROMEDRIVER_PATH = "/System/Volumes/Data/Users/jiaxinliu/.cache/selenium/chromedriver/mac-arm64/116.0.5845.96/chromedriver"

def get_dependent_repos():
    url = "https://github.com/simonzhang00/ripser-plusplus/network/dependents"
    
    # Configure the Chrome driver
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    
    with webdriver.Chrome(options=options) as driver:
        driver.get(url)
        time.sleep(5)  # Allow the page to load

        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Find all dependent repositories
        dependents = soup.find_all('div', class_='Box-row')

        repo_data = []
        for dependent in dependents:
            user_tag = dependent.find('a', {'data-hovercard-type': 'user'})
            repo_tag = dependent.find('a', {'data-hovercard-type': 'repository'})

            if user_tag and repo_tag:
                user_name = user_tag.text.strip()
                user_link = user_tag.get('href')
                repo_name = repo_tag.text.strip()
                repo_link = repo_tag.get('href')

                repo_data.append({
                    'user_name': user_name,
                    'user_link': "https://github.com" + user_link,
                    'repo_name': repo_name,
                    'repo_link': "https://github.com" + repo_link
                })

        return repo_data

if __name__ == "__main__":
    repos = get_dependent_repos()
    for item in repos:
        print(f"User Name: {item['user_name']}, User Link: {item['user_link']}, Repo Name: {item['repo_name']}, Repo Link: {item['repo_link']}")


    with open('dependent_repos.json', 'w') as file:
        json.dump(repos, file)
