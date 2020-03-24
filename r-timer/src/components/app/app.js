import React from 'react';
import './timer.css';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import * as actions from "../../actions/actions";
import * as actions from '../../reducers/reducers';

import Modal from '../modal';

class Timer extends React.Component {

  timerId = null;
  timeStart = null;
  state = {
    flag: false,
    hidden: true,
    sec: '00',
    min: '00',
    h: '00',
    taskText: '',
    taskId: 1,
  };

  componentDidMount() {
    /*  const {tasks} = this.props;
      let result = tasks.some(item => item.statusTask === 'progress');
      if (result) {
          let openSiteTime = new Date();
          let taskProgress = tasks.filter(item => item.statusTask === 'progress');
          const {timeStart} = taskProgress[0];
          let timeSpend = this.timeSpend(new Date(timeStart), openSiteTime);
          let timeSpendSplit = timeSpend.split(':');
          this.setState(() => ({
              h: timeSpendSplit[0],
              min: timeSpendSplit[1],
              sec: timeSpendSplit[2],
              hidden: false,
              flag: true,
          }));
          this.timeStart = new Date(timeStart);
      }

     */

  }

  componentDidUpdate() {
    /*const {flag} = this.state;
    if (flag) {
        this.setState(() => ({
            flag: false,
        }))
        this.startTimer();
    }*/
  }

  useStyles = () => makeStyles({
      timerBtn: {
        background: '#fff',
        textTransform: 'uppercase',
      },
    },
  );

  changeShowBtn = () => {
    let rel = 1;
    let oleg = 'oeg';
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };

  onTimerWrap = () => {
    // const {addProgressTask} = this.props;
    let { sec, min, h, taskId, flag } = this.state;
    this.timeStart = new Date();
    const payload = {
      taskId: taskId, timeStart: this.timeStart, statusTask: 'progress',
    };

    //  addProgressTask(payload);
    this.setState(() => ({
      taskId: taskId + 1,
    }));
    this.startTimer();

  };

  startTimer = () => {
    let { sec, min, h, taskId, flag } = this.state;
    this.timerId = setInterval(() => {
      sec = parseInt(sec) + 1;
      min = parseInt(min);
      h = parseInt(h);

      if (sec === 60) {
        sec = 0;
        min++;
      }
      sec = sec < 10 ? '0' + sec : sec;

      if (min === 60) {
        min = 0;
        h++;
      }
      min = min < 10 ? '0' + min : min;
      h = h < 10 ? '0' + h : h;
      this.setState(() => ({
        sec,
        min,
        h,
      }));

    }, 1000);
  };

  timeSpend = (timeStart, timeEnd) => {

    let seconds = (timeEnd - timeStart) / 1000 ^ 0;
    let h = seconds / 3600 ^ 0;
    let m = (seconds - h * 3600) / 60 ^ 0;
    let s = (seconds - h * 3600) % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    return (`${h}: ${m}: ${s}`);
  };

  stopTimer = (event) => {
    const { sec, min, h, taskText, taskId } = this.state;
    const { addItem, showModal } = this.props;

    if (taskText.length === 0) {
      event.stopPropagation();
      event.preventDefault();
      showModal();
      return false;
    }
    clearTimeout(this.timerId);
    let timeEnd = new Date();
    //`${h}:${min}:${sec}`
    const payload = {
      taskId: taskId,
      taskName: taskText,
      timeStart: this.timeStart.toLocaleTimeString(),
      timeEnd: timeEnd.toLocaleTimeString(),
      timeSpend: this.timeSpend(this.timeStart, timeEnd),
    };
    addItem(payload);

    this.setState(() => ({
      min: '00',
      sec: '00',
      h: '00',
      taskText: '',
      taskId: taskId + 1,
      flag: false,
    }));

  };

  onChangeInput(event) {
    this.setState({
      taskText: event.target.value,
    });
  }

  render() {
    const classes = this.useStyles();
    let { min, sec, h, hidden, taskText } = this.state;
    let { statusModal, showModal } = this.props;


    const modal = statusModal ? <Modal showModal={showModal}/> : null;
    const buttonChange = hidden ?
      <Button className={classes.timerBtn} variant="contained" onClick={this.onTimerWrap}> Start </Button> :
      <Button className={classes.timerBtn} variant="contained"
              onClick={(event) => this.stopTimer(event)}> Stop </Button>;
    return (
      <div className='wrap-top-block'>
        {modal}
        <input type="text" className="task-input-name" value={taskText} onChange={(event) => {
          this.onChangeInput(event);
        }} placeholder="Name of your task"/>

        <div className="b-timer">
          <div className="time">
            <span className="time__items">{h} : {min} : {sec}</span>
          </div>
        </div>

        <span onClick={this.changeShowBtn}>{buttonChange}</span>

      </div>
    );
  }
}

const mapStateToProps = ({ statusModal, tasks }) => {
  return {
    statusModal,
    tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { addItem } = bindActionCreators(actions, dispatch);
  return {
    addItem,
    //showModal,
    //addProgressTask,

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

