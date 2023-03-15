import React from 'react';
//import ReactDOM from 'react-dom';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';
//import calendarProvider from './calendarProvider';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'http://localhost:3005/meetings'
        }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        meetingsList: [],
    }


    addMeetingToMeetingList = () => {
        const {firstName, lastName, email, date, time} = this.state;
        this.setState({
        meetingsList: [...this.state.meetingsList, {firstName, lastName, email, date, time}],
        });
        const data = {firstName: firstName, lastName: lastName, email: email, date: date, time: time};
        this.addMeetingToDataJson(data);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            date: '',
            time: '',
        });
    }

    fieldValueChange = (name, value) => {
        this.setState({
            [name]: value,
        });
    }

    addMeetingToDataJson = (data) => {
        //Poniżej próba zastosowanie fetch z osobnego pliku (calendarProvider), w ten sposób nie działa, nie do końca wiem czego brakuje, proszę o podpowiedź :)
        //const api = new calendarProvider;
        //api.create(data);

        const options = {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(this.url, options)
            .then(resp => {
            if(resp.ok) {
                return resp.json();
            }
               throw new Error ("Network error!");
            })
            .then(resp => {
                console.log(resp);
            })
            .finally( console.log('Dodano nowe spotkanie!') );
    }

    render() {
        const  { meetingsList } = this.state;
        console.log(meetingsList);
        const {firstName, lastName, email, date, time} = this.state;
        return (
            <section>
                <CalendarForm itemFirstName={firstName} itemLastName={lastName} 
                itemEmail={email} itemDate={date} itemTime={time} addMeetingToArray={this.addMeetingToMeetingList} change={this.fieldValueChange}/>
                <CalendarList items={meetingsList}/>
            </section>
        )
    }
}

export default Calendar;