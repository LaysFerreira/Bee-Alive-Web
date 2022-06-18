import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import router from './routes.js';
//import Meliponario from './database/Meliponario.js';


const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(router);

router.use(function(err, req, res, next) {
  // console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

app.listen(3000, () => console.log('Server is running!'));