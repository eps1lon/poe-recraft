import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Item.tsx');
}

configure(loadStories, module);
