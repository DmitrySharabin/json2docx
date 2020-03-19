"use strict";

// Пытаемся распарсить HTML-код
function parseHTML(data) {
	// Отдельно обрабатываем случай </p><ul><li>, чтобы избежать пустых абзацев
	data = data.replace(/<\/p><ul><li>/g, "$p$– ");

	// Убираем теги абзацев и заменяем их на реальные абзацы (кроме первого, который просто удаляем)
	data = data.replace(/^<p>/, "<First>");
	data = data.replace(/<p>/g, "$p$");
	data = data.replace(/<First>/g, "");

	// Закрывающие теги просто удаляем
	data = data.replace(/<\/p>/g, "");

	// Список и каждый его элемент — отдельный абзац
	// Закрывающие теги удаляем
	data = data.replace(/<ul>/g, "$p$");
	data = data.replace(/<\/ul>/g, "");
	data = data.replace(/<\/li>/g, "");

	// Добавляем перед элементами списка короткое тире
	data = data.replace(/<li>/g, "$p$– ");

	// Заменяем коды кавычек на соответствующие ёлочки
	data = data.replace(/&ldquo;/g, "«");
	data = data.replace(/&rdquo;/g, "»");

	// Заменяем блок внутри <em> на курсив, внутри <strong> — на полужирный шрифт
	data = data.replace(/<em>/g, "$ib$");
	data = data.replace(/<\/em>/g, "$ie$");

	data = data.replace(/<strong>/g, "$bb$");
	data = data.replace(/<\/strong>/g, "$be$");

	return data;
}

function addFormatting(data) {
	// Слабое выделение
	data = data.replace(
		/\$ib\$/g,
		`</w:t></w:r><w:r><w:rPr><w:i/></w:rPr><w:t xml:space="preserve"> `
	);
	data = data.replace(/\$ie\$/g, "</w:t></w:r><w:r><w:t>");

	// Сильное выделение
	data = data.replace(
		/\$bb\$/g,
		`</w:t></w:r><w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve"> `
	);
	data = data.replace(/\$be\$/g, "</w:t></w:r><w:r><w:t>");

	// Абзацы
	data = data.replace(/\$p\$/g, "</w:t><w:cr/><w:t>");

	return data;
}

function removeEmpty(data) {
	if (data === null || typeof data === "undefined" || data === "") {
		return `<w:t>EMPTY!</w:t>`;
	}

	return data;
}

// These formatters are able to inject code
addFormatting.canInjectXML = true;
removeEmpty.canInjectXML = true;

module.exports = {
	parseHTML,
	addFormatting,
	removeEmpty
};
