import { configure } from '@storybook/react';

function loadStories() {
  require('../../stories/docs');
}

configure(loadStories, module);
