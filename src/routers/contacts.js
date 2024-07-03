import express from 'express';
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import { contactAddSchema, contactPatchSchema } from '../validation/validation-contacts.js';
import validateBody from '../utils/validateBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', isValidId, validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));


export default contactsRouter;
