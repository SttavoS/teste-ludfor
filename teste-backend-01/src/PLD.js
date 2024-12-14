import XLSX from "xlsx";

class PLD {
  static async execute(filePath) {
    try {
      const data = this.readFile(filePath);
      const json = this.convertToJSON(data);
      const table = this.extractData(json);

      return table;
    } catch (error) {
      return error.message;
    }
  }

  static readFile(filePath) {
    try {
      const content = XLSX.readFile(filePath);
      const firstSheetName = content.SheetNames[0];

      return content.Sheets[firstSheetName];
    } catch (error) {
      console.error(error.message);
    }
  }

  static convertToJSON(data) {
    if (!data) throw new Error("Nenhuma planilha carregada");

    return XLSX.utils.sheet_to_json(data);
  }

  static extractData(data) {
    const dataset = [];

    data.forEach((row) => {
      const supermarket = this.findMaxValueByYear(row);

      dataset.push(supermarket);
    });

    return dataset;
  }

  static findMaxValueByYear(row) {
    const maxValuesByYear = {};

    for (const key in row) {
      if (key === "__EMPTY") {
        continue;
      }

      const year = key.split("/")[1];
      const value = row[key];

      if (!maxValuesByYear[year] || value > maxValuesByYear[year]) {
        maxValuesByYear[year] = value;
      }
    }

    const years = Object.entries(maxValuesByYear)
      .map(([year, maxValue]) => ({
        year: parseInt(year),
        amount: parseFloat(maxValue),
      }))
      .sort((a, b) => b.year - a.year);

    return {
      label: row["__EMPTY"],
      years,
    };
  }
}

export default PLD;
