const cols = document.querySelectorAll('.col')

//Слушатель на клавиатуру
document.addEventListener('keydown', (event) => {
	event.preventDefault()
	if (event.code.toLowerCase() === 'space') {
		setRandomColors()
	}
})
//Слушатель на клавиатуру

// Слушатель на документ, ищет data атрибуты на которых был click
document.addEventListener('click', (event) => {
	const type = event.target.dataset.type

	if (type === 'lock') {
		const node =
			event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClickboard(event.target.textContent)
	}
})
// Слушатель на документ, ищет data атрибуты на которых был click

//Рандомный цвет..
function gerenerateRandomColor() {
	// RGB
	// #FF0000
	//#00FF00
	// #0000FF

	const hexCodes = '0123456789abcdef'
	let color = ''
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return '#' + color
}
//Рандомный цвет..

// Копирование текста по клику
function copyToClickboard(text) {
	return navigator.clipboard.writeText(text)
}
// Копирование текста по клику

// Установка цвета и названия
function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : []
	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock') // Заносим в переменную все элементы у которых есть определнный клас
		const text = col.querySelector('h2') // Заносим в переменную теги h2
		const button = col.querySelector('button') // Заносим в переменную теги button


		// Если есть класс то он не меняется
		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		const color = isInitial 
		? colors[index] 
			? colors[index]
			: chroma.random()
		: chroma.random() // Заносим в переменную функцию

		colors.push(color)

		text.textContent = color
		col.style.background = color

		setTexColor(button, color)
		setTexColor(text, color)
	})

	updateColorsHash(colors)
}
// Установка цвета

//Сохранение цвета в хэш
function updateColorsHash(colors = []) {
	document.location.hash = colors.map(col => {
		return col.toString().substring(1)
	}).join('-')
}
//Сохранение цвета в хэш

// Меняет цвет в зависимости от оттенка ( Chroma.js )
function setTexColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}
// Меняет цвет в зависимости от оттенка ( Chroma.js )


function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map(color => '#' + color)
	}
	return []
}
setRandomColors(true)