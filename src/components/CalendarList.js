import React from 'react';

class CalendarList extends React.Component {
    render() {
        const {items} = this.props;
        let id = 0;
        const list = items.map(element => {id++;
            return <li key={id}>firstName: {element.firstName} lastName: {element.lastName} email: {element.email} date: {element.date} time: {element.time}</li>
        })
        return <ul>{ list }</ul>
    }

}

export default CalendarList;