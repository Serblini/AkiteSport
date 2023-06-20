const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('phs.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Регистрация нового пользователя
server.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Необходимо заполнить все поля' });
  }

  const phsData = require('./phs.json');

  const existingUser = phsData.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    email: email,
    password: hashedPassword,
  };

  phsData.push(newUser);

  fs.writeFile('./phs.json', JSON.stringify(phsData), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при сохранении данных' });
    }

    res.status(200).json({ message: 'Регистрация прошла успешно' });
  });
});

// Добавьте другие маршруты json-server здесь, если необходимо

server.use(router);
server.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
