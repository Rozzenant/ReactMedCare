
const express = require('express');
const app = express();

// Разрешить запросы от любого источника
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Ваш обработчик маршрута
app.get('/medical-procedures', (req, res) => {
  // Логика обработки запроса
  res.send('Пример успешного ответа');
});

app.listen(8000, () => {
  console.log('Сервер слушает порт 8000');

});
