import { sendErrorResponse } from '../utils/sendResponse';
import model from '../models';

const { Role, Menu } = model;

export default (menu) => async (req, res, next) => {
  const access = await Menu.findOne({
    where: { name: menu },
    include: [{ attributes: ['id', 'name'], model: Role, as: 'roles', through: { attributes: [] } }],
  });
  if (await req.user.hasMenu(access)) {
    return next();
  }
  console.error('You do not have the authorization to access this.');
  return sendErrorResponse(res, 403, 'You do not have the authorization to access this');
};