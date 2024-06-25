import { addContact, deleteContact, getContactByID, getContacts, updateContact } from '../services/contact-services.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
        const contacts = await getContacts();
        res.status(200).json({
            status: res.statusCode,
            message: "Successfully found contacts!",
            data: contacts
        });
};

export const getContactByIdController = async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactByID(contactId);

        if (!contact) {
            throw createHttpError(404, `Contact with id ${contactId} not found`);
        }
        res.status(200).json({
            status: res.statusCode,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact
        });
};

export const addContactController = async (req, res) => {
    const contact = await addContact(req.body);
    res.status(201).json({
        status: req.statusCode,
        message: 'Successfully created a contact!',
        data: contact
    });
};

export const patchContactController = async(req, res) => {
    const { contactId } = req.params;
    const contact = await updateContact({ _id: contactId }, req.body);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: res.statusCode,
        message: 'Successfully patched a contact!',
        data: contact
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact({_id: contactId});
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).json();
};
