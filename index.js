const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/UserController');

const app = express();

app.use(express.json());

app.route('/user')
  .post(userController.createUser)
  .get(authMiddleware, userController.getAllUsers);

app.route('/login')
  .post(userController.userLogin);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
