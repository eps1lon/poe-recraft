# Developer Documentation

## Find translation in formatStats for stat id `id`
Idea is that `meta.include` are fallback files. Sometimes translations 
are accessed direct by id sometimes the ids are included in stats.

1. Use `description` in `datas` value for key `options.start_file`
2. If `description` undefined goto #9 else goto #3
3. Try `value` for key `id` in `description.data`
4. If `value` undefined goto #5 else translate with `value`
5. Find `value` in values of `description.data` for which `value.stats` includes `id`
6. If `value` undefined goto #7 else translate with `value`
7. Set `description` to value in `datas` for key `description.meta.include`
8. Goto #2
9. mark `id` as untranslated