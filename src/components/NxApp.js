import React from 'react';
import Store from 'electron-store';
import { FaTimes } from 'react-icons/fa';

import { debounce } from 'lodash';

import { NxMediabar } from './NxMediabar';
import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';

import '../media/css/style.css';

const store = new Store();

export class NxApp extends React.Component {
  state = {
    nowServing: 0,
    santaCode: '',
    showSettingsDropdown: false,
    alwaysOnTop: false
  };

  componentDidMount() {
    // window.ipcRenderer.on('info' , function(event , data){ console.log(data.msg) });
    const nowServingFromStore = store.get('nowServing');
    this.setState({ nowServing: nowServingFromStore });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
      store.store = this.state;
    }

    // window.ipcRenderer.on('info' , function(event , data){ console.log(data.msg) });

    // Progress Now-Serving when new Code is detected
    if (
      this.state.santaCode !== prevState.santaCode &&
      this.state.santaCode !== ''
    ) {
      const nextNum = prevState.nowServing + 1;
      this.setState({ nowServing: nextNum });
      this.handleNextDebounce(nextNum);
    }
  }

  handlePrev = () => {
    const nextNum = this.state.nowServing - 1;
    this.setState({ nowServing: nextNum });
    this.handlePrevDebounce(nextNum);
  };
  handlePrevDebounce = debounce(nextNum => {
    // this.setState(prevState => ({ show: !prevState.show }));
    window
      .fetch('https://easttroy.org/santa/count/' + nextNum + '/')
      .then(response => response.json())
      .then(data => console.log(data));
  }, 1500);

  handleNext = () => {
    const nextNum = this.state.nowServing + 1;
    this.setState({ nowServing: nextNum });
    this.handleNextDebounce(nextNum);
  };
  handleNextDebounce = debounce(nextNum => {
    // this.setState(prevState => ({ show: !prevState.show }));
    window
      .fetch('https://easttroy.org/santa/count/' + nextNum + '/')
      .then(response => response.json())
      .then(data => console.log(data));
  }, 1500);

  // react-qr-reader
  handleScan = data => {
    let d;
    if (data) {
      d = data.replace('https://easttroy.org/santa/', '');
      this.setState({ santaCode: d });
      window.ipcRenderer.send('async', d);
    }
  };

  render() {
    return (
      <div className="app">
        <button className="close-window">
          <FaTimes />
        </button>
        <NxMediabar />
        <NxOmnibar />
        <NxFileList />
        <NxFileContent />
      </div>
    );
  }
}
