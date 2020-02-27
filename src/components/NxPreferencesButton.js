import React from 'react';
import { FaCog } from 'react-icons/fa';

export const NxPreferencesButton = ({ togglePreferences, showPreferences }) => {
  return (
    <button className="show-preferences" onClick={() => togglePreferences(!showPreferences)}>
      <FaCog />
    </button>
  );
};
