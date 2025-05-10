const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

let count = 0;

// Загружаем текущее значение счётчика из файла
if (fs.existsSync('counter.txt')) {
    count = parseInt(fs.readFileSync('counter.txt', 'utf8')) || 0;
}

// Разрешаем CORS для взаимодействия с клиентом
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// API для получения текущего значения счётчика
app.get('/counter', (req, res) => {
    res.json({ count });
});

// API для увеличения счётчика
app.post('/increment', (req, res) => {
    count++;
    fs.writeFileSync('counter.txt', count.toString());
    res.json({ count });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
function resetCounter() {
    localStorage.setItem('buttonClicks', 0); // Устанавливаем значение счётчика в 0
    document.getElementById('counter').innerText = 0; // Обновляем отображение счётчика
}
// Функция для переключения темы
function toggleTheme() {
    const body = document.body;

    // Переключаем класс "dark-theme"
    body.classList.toggle('dark-theme');

    // Сохраняем текущую тему в localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Устанавливаем тему при загрузке страницы
function toggleTheme() {
    const body = document.body;

    // Переключаем класс "dark-theme"
    body.classList.toggle('dark-theme');

    // Сохраняем текущую тему в localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

    // Переключаем фон
    toggleBackground();
}

// Устанавливаем тему и фон при загрузке страницы
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.style.backgroundImage = "url('img/freepik__adjust__10890.jpeg')";
    } else {
        document.body.style.backgroundImage = "url('img/5594016.jpg')";
    }
}

// Загружаем тему при загрузке страницы
setInitialTheme();