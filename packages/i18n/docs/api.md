# API

## Message syntax
Messages conform to [ICU message syntax](http://userguide.icu-project.org/formatparse/messages). 
Some files provide inflection rules for certain languages (e.g. german). 
They are accessed via a simple `select`. The variable name is `inflection` 
and the value must be a valid inflection identifier.

An inflection identifier consists of a gender identifier (`M` for masculine, 
`F` for feminine and `N` for neuter) and a plural identifier (`S` for singular, 
`P` for plural). The identifier must match exact. The necessary inflection
identifier can for example be found in `BaseItemtypes` to pass to the `Mods` message. 

## Format
Wrapper for `formatStats`, `formatGemStats`, and `textToStats` with global configuration.
An instance of this is exported in `format`.
### Format#configure(options: Options)
Configures behavior of `formatStats` and `formatGemStats`
#### Arguments
- options: See [documentation of formatStats](#formatStats-args)
### Format#stats
Partially applied [formatStats](#formatStats) with options that were previously
applied by `#configure`
### Format#gemStats
Same behavior as `#stats` but for [formatGemStats](#formatGemStats).
### Format#textToStats
Partially applied [textToStats](#textToStats) with options that were previously
applied by `#configure`.


## formatStats(stats: Stats[], options: Options = {})
Takes an array of Stats and translates them. Used to translate lines
generated by Mods. 

Values can be single values or ranges. Be aware that finding
a corresponding translation requires that the given value range is a subset of
that translation. Providing a value of [0, 5] will throw if there exists only 
a translation for 0 and another one for 1-5. 

### Arguments <a name="formatStats-args"></a>
- stats: the stats that should be considered. Throws an error if
  some identifiers could not be translated
  ```typescript
  type Stat = {
    id: string;
    value: number | [number, number]; 
  };
  ```
- options: options for formatting
  ```typescript
  type Options = {
    datas: StatsLocaleDatas,
    fallback: Fallback | ((id: string, stat: Stat) => string | null),
    start_file: keyof StatsLocaleDatas,
    range_message: string;
  }
  ```
  - options.fallback: fallback strategy if a description for a stat was not found.
    If a callback is provided the line is skipped if it returns `null` otherwise
    the returnvalue is used.
  ```typescript
    enum Fallback {
      throw, // throws an error, DEFAULT
      id, // uses the id of the stat
      skip // omits the line
    }
  ```
  - options.datas: the translation datas. Study the files in `localize-data/` 
    for more infos. The file specified in `include` is used as a fallback
  
  ```typescript
  type StatsLocaleDatas = {
    [key: string]: StatsLocaleData
  };

  type StatsLocaleData = {
    // StatIdentifier
    [key: string]: {
      // list of required stat identifiers to fill in the values
      stats: string[]; 
      translations: {
        // directives to match the value '#' for any '[lower, upper]' 
        // for ranges
        matchers: Matcher[];
        // the actual translation
        text: string; 
        // preprocessors for the values
        formatters: {
          // name of the formatter, see src/localize/formatters
          id: string; 
          // 1-based array indef of the required stat value 
          // or a reminder tooltip
          arg: ArrayIndex | ReminderIdentifier;
        }[]; 
      }[];
    };
  }
  ```
  - options.start_file: The description file which has top priority
    when searching for a translation. Default: `stat_descriptions`
  - options.range_message: A string conforming to ICU message syntax that is
    used to format value ranges. default: "({min}–{max})"

## formatStats.configure(options: Options)
Set the default options for option properties that are not provided
when calling `formatStats`

### Arguments
- options: See [documentation of formatStats](#formatStats-args)

## formatGemStats(id: GemId, stats: Stat[], options: Options = {}): Translation
Translates stats of a given gem.

### Arguments
- id: the id of the gen. Still unsure where it is saved that way in the Content.ggpk. 
  Check `skill_filter.json` for possible values. Id doesn't matter for support gems.
- stats: The stats of that skill. Determining what stats are part of a skill
  is out of the scope of this package.
- options: fallback and start_file are overwritten
  ```typescript
  type Options = {
    datas: StatLocaleDatas,
  }
  ```

### Returns
```typescript
type Translation = {
  effects: string[]
}
```
- effects: List of stats from the provided effect by this skill.


## requiredLocaleDatas(files: string[])
Lists all required `StatLocaleData` specified in `files` and required by subsequent includes.

### Arguments <a name="requiredLocaleDatas-args"></a>
- files: the basenames of the description files

## requiredLocaleDatasFor(code: string, formatStats: FormatStats)
Lists all required `StatLocaleData` that are required for use of the given configured 
`formatStats`

### Arguments
- formatStats: a configured `formatStats` function

## inflectionIdentifier(context: { inflection?: string })
Generates a valid inflection identifier that can be passed to your (to ICU syntax
conforming) message formatter. The identifier must be passed as the `inflection`
property.
### Arguments
- context: { inflection?: string } the inflection context object
### Return
Defaults to `NS` if nothing is given. If only one char is given plural defaults
to `S`

## textToStats(text: string, options: Options = {})
Yields every possible combination of that `Stats`s that could've produce the 
given `text`.

### Arguments <a name="textToStats-args"></a>
- text: the text produced by some `Stat`s. This assumes that this is a single
  stat description. This function cannot extract stats from text that was 
  produced by unrelated stats (e.g. *40% fire resistance, Cannot be shocked* 
  will not return stats for fire resistance and shock immunity). 
  
  In other words this function is an inverse of [`formatStats`](#formatStats)
- options: options used for `formatStats`
  ```typescript
  type Options = {
    datas: StatsLocaleDatas,
    start_file: keyof StatsLocaleDatas
  }
  ```
  - options.datas: see [`formatStats` args](#formatStats-args)
  
  - options.start_file: see [`formatStats` args](#formatStats-args)