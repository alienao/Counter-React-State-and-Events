import React from 'react';
import './counter.css';

export default class Counter extends React.Component {
  state = {
    count: 0,
    maxValue: 15,
    minValue: 5,
    step: 5,
  };

  componentDidMount() {
    const stringCount = localStorage.getItem('count');
    const count = parseInt(stringCount);

    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }
  }

  handleCount = (num) => {
    this.setState((prevState) => {
      const handleState = num >= 0
        ? Math.min(prevState.count + num, prevState.maxValue)
        : Math.max(prevState.count + num, prevState.minValue)
        return {
          count: handleState,
        };
    });
  }

  // handleAddCount = () => {
  //   this.setState(() => {
  //     return {
  //       count: this.state.count + +this.state.value,
  //     };
  //   });
  // };

  // handleDeleteCount = () => {
  //   this.setState(() => {
  //     return {
  //       count: Math.max(this.state.count - this.state.value, 0),
  //     };
  //   });
  // };

  handleResetCount = () => {
    this.setState((prevState) => {
      return {
        count: prevState.step,
      };
    });
  };

  handleChange = (event) => {
    this.setState({
      step: Number(event.target.value),
    });
  };

 

  render() {
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
            onClick={() => { this.handleCount(-1 * this.state.step)}}
          >
            <i className="fa fa-minus"></i>
          </button>
          <button
            id="wrapper__button__delete"
            className="button"
            onClick={() => {this.handleCount(this.state.step)}}
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
            type="number"
             defaultValue={this.state.value}
            value={this.state.step}
            onChange={this.handleChange}
          />

          <div className="max">Change maximal value:</div>
          <input
            type="number"
           defaultValue={this.state.maxValue}
            value={this.state.maxValue}
            onChange={this.handleMaxCount}
          />

          <div className="min">Change minimal value:</div>
          <input
            type="number"
            defaultValue={this.state.minValue}
            value={this.state.minValue}
            onChange={this.handleMinCount}
          />
        </div>
      </div>
    );
  }
}
