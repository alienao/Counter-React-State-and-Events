import React from 'react';
import styles from './counter.css';

export default class Counter extends React.Component {
  state = {
    count: 0,
    maxValue: 0,
    minValue: 0,
    step: 0,
  };

  componentDidMount() {
    const stringCount = localStorage.getItem('count');
    const stringMaxValue = localStorage.getItem('maxValue');
    const stringMinValue = localStorage.getItem('minValue');
    const stringStep = localStorage.getItem('step');

    const count = parseInt(stringCount);
    const maxValue = parseInt(stringMaxValue);
    const minValue = parseInt(stringMinValue);
    const step = parseInt(stringStep);

    if (!isNaN(count) && !isNaN(maxValue) && !isNaN(minValue) && !isNaN(step)) {
      this.setState({
        count,
        maxValue,
        minValue,
        step,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }
    if (prevState.maxValue !== this.state.maxValue) {
      localStorage.setItem('maxValue', this.state.maxValue);
    }
    if (prevState.minValue !== this.state.minValue) {
      localStorage.setItem('minValue', this.state.minValue);
    }
    if (prevState.step !== this.state.step) {
      localStorage.setItem('step', this.state.step);
    }
  }

  handleCount = (num) => {
    this.setState((prevState) => {
      const handleState =
        num >= 0
          ? Math.min(prevState.count + num, prevState.maxValue)
          : Math.max(prevState.count + num, prevState.minValue);
      return {
        count: handleState,
      };
    });
  };

  handleResetCount = () => {
    this.setState((prevState) => {
      return {
        count: prevState.step,
      };
    });
  };

  handleChange = (event) => {
    const val = Number(event.target.value);
    const id = event.target.id;
    if (val >= 0) {
      this.setState({
        [id]: val,
      });
    } else {
      event.target.value = 0;
    }
  };

  render() {
    const step = this.state.step;
    return (
      <div className="wrapper">
        <h1>Counter</h1>
        <div id="wrapper__counter" className="container">
          <p>{this.state.count}</p>
        </div>
        <div id="wrapper__button" className="container">
          <button
            id="wrapper__button__add"
            className="button"
            onClick={() => {
              this.handleCount(-1 * step);
            }}
          >
            <i className="fa fa-minus"></i>
          </button>
          <button
            id="wrapper__button__delete"
            className="button"
            onClick={() => {
              this.handleCount(step);
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
          <button
            id="wrapper__button__reset"
            onClick={this.handleResetCount}
            className="button"
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>

        <div className="inputs">
          <div className="step">Change steps:</div>
          <input
            id="step"
            type="number"
            value={step}
            onChange={this.handleChange}
          />

          <div className="max">Change maximal value:</div>
          <input
            id="maxValue"
            type="number"
            value={this.state.maxValue}
            onChange={this.handleChange}
          />

          <div className="min">Change minimal value:</div>
          <input
            id="minValue"
            type="number"
            value={this.state.minValue}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
