import React from 'react';

import { createMarkup } from '../utils';

const NothingSelected = () => <div className="nothing-selected">No Note Selected</div>;

const demoData = `
  URL examples: http://support.google.com/analytics/answer/1116091?hl=en

  If you’re tracking an actual transaction or purchase, leave the Goal Value blank in your set up. The Value will be pulled in from your Ecommerce tracking code.

  Events & Destinations are the two Goal types we want to focus on first.

  Events need to be setup before you can track their goal conversation: http://support.google.com/analytics/answer/1033068

  Google Analytics:

      analytics.js = Universal Analytics
             ga.js = classic Google Analytics

  classic: longnow.org, longnow.org/revive/, longbets.org, rosettaproject.org,

  We recommend using Events to track user interactions, like clicks on a video player, and using the web _trackPageview or the app trackView method for tracking different content that appears within the same web page or app screen. Tracking the different steps in a form, where the URL or main app screen does not change, is a common example of where to use _trackPageview or trackView.

  For actions that remain on the same URL, you can use the GA's async option to push values along with each step:
`;

export const NxFileContent = ({ data = demoData }) => {
  return (
    <div className="file-content" contentEditable={true}>
      {data ? <div dangerouslySetInnerHTML={createMarkup(data)} /> : <NothingSelected />}
    </div>
  );
};
