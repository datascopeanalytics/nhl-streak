import pickle
import pprint

nhl = pickle.load(open("nhl_streak_42.p"))
# print nhl

mstreaks = {}
wstreaks = {}
ostreaks = {}

total_teams = 0
max_mc = 0
max_wc = 0
max_oc = 0

max_test = max(max_mc,10)
print max_test


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
            max_mc = max(max_mc,mcount+1)
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
            max_wc = max(max_wc,wcount+1)
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
            max_oc = max(max_oc,ocount+1)
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
        
        count = wstreaks[ws][outcome]['count']
        wstreaks[ws][outcome]['adj_count']=count*1.0/max_wc
        
for os in ostreaks:
    for outcome in ostreaks[os]:
        str = ostreaks[os][outcome]['string']
        ostreaks[os][outcome]['string']=sorted(str,reverse=True)

        count = ostreaks[os][outcome]['count']
        ostreaks[os][outcome]['adj_count']=count*1.0/max_oc

for ms in mstreaks:
    for outcome in mstreaks[ms]:
        str = mstreaks[ms][outcome]['string']
        mstreaks[ms][outcome]['string']=sorted(str,reverse=True)

        count = mstreaks[ms][outcome]['count']
        mstreaks[ms][outcome]['adj_count']=count*1.0/max_mc



print 'longest mstreak'
print max(mstreaks.keys())

print 'longest ostreak'
print max(ostreaks.keys())

print 'longest wstreak'
print max(wstreaks.keys())

print 'oc/wc/mc'
print max_oc,max_wc,max_mc

master_pickle={'mdict':mstreaks,
               'odict':ostreaks,
               'wdict':wstreaks}

with open('streak_histogram_data.pkl','wb') as outfile:
    pickle.dump(master_pickle,outfile)



