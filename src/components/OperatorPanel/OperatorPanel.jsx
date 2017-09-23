import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSettings } from '../../store/UI';

import OperatorClientMenu from '../OperatorClientMenu/OperatorClientMenu.jsx';
import OperatorSettingsMenu from '../OperatorSettingsMenu/OperatorSettingsMenu.jsx';
import BrandLogo from '../SVG/BrandLogo.jsx';

import './OperatorPanel.css';

const OperatorPanel = props => (
  <div className="OperatorPanel panel">
    <header className="OperatorPanel__header">
      <BrandLogo />
      <span className="OperatorPanel__appname">Operator</span>
    </header>
    <OperatorSettingsMenu />
    <OperatorClientMenu />
    <footer className="OperatorPanel__footer">
      <button
        className="OperatorPanel__settings"
        onClick={() => props.toggleSettings()}
      >
        <span className="ss-icon ss-settings" />
        <span>Settings</span>
      </button>
      <span className="OperatorPanel__madewith">Made with lurv by hoomans</span>
    </footer>
  </div>
);

OperatorPanel.propTypes = {
  toggleSettings: PropTypes.func,
};


const mapDispatchToProps = dispatch => ({
  toggleSettings: () => dispatch(toggleSettings(true)),
});


export default connect(null, mapDispatchToProps)(OperatorPanel);
