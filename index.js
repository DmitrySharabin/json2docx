const fs = require("fs");
const carbone = require("carbone");

// Читаем исходные данные
const data = require("./source.json");

carbone.addFormatters(require("./parser.js"));

// И отправляем их в шаблон
carbone.render("template.docx", data, function(err, result) {
	if (err) {
		return console.error(err);
	}
	// Записываем результат в отдельный файл
	fs.writeFileSync("result.docx", result);
});
