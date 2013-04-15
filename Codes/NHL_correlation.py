import pickle
from numpy import *
from pylab import *

nhl = pickle.load(open("nhl_streak_40.p"))
whl = pickle.load(open('nhl_streak_wwin.p'))

first_game = []
outcome = []
season_lengths = []
ostreaks = []
mstreaks = []
wstreaks = []
woutcomes = []
games = []
outcomemat = []

seasons = nhl.keys()
seasons = sorted(seasons,reverse=True)
# seasons.sort()
# print seasons


for season in nhl:
    for team  in nhl[season]:
        # print team
        # print nhl[season][team]
        
        playoffs=(nhl[season][team]['playoffs'])
        outcome.append(playoffs)

        ostreak = nhl[season][team]['streak']
        ostreaks.append(ostreak)
        
        mstreak = nhl[season][team]['max_streak']
        mstreaks.append(mstreak)

        game1=(nhl[season][team]['reg'][0])
        first_game.append(game1)
        season_lengths.append(len(nhl[season][team]['reg']))
            
        reg = nhl[season][team]['reg']
        if len(reg) == 82:
            games.append(reg)
            # print 'appending ',[season],[team]
            omat=[playoffs]*82
            outcomemat.append(omat)

        elif len(reg) < 82:
            game_buffer = 82 - len(reg)
            # print 'game_buffer: ',game_buffer
            omat = [playoffs]*len(reg)

            a=reg[:len(reg)/2]
            c=reg[len(reg)/2:]
            # print len(reg),len(a),len(c)

            oa=omat[:len(reg)/2]
            oc=omat[len(reg)/2:]
            
            for i in range(0,game_buffer):
                a.append(999)
                oa.append(999)
            a.extend(c)
            oa.extend(oc)
            # print a
            games.append(a)
            outcomemat.append(oa)

        else: 
            omat = [playoffs]*82
            outcomemat.append(omat)
            reg=reg[:82]
            games.append(reg)

years = sorted(whl.keys())
for year in years:
    for team in whl[year]:
        wstreak = whl[year][team]['win_streak']
        wstreaks.append(wstreak)
        woutcome = whl[year][team]['playoffs']
        woutcomes.append(woutcome)
        
win_corr = corrcoef(wstreaks,woutcomes)[0][1]
print 'corr coef btw win streak and playoff outcome:'
print win_corr
# print first_game, outcome
# print len(first_game), len(outcome)

first_corr = corrcoef(first_game,outcome)[0][1]
print 'corr coef btw first game and playoff outcome:'
print first_corr

ostreak_corr = corrcoef(ostreaks,outcome)[0][1]
print 'corr coef btw opening season streak and playoff outcome:'
print ostreak_corr

mstreak_corr = corrcoef(mstreaks,outcome)[0][1]
print 'corr coef btw longest point streak and playoff outcome:'
print mstreak_corr

# maxes = mstreaks
# maxes = sorted(maxes,reverse=True)
# print maxes[:10]

# hist(mstreaks,35)
# xlabel('maximum point streak')
# ylabel('# of team*seasons')
# title('point streak histogram (unrestricted)')
# show()
# savefig('point_streak_histogram')

# hist(ostreaks,20)
# xlabel('maximum opening season point streak')
# ylabel('# of team*seasons')
# title('point streak histogram (opening season)')
# show()
# savefig('opening_streak_histogram')
print 'max win streak :',max(wstreaks)
hist(wstreaks,21)
# show()

print 'Top point streak teams and outcome'
for year in nhl:
    for team in nhl[year]:
        value = nhl[year][team]['max_streak']
        outcome = nhl[year][team]['playoffs']
        if value > 20:
            print year, team, value, 'playoffs:',outcome

# print 'Top opening season point streaks and outcome'
# for year in nhl:
#     for team in nhl[year]:
#         value = nhl[year][team]['streak']
#         outcome = nhl[year][team]['playoffs']
#         if value > 10:
#             print year, team, value, 'playoffs:',outcome

# print 'Top win streaks and outcome'
# for year in whl:
#     for team in whl[year]:
#         value = whl[year][team]['win_streak']
#         outcome = whl[year][team]['playoffs']
#         if value == 12:
#             print value, year, team, 'playoffs:',outcome

g = array(games)
o = array(outcomemat)

correlations = []

for i in range(0,82):

    gcol = g[:,i]
    gcole = gcol.compress(gcol<50)
    ocol = o[:,i]
    ocole = ocol.compress(ocol<50)

    # print corrcoef(ocole,gcole)[0][1]
    correlations.append(corrcoef(ocole,gcole)[0][1])

# print correlations

# duh this is by game-within-season, not by season
# x2 = sorted(nhl.keys())
# x3=[int(year) for year in x2]
# print x3

# attempt running average
# c=correlations
# n=5 #window
# ravg=convolve(c, np.ones((n,))/n)[(n-1):]
# ravg = ravg[:78]
# header=[c[0],mean(c[:2]),mean(c[:3]),mean(c[:4])]
# running_avg=header
# running_avg.extend(ravg)


# plot(correlations,'b.')
# plot(running_avg,'r')
# show()




