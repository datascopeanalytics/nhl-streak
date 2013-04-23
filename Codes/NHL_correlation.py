import pickle
import pprint

nhl = pickle.load(open("nhl_streak_42.p"))
# print nhl

mstreaks = {}
wstreaks = {}
ostreaks = {}

total_teams = 0

for season in nhl:

    total_teams += len(nhl[season].keys())

    for team in nhl[season]:
        
        thisteam = nhl[season][team]
        string = season + ' ' + team
        
        ms = thisteam['max_streak']
        ws = thisteam['win_streak']
        os = thisteam['streak']
        
        outcome = thisteam['playoffs']

        try:
            mcount = mstreaks[ms][outcome]['count']
            mstreaks[ms][outcome]['count']=mcount + 1
            mstreaks[ms][outcome]['string'].append(string)
            
        except KeyError:
            try:
                mstreaks[ms][outcome]={'count':1,
                                       'string':[string]}
            except KeyError:
                mstreaks[ms]={}
                mstreaks[ms][outcome]= {'count':1,
                                       'string':[string]}

        try:
            wcount = wstreaks[ws][outcome]['count']
            wstreaks[ws][outcome]['count']=wcount + 1
            wstreaks[ws][outcome]['string'].append(string)
            
        except KeyError:
            try:
                wstreaks[ws][outcome]={'count':1,
                                       'string':[string]}
            except KeyError:
                wstreaks[ws]={}
                wstreaks[ws][outcome]= {'count':1,
                                       'string':[string]}


        try:
            ocount = ostreaks[os][outcome]['count']
            ostreaks[os][outcome]['count']=ocount + 1
            ostreaks[os][outcome]['string'].append(string)
            
        except KeyError:
            try:
                ostreaks[os][outcome]={'count':1,
                                       'string':[string]}
            except KeyError:
                ostreaks[os]={}
                ostreaks[os][outcome]= {'count':1,
                                       'string':[string]}

for ws in wstreaks:
    for outcome in wstreaks[ws]:
        str = wstreaks[ws][outcome]['string']
        wstreaks[ws][outcome]['string']=sorted(str,reverse=True)

for os in ostreaks:
    for outcome in ostreaks[os]:
        str = ostreaks[os][outcome]['string']
        ostreaks[os][outcome]['string']=sorted(str,reverse=True)

for ms in mstreaks:
    for outcome in mstreaks[ms]:
        str = mstreaks[ms][outcome]['string']
        mstreaks[ms][outcome]['string']=sorted(str,reverse=True)


print 'mstreaks'
pprint.pprint(mstreaks[10])

print 'ostreaks'
pprint.pprint(ostreaks[10])

print 'wstreaks'
pprint.pprint(wstreaks[10])

print 'total team*seasons'
print total_teams
