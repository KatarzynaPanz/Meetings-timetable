import React from 'react';

class CalendarForm extends React.Component {

    submitHandle = (e) => {
        e.preventDefault();
        const {addMeetingToArray} = this.props;
        let errors = [];
        errors = this.checkData();
        console.log(errors);
        if(errors.length > 0){
            errors.map(err=>{
                return alert(err);
            })
        }
        else{
        addMeetingToArray();
        }
    }

    inputChange = (e) => {
        const{change} = this.props;
        const{name, value} = e.target;
        change(name, value);
    }

    checkData() {
        const{itemFirstName, itemLastName, itemEmail, itemDate, itemTime} = this.props;
        const errors = [];
        if(itemFirstName.length <= 2) {
            errors.push('FirstName must contain more than 2 letters!')
        }
        if(itemLastName.length <= 2) {
            errors.push('LastName must contain more than 2 letters!')
        }
        const regEmail = /([a-zA-Z0-9\\_\\-\\.]+)@([a-zA-Z]+).(.+)/;
        if(!regEmail.test(itemEmail)) {
            errors.push('Email must contain "@" and be in the correct format');
        }
        const regDate = /^\d{4}-\d{2}-\d{2}$/;
        if(!regDate.test(itemDate)) {
            errors.push('Date must be in the format: "YYYY-MM-DD"');
        }
        const regTime = /^\d{2}:\d{2}$/;
        if(!regTime.test(itemTime)) {
            errors.push('Time must be in the format: "HH:MM"');
        }
        return errors;
    }

    render() {
        const{itemFirstName, itemLastName, itemEmail, itemDate, itemTime} = this.props;
        return (
            <section>
                <form onSubmit={this.submitHandle}>
                    <label>firstName:</label>
                        <input name="firstName"
                        value={itemFirstName}
                        onChange={this.inputChange}/>
                    <label>lastName:</label>
                        <input name="lastName"
                        value={itemLastName}
                        onChange={this.inputChange}/>
                    <label>email:</label>
                        <input name="email"
                        value={itemEmail}
                        onChange={this.inputChange}/>
                    <label>date:</label>
                        <input name="date"
                        value={itemDate}
                        onChange={this.inputChange}/>
                    <label>time:</label>
                        <input name="time"
                        value={itemTime}
                        onChange={this.inputChange}/>
                    <input type="submit"/>
                </form>
            </section>
        )
    }
}

export default CalendarForm;