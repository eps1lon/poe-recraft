import * as React from 'react';
import { storiesOf } from '@storybook/react';
// 'poe-components-item'
import { ApiPopup } from '../../src/';

export type Item = ApiPopup['props']['item'];

export interface StashApi {
  next_change_id: string;
  stashes: Stash[];
}

export interface Stash {
  items: Item[];
}

storiesOf('ApiPopup', module).add('with public stash API', () => <Story />);

type StoryProps = {};
enum LoadState {
  null,
  requested,
  finished,
  failed,
}
interface StoryState {
  api_id: string;
  loading: LoadState;
  response: StashApi | undefined;
  active_stash_index: number;
  active_item_index: number;
}
class Story extends React.PureComponent<StoryProps, StoryState> {
  constructor(props: StoryProps) {
    super(props);

    this.state = {
      api_id: '',
      loading: LoadState.null,
      response: undefined,
      active_stash_index: -1,
      active_item_index: -1,
    };
  }

  onIdInputChange = ({ target }: { target: HTMLInputElement }) => {
    this.setApiId(target.value);
  };

  onStashIndexChange = ({ target }: { target: HTMLInputElement }) => {
    // start with first stash when we reach end
    this.setState({ active_stash_index: +target.value % this.stashCount() });
  };

  onItemIndexChange = ({ target }: { target: HTMLInputElement }) => {
    // start with first item when we reach end
    this.setState({ active_item_index: +target.value % this.itemCount() });
  };

  onNextItemClick = () => {
    const { response } = this.state;
    if (response === undefined) {
      return;
    }

    // move stash_index and item_index pointer to next stash with item
    const active_stash = this.activeStash();
    const { active_item_index, active_stash_index } = this.state;
    const has_more_items =
      active_stash !== undefined &&
      active_item_index + 1 < active_stash.items.length;

    if (has_more_items) {
      this.setState({ active_item_index: active_item_index + 1 });
    } else {
      // no more items in this stash so find the next stash with at least one
      // item and move the pointers to that stash
      const offset = active_stash_index + 1;
      const stash_with_item = response.stashes
        .slice(offset)
        .findIndex(stash => stash.items.length > 0);

      this.setState({
        active_stash_index: offset + stash_with_item,
        active_item_index: 0,
      });
    }
  };

  onNextChangeIdClick = () => {
    const { response } = this.state;
    if (response === undefined) {
      this.setApiId('0');
    } else {
      this.setApiId(response.next_change_id);
    }
  };

  setApiId(api_id: string) {
    // only fetch if new id is requested
    if (api_id !== this.state.api_id) {
      this.setState({
        loading: LoadState.requested,
        api_id,
        active_item_index: -1,
        active_stash_index: -1,
      });
      fetch(apiUrl(api_id), {
        headers: new Headers({
          'X-REQUESTED-WITH': 'poe-react-item',
        }),
      })
        .then(res => res.json())
        .then((response: StashApi) =>
          this.setState({ loading: LoadState.finished, response }),
        )
        .catch(() => this.setState({ loading: LoadState.failed }));
    }
  }

  render() {
    const item = this.activeItem();

    return (
      <div>
        <fieldset>
          <label>api change id: </label>
          <input
            type="text"
            value={this.state.api_id}
            onChange={this.onIdInputChange}
          />{' '}
          <label>stash index: </label>
          <input
            type="number"
            value={this.state.active_stash_index}
            onChange={this.onStashIndexChange}
          />
          /{this.stashCount()} <label>item index: </label>
          <input
            type="number"
            value={this.state.active_item_index}
            onChange={this.onItemIndexChange}
          />
          /{this.itemCount()}
          <input
            type="button"
            value="next item"
            onClick={this.onNextItemClick}
          />
          <input
            type="button"
            value="next change id"
            onClick={this.onNextChangeIdClick}
          />
        </fieldset>
        <p>
          <strong>Loading: </strong>
          <em>{LoadState[this.state.loading]}</em>
        </p>
        {item && <ApiPopup item={prepareItem(item)} />}
        <details>
          <summary>Raw Item Data</summary>
          <p style={{ whiteSpace: 'pre-line' }}>
            {JSON.stringify(item, null, 2)}
          </p>
        </details>
        <details>
          <summary>About</summary>
          <p style={{ whiteSpace: 'pre-line' }}>
            {
              'Public stash tab api is used from http://www.pathofexile.com/api/public-stash-tabs\
            and proxied with https://cors-anywhere.herokuapp.com/.\
            \n\n\
            Be aware that the input for the stash id is not debounced in any way\
            so every change triggers a request.\
            \n\n\
            Gems are currently not supported so they might not look like anything\
            to you or even fail to render.'
            }
          </p>
        </details>
      </div>
    );
  }

  stashCount(): number {
    const { response } = this.state;
    if (response === undefined) {
      return 0;
    } else {
      return response.stashes.length;
    }
  }

  activeStash(): Stash | undefined {
    const { response } = this.state;
    if (response === undefined) {
      return undefined;
    } else {
      return response.stashes[this.state.active_stash_index];
    }
  }

  itemCount(): number {
    const stash = this.activeStash();
    if (stash === undefined) {
      return 0;
    } else {
      return stash.items.length;
    }
  }

  activeItem(): Item | undefined {
    const stash = this.activeStash();
    if (stash === undefined) {
      return undefined;
    } else {
      return stash.items[this.state.active_item_index];
    }
  }
}

interface HedgedItemState {
  threw: boolean;
}
/**
 * error boundary for item
 */
class HedgedItem extends React.PureComponent<ApiPopup['props']> {
  state: HedgedItemState = {
    threw: false,
  };

  componentDidCatch() {
    this.setState({ threw: true });
  }

  render() {
    if (this.state.threw) {
      return <div>Render failed</div>;
    } else {
      return <ApiPopup {...this.props} />;
    }
  }
}

function apiUrl(api_id: string): string {
  return `https://cors-anywhere.herokuapp.com/http://www.pathofexile.com/api/public-stash-tabs?id=${api_id}`;
}

/**
 * preprocesses an item from the public stash api for usage in poe-react-item
 * @param item
 */
function prepareItem(item: Item): Item {
  return removeInflectionIdentifierOnItem(item);
}

function removeInflectionIdentifierOnItem(item: Item): Item {
  return {
    ...item,
    name:
      item.name !== undefined
        ? item.name.replace(/<<SET:\w+>>/gi, '')
        : undefined,
    typeLine: removeInflectionIdentifier(item.typeLine),
  };
}

function removeInflectionIdentifier(s: string): string {
  return s.replace(/<<SET:\w+>>/gi, '');
}
