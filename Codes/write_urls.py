base_url='http://www.hockey-reference.com/leagues/NHL_'

with open('../web/data/urls_out.txt', 'w') as outfile:
    

    for year in range(1918,2013):
        write_url=base_url + str(year) + '_games.html\n'
        outfile.write(write_url)
    
                          
