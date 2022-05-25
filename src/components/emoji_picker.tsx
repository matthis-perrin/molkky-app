/* eslint-disable no-null/no-null */
import AsyncStorage from '@react-native-async-storage/async-storage';
import emoji from 'emoji-datasource';
import React, {Component, Fragment} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* eslint-disable @typescript-eslint/naming-convention */
interface EmojiData {
  name: string;
  unified: string;
  non_qualified: string | null;
  au: string | null;
  softbank: string | null;
  google: string | null;
  image: string;
  sheet_x: number;
  sheet_y: number;
  short_name: string;
  short_names: string[];
  text: string | null;
  texts: string[] | null;
  category: string;
  subcategory: string;
  sort_order: number;
  added_in: string;
  has_img_apple: boolean;
  has_img_google: boolean;
  has_img_twitter: boolean;
  has_img_facebook: boolean;
  skin_variations?: Record<
    string,
    | {
        unified: string;
        image: string;
        sheet_x: number;
        sheet_y: number;
        added_in: string;
        has_img_apple: boolean;
        has_img_google: boolean;
        has_img_twitter: boolean;
        has_img_facebook: boolean;
      }
    | undefined
  >;
  obsoletes?: string;
  obsoleted_by?: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

interface Category {
  symbol: string | null;
  name: string;
}

export const Categories: Record<string, Category> = {
  all: {
    symbol: null,
    name: 'All',
  },
  history: {
    symbol: '🕘',
    name: 'Recently used',
  },
  emotion: {
    symbol: '😀',
    name: 'Smileys & Emotion',
  },
  people: {
    symbol: '🧑',
    name: 'People & Body',
  },
  nature: {
    symbol: '🦄',
    name: 'Animals & Nature',
  },
  food: {
    symbol: '🍔',
    name: 'Food & Drink',
  },
  activities: {
    symbol: '⚾️',
    name: 'Activities',
  },
  places: {
    symbol: '✈️',
    name: 'Travel & Places',
  },
  objects: {
    symbol: '💡',
    name: 'Objects',
  },
  symbols: {
    symbol: '🔣',
    name: 'Symbols',
  },
  flags: {
    symbol: '🏳️‍🌈',
    name: 'Flags',
  },
};

const charFromUtf16 = (utf16: string): string =>
  String.fromCodePoint(...utf16.split('-').map((u) => `0x${u}` as unknown as number));

export const charFromEmojiObject = (obj: EmojiData): string => charFromUtf16(obj.unified);

const filteredEmojis: EmojiData[] = emoji.filter((e) => e['obsoleted_by'] === undefined);
const emojiByCategory = (category: string): EmojiData[] =>
  filteredEmojis.filter((e) => e.category === category);
const sortEmoji = (list: EmojiData[]): EmojiData[] =>
  list.sort((a, b) => a.sort_order - b.sort_order);
const categoryKeys = Object.keys(Categories) as unknown as keyof typeof Categories;

interface TabBarProps {
  theme: string;
  activeCategory: Category;
  onPress: (cat: Category) => void;
  width: number;
}

const TabBar = ({theme, activeCategory, onPress, width}: TabBarProps): JSX.Element => {
  const tabSize = width / categoryKeys.length;

  return (
    <Fragment>
      {Object.entries(Categories).map(([c, category]) => {
        if (c !== 'all') {
          return (
            <TouchableOpacity
              key={category.name}
              onPress={() => onPress(category)}
              style={{
                flex: 1,
                height: tabSize,
                borderColor: category === activeCategory ? theme : '#EEEEEE',
                borderBottomWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  paddingBottom: 8,
                  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  fontSize: tabSize - 24,
                }}
              >
                {category.symbol}
              </Text>
            </TouchableOpacity>
          );
        }
        return <Fragment />;
      })}
    </Fragment>
  );
};

interface EmojiCellProps {
  emoji: EmojiData;
  colSize: number;
  key: string;
  onPress: () => void;
}

const EmojiCell = ({emoji, colSize, ...rest}: EmojiCellProps): JSX.Element => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{
      width: colSize,
      height: colSize,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...rest}
  >
    <Text
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      style={{color: '#FFFFFF', fontSize: colSize - 12}}
    >
      {charFromEmojiObject(emoji)}
    </Text>
  </TouchableOpacity>
);

interface EmojiSelectorProps {
  theme: string;
  category: Category;
  placeholder: string;
  showSearchBar: boolean;
  showSectionTitles: boolean;
  showTabs: boolean;
  showHistory: boolean;
  onEmojiSelected?: (selected: string) => void;
  shouldInclude?: (emoji: EmojiData) => boolean;
  columns: number;
}

interface EmojiSelectorState {
  searchQuery: string;
  category: Category;
  isReady: boolean;
  history: EmojiData[];
  emojiList: Record<string, EmojiData[]> | null;
  colSize: number;
  width: number;
}

const storageKey = '@react-native-emoji-selector:HISTORY';
export class EmojiSelector extends Component<EmojiSelectorProps, EmojiSelectorState> {
  private scrollview: FlatList | null = null;

  public constructor(props: EmojiSelectorProps) {
    super(props);
    this.state = {
      searchQuery: '',
      category: props.category,
      isReady: false,
      history: [],
      emojiList: null,
      colSize: 0,
      width: 0,
    };
  }

  //
  //  HANDLER METHODS
  //
  private readonly handleTabSelect = (category: Category): void => {
    if (this.state.isReady) {
      if (this.scrollview) {
        this.scrollview.scrollToOffset({offset: 0, animated: false});
      }
      this.setState({
        searchQuery: '',
        category,
      });
    }
  };

  private readonly handleEmojiSelect = (emoji: EmojiData): void => {
    if (this.props.showHistory) {
      this.addToHistoryAsync(emoji).catch(() => {});
    }
    this.props.onEmojiSelected?.(charFromEmojiObject(emoji));
  };

  private readonly handleSearch = (searchQuery: string): void => {
    this.setState({searchQuery});
  };

  private readonly addToHistoryAsync = async (emoji: EmojiData): Promise<void> => {
    const history = await AsyncStorage.getItem(storageKey);

    let value = [];
    if (history === null) {
      // no history
      const record = {...emoji, count: 1};
      value.push(record);
    } else {
      const json = JSON.parse(history);
      if (json.filter((r: EmojiData) => r.unified === emoji.unified).length > 0) {
        value = json;
      } else {
        const record = {...emoji, count: 1};
        value = [record, ...json];
      }
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(value));
    this.setState({
      history: value,
    });
  };

  private readonly loadHistoryAsync = async (): Promise<void> => {
    const result = await AsyncStorage.getItem(storageKey);

    if (result !== null) {
      const history = JSON.parse(result);
      this.setState({history});
    }
  };

  //
  //  RENDER METHODS
  //
  private readonly renderEmojiCell = ({
    item,
  }: {
    item: {key: string; emoji: EmojiData};
  }): JSX.Element => (
    <EmojiCell
      key={item.key}
      emoji={item.emoji}
      onPress={() => this.handleEmojiSelect(item.emoji)}
      colSize={this.state.colSize}
    />
  );

  private returnSectionData(): {key: string; emoji: EmojiData}[] {
    const {history, emojiList, searchQuery, category} = this.state;
    const emojiData = (function () {
      if (category === Categories.all && searchQuery === '') {
        //TODO: OPTIMIZE THIS
        let largeList: EmojiData[] = [];
        for (const c of categoryKeys) {
          const name = Categories[c].name;
          const list = name === Categories.history.name ? history : emojiList?.[name] ?? [];
          if (c !== 'all' && c !== 'history') {
            largeList = [...largeList, ...list];
          }
        }

        return largeList.map((emoji) => ({key: emoji.unified, emoji}));
      }
      let list;
      const hasSearchQuery = searchQuery !== '';
      const name = category.name;
      if (hasSearchQuery) {
        const filtered = emoji.filter((e) => {
          let display = false;
          for (const name of e.short_names) {
            if (name.includes(searchQuery.toLowerCase())) {
              display = true;
            }
          }
          return display;
        });
        list = sortEmoji(filtered);
      } else if (name === Categories.history.name) {
        list = history;
      } else {
        list = emojiList?.[name] ?? [];
      }
      return list.map((emoji) => ({key: emoji.unified, emoji}));
    })();
    return this.props.shouldInclude
      ? emojiData.filter((e) => this.props.shouldInclude?.(e.emoji))
      : emojiData;
  }

  private prerenderEmojis(callback: () => void): void {
    const emojiList: Record<string, EmojiData[]> = {};
    for (const c of categoryKeys) {
      const name = Categories[c].name;
      emojiList[name] = sortEmoji(emojiByCategory(name));
    }

    this.setState(
      {
        emojiList,
        colSize: Math.floor(this.state.width / this.props.columns),
      },
      callback
    );
  }

  private readonly handleLayout = ({nativeEvent: {layout}}: LayoutChangeEvent): void => {
    this.setState({width: layout.width}, () => {
      this.prerenderEmojis(() => {
        this.setState({isReady: true});
      });
    });
  };

  //
  //  LIFECYCLE METHODS
  //
  public componentDidMount(): void {
    const {category, showHistory} = this.props;
    this.setState({category});

    if (showHistory) {
      this.loadHistoryAsync().catch(() => {});
    }
  }

  public render(): JSX.Element {
    const {
      theme,
      columns,
      placeholder,
      showHistory,
      showSearchBar,
      showSectionTitles,
      showTabs,
      ...other
    } = this.props;

    const {category, colSize, isReady, searchQuery, width} = this.state;

    const Searchbar = (
      <View style={styles.searchbar_container}>
        <TextInput
          style={styles.search}
          placeholder={placeholder}
          clearButtonMode="always"
          returnKeyType="done"
          autoCorrect={false}
          underlineColorAndroid={theme}
          value={searchQuery}
          onChangeText={this.handleSearch}
        />
      </View>
    );

    const title = searchQuery !== '' ? 'Search Results' : category.name;

    return (
      <View style={styles.frame} {...other} onLayout={this.handleLayout}>
        <View style={styles.tabBar}>
          {showTabs && (
            <TabBar
              activeCategory={category}
              onPress={this.handleTabSelect}
              theme={theme}
              width={width}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          {showSearchBar && Searchbar}
          {isReady ? (
            <View style={{flex: 1}}>
              <View style={styles.container}>
                {showSectionTitles && <Text style={styles.sectionHeader}>{title}</Text>}
                <FlatList
                  style={styles.scrollview}
                  contentContainerStyle={{paddingBottom: colSize}}
                  data={this.returnSectionData()}
                  renderItem={this.renderEmojiCell}
                  horizontal={false}
                  numColumns={columns}
                  keyboardShouldPersistTaps={'always'}
                  ref={(scrollview) => {
                    this.scrollview = scrollview;
                  }}
                  removeClippedSubviews
                />
              </View>
            </View>
          ) : (
            <View style={styles.loader} {...other}>
              <ActivityIndicator
                size={'large'}
                color={Platform.OS === 'android' ? theme : '#000000'}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    width: '100%',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
  },
  scrollview: {
    flex: 1,
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  searchbar_container: {
    width: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  search: {
    ...Platform.select({
      ios: {
        height: 36,
        paddingLeft: 8,
        borderRadius: 10,
        backgroundColor: '#E5E8E9',
      },
    }),
    margin: 8,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sectionHeader: {
    margin: 8,
    fontSize: 17,
    width: '100%',
    color: '#8F8F8F',
  },
});
/* eslint-enable no-null/no-null */
