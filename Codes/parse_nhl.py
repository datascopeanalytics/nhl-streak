from bs4 import BeautifulSoup
import glob
import pickle
from pprint import pprint

filenames = glob.glob('../web/data/html_per_year/*')
filenames = sorted(filenames,reverse=True)

nhl_dict = {}
for fname in filenames:
    print 'opening ' + fname
    with open('nhl_parse_out.txt', 'w') as outfile:
        
        #what year is it
        year = fname.split("_")[3]
        if int(year) < 1940:
            continue
        nhl_dict[year] = {}

        #find the table in the html
        f=open(fname)
        html=f.read()
        soup=BeautifulSoup(html)

        tables=soup.findAll("table")
        table=tables[0]
        ptable=tables[1]
        
        #per line of table
        for row in table.findAll('tr'):
            
            cols=row.findAll('td')
            if len(cols):

                
                # identify home team, away team 
                # decide point value for each team
                hometeam = str(cols[1].string)
                ht_score = int(cols[2].string)
                
                awayteam = str(cols[3].string)
                at_score = int(cols[4].string)
                
                # Away team wins!
                if ht_score < at_score:
                    at_points = 2

                    # Checking to see if the home team deserves a
                    # point in the case of a shootout or OT
                    if cols[5].string:
                        ht_points = 1
                    else:
                        ht_points = 0

                # Motha f'n home team wins!
                elif ht_score > at_score:
                    ht_points = 2

                    # Checking to see if the away team deserves a
                    # point in the case of a shootout or OT
                    if cols[5].string:
                        at_points = 1
                    else:
                        at_points = 0
                # We have a tie :( Only occurs in years previous to
                # 2005
                else:
                    at_points = 1
                    ht_points = 1
                    
                try:
                    nhl_dict[year][hometeam]['reg'].append(ht_points)
                except KeyError:
                    nhl_dict[year][hometeam] = {'reg':[ht_points],
                                                'playoffs':0}
                try:
                    nhl_dict[year][awayteam]['reg'].append(at_points)
                except KeyError:
                    nhl_dict[year][awayteam] = {'reg':[at_points],
                                                'playoffs':0}

    # For every year, figure out the streak
    for team, value in nhl_dict[year].iteritems():
        counter = 0
        max_streak = 0
        current_streak = 0;
        while value['reg'][counter] != 0:
            counter += 1
        value['streak'] = counter

        # adding code to include max streak throughout the season as well
        for point in value['reg'][counter:]:
            if point != 0:
                current_streak += 1
            else:
                max_streak = max(current_streak,max_streak)
                current_streak = 0
        max_streak = max(current_streak,max_streak)
        value['max_streak'] = max_streak


    # For every year, assign playoff value to applicable teams
    playoff_teams=[]
    rows=ptable.findAll("tr")

    for row in reversed(rows):
        cols=row.findAll("td")
                    
        if len(cols):
            team1 = str(cols[1].string)
            team2 = str(cols[3].string)

            if team1 not in playoff_teams:
                playoff_teams.append(team1)
            if team2 not in playoff_teams:
                playoff_teams.append(team2)


    # apply the scores based on the list
    for i, team in enumerate(playoff_teams):
        if i <= 1:
            nhl_dict[year][team]['playoffs'] = 4
        elif i <= 3:
            nhl_dict[year][team]['playoffs'] = 3
        elif i <= 7:
            nhl_dict[year][team]['playoffs'] = 2
        else:
            nhl_dict[year][team]['playoffs'] = 1

    # who won the stanley cup?
    cols = rows[-1].findAll("td")
    if int(cols[2].string)>int(cols[4].string):
        sc_winner=str(cols[1].string)
    else:
        sc_winner=str(cols[3].string)
    nhl_dict[year][sc_winner]['playoffs']=5


    # print playoff_teams

    print nhl_dict[year]
    #nhl2012=nhl_dict[year]
    #tempout=open('tempout.pkl','wb')
    #pickle.dump(nhl2012,tempout)
    #tempout.close()

print "dumping the file"
pickle.dump(nhl_dict,open('nhl_streak_40.p', "wb"))


                



