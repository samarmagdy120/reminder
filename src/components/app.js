import React, { Component } from 'react';
import { add_reminder, remove_reminder, clear_reminder } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './list.png';
class App extends Component {
    state = {
        text: '',
        date: new Date()
    }

    render_reminders = () => {
        const { reminders } = this.props;
        return (
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
                                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                <div className="closeIcon btn btn-danger" onClick={() => { this.props.remove_reminder(reminder.id) }}>x</div>

                            </li>
                        )
                    })
                }
            </ul>
        )


    }
    render() {
        /*  console.log(this.props)*/
        return (
            <div className="App">
                <img src={logo} />
                <div className="reminder-title ">
                    <h2>what shoud you do?</h2>

                </div>

                <input
                    type="text"
                    value={this.state.text}
                    className="form-control"
                    placeholder="Enter what u think...."
                    onChange={(e) => this.setState({ text: e.target.value })}
                />


                <DatePicker
                    value={this.state.date}
                    className="form-control"
                    placeholderText="Enter date"
                    selected={this.state.date}
                    onChange={date => { this.setState({ date: date }) }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                        this.props.add_reminder(this.state.text, this.state.date)
                        this.setState({
                            text: '',
                            date: ''
                        })
                    }}
                >
                    add reminder
     </button>
                {this.render_reminders()}
                <button
                    className="btn btn-danger btn-block" onClick={() => { this.props.clear_reminder() }}>
                    delete reminder
    </button>


            </div>
        )
    }

}

/*function mapDispatchToProps(dispatch){
    return{
        add_reminder:() => dispatch(add_reminder())
    }
}*/

function mapStateToProps(state) {
    return {
        reminders: state
    }
}
export default connect(mapStateToProps, { add_reminder, remove_reminder, clear_reminder })(App);