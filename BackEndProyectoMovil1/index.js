const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

const AppPinRouter = require('./router/AppPinRouter');
const MaestroCuentasRouter = require('./router/MaestroCuentasRouter');
const MovtoAhorrosRouter = require('./router/MovtoAhorrosRouter');
const MovtoCreditosRouter = require('./router/MovtoCreditosRouter');

const puerto = 5000;

app.use(bodyParser.json());
app.use(cors());


app.use('/apppin', AppPinRouter);
app.use('/maestrocuentas', MaestroCuentasRouter);
app.use('/movtoahorros', MovtoAhorrosRouter);
app.use('/movtocreditos', MovtoCreditosRouter);

app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en el puerto ${puerto}`);
});
