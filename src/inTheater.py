from bs4 import BeautifulSoup
import requests
import re

url = 'https://www.imdb.com/search/title/?title_type=feature&user_rating=7.0,&groups=now-playing-us'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')

links = [a.attrs.get('href')for a in soup.select('h3.lister-item-header a')]
titles = soup.select('h3.lister-item-header a')
years = soup.select('span.lister-item-year')
certificates = soup.select('span.certificate')
runtimes = soup.select('span.runtime')
genres = soup.select('span.genre')
ratings = [e.attrs.get('data-value') for e in soup.select('div.ratings-imdb-rating')]

imdb = []

# Store each item into dictionary (data), then put those into a list (imdb)
for index in range(0, len(links)):
    data = {"title": titles[index].get_text(),
            "year": years[index].get_text(),
            "certificate": certificates[index].get_text(),
            "runtime": runtimes[index].get_text(),
            "rating": ratings[index],
            "genre": genres[index].get_text().rstrip().lstrip(),
            "link": links[index]}
    imdb.append(data)

for item in imdb:
    print(item['title'], '-', item['year'], '-' , item['certificate'] ,'-', item['runtime'],'-', item['rating'],'-', item['genre'],'- imdb.com'+ item['link'])
  