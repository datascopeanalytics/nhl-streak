import pickle

nhl = pickle.load(open("nhl_streak_40.p"))

# pittsburgh streak

# the only other teams to reach 14 straight wins were 
# 1929-30 Bruins
# out of range

# 2009-2010 Washington Capitals
print '2010 Capitals (14) playoffs:'
print nhl['2010']['Washington Capitals']['playoffs']
# lost in first round 

# 1981-1982 New York Islanders
print '82 Islanders (15) playoffs:'
print nhl['1982']['New York Islanders']['playoffs']
# won Stanley Cup

# 1992-1993 Pittsburgh Penguins
print '93 Penguins (17) playoffs: '
print nhl['1993']['Pittsburgh Penguins']['playoffs']
# lost in second round




for year in nhl:
    for team in nhl[year]:
        value = nhl[year][team]['max_streak']
        if value == 35:
            print year, team, value
            
