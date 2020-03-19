const fs = require("fs");
const carbone = require("carbone");

// Read data to inject
const data = require("./source.json");

// Render options
const options = {
	lang: "ru"
};

carbone.addFormatters(require("./parser.js"));

// Generate a report using the sample template provided by carbone module
carbone.render("template.docx", data, function(err, result) {
	if (err) {
		return console.error(err);
	}
	// Write the result
	fs.writeFileSync("result.docx", result);
});
