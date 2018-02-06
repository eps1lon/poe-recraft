# Patch workflow
Tasks to undertake in order to update `locale-data` with latest Path of Exile 
game data.

1. in Omega2k/PyPoe:
    1. `pypoe_ui`
    2. open `Content.ggpk` for `{client}`
    3. extract `MetaData/StatDescriptions/*` into `tmp/unprocessed`
2. in this package:
    1. ```$ npm run generate-locale-data```
        * Be aware that the description files can have sloppy formatting
            which our grammar can sometimes not handle. These should be 
            obvious and fixed manually.
    2. for $client in ('steam', 'garena', 'tencent') 
        1. ```pypoe_exporter config set ggpk_path {ggpk_path(client)}```
        2. ```$ ./scripts/preGenerateDatLocaleData.sh {client}```
    3. ```$ npm run generate-dat-locale-data```