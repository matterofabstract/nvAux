import React from 'react';
import { IconContext } from 'react-icons';

import { FaCog, FaSearch, FaTimes, FaBookmark, FaSoundcloud, FaPython } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import { ImShuffle } from 'react-icons/im';
import { IoLogoJavascript } from 'react-icons/io';
import { MdOndemandVideo } from 'react-icons/md';
import { SiAirplayaudio } from 'react-icons/si';

const getIcon = (name) => {
  const icons = {
    'party': GiPartyPopper,
    'video': MdOndemandVideo,
    'shuffle': ImShuffle,
    'airplay': SiAirplayaudio,
    'times': FaTimes,
    'cog': FaCog,
    'search': FaSearch,
    'url': FaBookmark,
    'soundcloud': FaSoundcloud,
    'javascript': IoLogoJavascript,
    'python': FaPython,
  };
  return icons[name];
}

export const NxIcon = ({ name="url", isActive, classes  }) => {
  const Icon = getIcon(name);
  return (
    <IconContext.Provider value={{ className: `icon-${name} ${classes} ${isActive && 'icon-active'}` }}>
      <Icon />
    </IconContext.Provider>
  );
}
