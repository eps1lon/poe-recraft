const fs = require('fs');
const path = require('path');

const export_dir = path.join(__dirname, '../tmp/exports');
const locale_files = fs.readdirSync(export_dir);

const isExport = file => file.endsWith('.json');
const underscore = s => s.toLowerCase();

locale_files.filter(isExport).forEach(locale_file => {
  const locale = path.basename(locale_file, '.json');
  const export_json = fs.readFileSync(path.join(export_dir, locale_file));
  const datas = JSON.parse(export_json);

  const locale_data_dir = path.join(__dirname, '../locale-data');

  datas.forEach(exported => {
    const dat_name = path.basename(exported.filename, '.dat');
    const { header, data } = exported;

    const output_header = ['Name'].reduce((partial_header, col_name) => {
      partial_header[underscore(col_name)] = header.find(
        col => col.name === col_name
      );

      return partial_header;
    }, {});

    const translation = data.reduce((partial_translation, row, i) => {
      partial_translation[i] = Object.entries(
        output_header
      ).reduce((with_row, [name, info]) => {
        if (info !== undefined) {
          with_row[name] = row[info.rowid];
        }

        return with_row;
      }, {});

      return partial_translation;
    }, {});

    fs.writeFileSync(
      path.join(locale_data_dir, locale, `${dat_name}.json`),
      JSON.stringify(translation)
    );
  });
});
