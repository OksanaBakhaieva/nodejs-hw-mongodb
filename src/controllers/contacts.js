import { addContact, deleteContact, getContactByID, getContacts, upsertContact } from '../services/contact-services.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
};

export const getContactByIdController = async (req, res) => {
        const { contactId } = req.params;
        const data = await getContactByID(contactId);

        if (!data) {
            throw createHttpError(404, `Contact with id ${contactId} not found`);
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
};

export const addContactController = async (req, res) => {
    const data = await addContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const patchContactController = async(req, res) => {
    const { contactId } = req.params;
    const result = await upsertContact({ _id: contactId }, req.body);
    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await deleteContact({_id: contactId});
    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }
    res.json({
        status: 204,
    });
};
