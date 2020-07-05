import { Router } from 'express';

import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import UploadController from "./app/controllers/UploadController";
import GroupController from "./app/controllers/GroupController";
import PermissionController from "./app/controllers/PermissionController";

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
    return res.json({message: "OKEY"})
});

routes.post('/sessions', SessionController.store);

// uso global
// routes.use(authMiddleware);

// GROUPS
routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.store);

// PERMISSIONS
routes.get('/permissions', PermissionController.index);
routes.post('/permissions', PermissionController.store);

// USERS
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.findById);
routes.delete('/users/:id', UserController.delete);
routes.put('/users', UserController.update);
routes.put('/users/:id', UserController.updateUser);
routes.post('/users', UserController.store);

routes.post('/uploads', upload.single('file'), UploadController.store);

export default routes;
