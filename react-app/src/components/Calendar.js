import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import useCalendar from './useCalendar';
import "./Calendar.css"

const CalendarComponent = () => {
    const { calendarRows, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
    const dispatch = useDispatch();
    const [rsvp, setRsvp] = useState([]);
    const dateClickHandler = date => {
        // console.log(date);
    }

    const user = useSelector(state => state.session.user)
    useEffect(() => {
        setRsvp(user.rsvp)

    }, [dispatch, rsvp, user])

    const strToNum = (str) => {
        if (str === 'Jan') return '1';
        if (str === 'Feb') return '2';
        if (str === 'Mar') return '3';
        if (str === 'Apr') return '4';
        if (str === 'May') return '5';
        if (str === 'Jun') return '6';
        if (str === 'Jul') return '7';
        if (str === 'Aug') return '8';
        if (str === 'Sep') return '9';
        if (str === 'Oct') return '10';
        if (str === 'Nov') return '11';
        if (str === 'Dec') return '12';
    }

    return (
        <Fragment>
            <div className='calendar'>
                <div className='prev-next-buttons'>
                    <p>Selected Month: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</p>
                    <button className="prev-button" onClick={getPrevMonth}>Prev</button>
                    <button className="next-button" onClick={getNextMonth}>Next</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {daysShort.map(day => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.values(calendarRows).map(cols => {
                                return <tr key={cols[0].date}>
                                    {cols.map(col => {
                                        const event = user.rsvp.filter(rsvp => rsvp.start.slice(5, 7) === col.value.toString() && strToNum(rsvp.start.slice(8, 11)) === col.date.split('-')[1])
                                        return (
                                            user.rsvp.some(rsvp => rsvp.start.slice(5, 7) === col.value.toString() && strToNum(rsvp.start.slice(8, 11)) === col.date.split('-')[1])
                                                ? <td key={col.date} onClick={() => dateClickHandler(col.date)}>
                                                    <div className='indv-date'>{col.value}<a className='cal-rsvp' href={`/events/${event[0].id}`}>{event[0].category}</a></div>
                                                </td>
                                                : < td key={col.date} onClick={() => dateClickHandler(col.value)}><div className='indv-date'>{col.value}</div></td>
                                        )
                                    })}
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Fragment >
    );
}

export default CalendarComponent;
