import calendar, time
from datetime import datetime
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Test Variables
total_sal_per_month = 10000
cpf_rate = 0.8
work_start_time = "0930"
work_end_time = "1900"
work_break_start_time = "1230"
work_break_end_time = "1400"
test_date = 7

# Initialize remaining variables
curr_salary = 0


@app.route("/post", methods=["POST"])
def poster():
    global total_sal_per_month, cpf_rate, work_start_time, work_end_time, work_break_start_time, work_break_end_time
    info = request.json
    total_sal_per_month = int(info[0])
    cpf_rate = 1.0 - int(info[1]) / 100.0
    work_start_time = info[2]
    work_end_time = info[3]
    work_break_start_time = info[4]
    work_break_end_time = info[5]
    return start()


@app.route("/get")
def start():
    work_timings = getWorkTimings(
        work_start_time, work_end_time, work_break_start_time, work_break_end_time
    )
    total_working_hours = work_timings[5]
    num_weekdays = getNumWeekDaysInTheMonth()
    total_net_sal = total_sal_per_month * cpf_rate
    sal_per_hour = total_net_sal / num_weekdays / total_working_hours
    # print("Salary per day: $", format(sal_per_hour * 8, ".2f"))
    curr_sal = getAccumulatedSalary(
        num_weekdays, work_timings, sal_per_hour, total_net_sal
    )
    return curr_sal


def getWorkTimings(wst, wet, wbst, wbet):
    """ Returns all work timings as specified from user in decimal 
    Parameters:
    ----------
        `wst`:  work_start_time
        `wet`:  work_end_time
        `wbst`: work_break_start_time
        `wbet`: work_break_end_time
    Returns:
    ----------
        `[start_time, break_start_time, break_end_time, break_time, end_time]`: Array containing all the timings
    """
    start_time = int(wst[:2]) + int(wst[2:]) / 60
    end_time = int(wet[:2]) + int(wet[2:]) / 60
    break_start_time = int(wbst[:2]) + int(wbst[2:]) / 60
    break_end_time = int(wbet[:2]) + int(wbet[2:]) / 60
    break_time = break_end_time - break_start_time
    working_hours = (break_start_time - start_time) + (end_time - break_end_time)
    return [
        start_time,
        end_time,
        break_start_time,
        break_end_time,
        break_time,
        working_hours,
    ]


def getNumWeekDaysInTheMonth():
    """ Obtain the number of weekdays in the current month
    Returns:
    ----------
        `weekday_count`: Number of weekdays in current month
    """
    curr_date = datetime.now()
    weekday_count = 0
    for week in calendar.Calendar().monthdayscalendar(curr_date.year, curr_date.month):
        for i, day in enumerate(week):
            if day != 0 and i < 5:
                weekday_count += 1
    # print("Number of weekdays in month:", weekday_count)
    return weekday_count


def getTodayInformation():
    """ Returns number of WHOLE weekdays user have worked in the current month 
        E.g. 1st Apr is Wed and today is 3rd Apr (Fri). The total number of whole weekdays worked is 2 since today is not OVER yet
    Returns:
    ----------
        `workingdays_passed`: Number of WHOLE weekdays worked in the current month
        `is_weekday`: Whether it is a weekday for today
    """
    curr_date = datetime.now()
    curr_day = workingdays_passed = 0
    is_weekday = False
    for week in calendar.Calendar().monthdayscalendar(curr_date.year, curr_date.month):
        for i, day in enumerate(week):
            if day != 0:
                curr_day += 1
                if i < 5:
                    workingdays_passed += 1
            # Replace curr_date.day with test_date for testing
            if curr_day == curr_date.day:
                if i < 5:
                    workingdays_passed -= 1
                    is_weekday = True
                    # print("Work day not passed yet")
                # print("Today's date:", curr_date, datetime.today().strftime("%A"))
                # print("Number of full working days passed:", workingdays_passed)
                return workingdays_passed, is_weekday


def getTimeWorkedForTheDay(work_timings):
    """ Get the total time worked for today.
    Parameters:
    ----------
        `work_timings`:  Array containing all the work timings
    Returns:
    ----------
        `worked_time`: Total worked time
    """
    curr_date = datetime.now()
    # Adjust time now by adding / subtracting to working hours
    time = curr_date.hour + (curr_date.minute / 60)
    start_time, end_time, break_start_time, break_end_time, break_time, working_hours = (
        work_timings
    )
    # print("Current time now is:", curr_date.hour, ":", curr_date.minute)
    if time < start_time:
        worked_time = 0
    elif time >= start_time and time < break_start_time:
        worked_time = time - start_time
    elif time >= break_start_time and time < break_end_time:
        worked_time = break_start_time - start_time
    elif time >= break_end_time and time <= end_time:
        worked_time = time - break_time - start_time
    elif time > end_time:
        worked_time = working_hours
    return worked_time


def getAccumulatedSalary(num_weekdays, work_timings, sal_per_hour, total_net_sal):
    """ Calculate salary earned at the current point of time. For now accuracy is up to minutes, meaning new salary only updates every minute. Future improvements can be made to update new salary every second
    Parameters:
    ----------
        `work_timings`:  Array containing all the work timings
        `sal_per_hour`:  Salary earned per hour, variable changes every month due to different number of working days in a month
    """

    hours_worked = 0
    num_workingdays_passed, is_weekday = getTodayInformation()
    if is_weekday:
        hours_worked = getTimeWorkedForTheDay(work_timings)
        # print("Hours worked for the day:", format(hours_worked, ".2f"), "h")
    curr_sal = (num_workingdays_passed / num_weekdays) * total_net_sal
    curr_sal += hours_worked * sal_per_hour
    # print("Current salary:", format(curr_sal, ".2f"))
    # print("----------------------------------------------------------------------")
    return format(curr_sal, ".2f")
