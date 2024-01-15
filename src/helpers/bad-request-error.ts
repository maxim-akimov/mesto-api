import { StatusCodes } from 'http-status-codes';

const createError = require('http-errors');

export default createError(StatusCodes.BAD_REQUEST, 'Переданы некорректные данные');
