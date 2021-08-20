import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import useCalendar from './useCalendar';
import "./Calendar.css"

const CalendarComponent = () => {
    const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
    const dispatch = useDispatch();
    const [rsvp, setRsvp] = useState([]);
    const dateClickHandler = date => {
        console.log(date);
    }

    const user = useSelector(state => state.session.user)
    useEffect(() => {
        setRsvp(user?.rsvp)
    }, [dispatch])

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
                                    {cols.map(col => (
                                        rsvp.forEach(rsvp => {
                                            if (rsvp.start === col.date) {
                                                <td key={col.date} className={`${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
                                                    {col.value}
                                                </td>
                                            }
                                        })}
                                        < td key = { col.date } onClick = {() => dateClickHandler(col.date)}><div className='indv-date'>{col.date}</div></td>
                                        ))}
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
