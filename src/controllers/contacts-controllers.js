import { addContact, deleteContact, getOneContact, getContacts, updateContact } from '../services/contact-services.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { contactFieldList } from '../constants/contacts-constants.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';

export const getAllContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const { query } = req;
    const { page, perPage } = parsePaginationParams(query);
    const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
    const filter = { ...parseContactsFilterParams(query), userId };

    const contacts = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter
    });

        res.status(200).json({
            status: res.statusCode,
            message: "Successfully found contacts!",
            data: contacts
        });
};

export const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId} = req.params;
    const contact = await getOneContact({_id:contactId, userId});

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
    const {_id: userId } = req.user;
    const contact = await addContact({ ...req.body, userId });
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact
    });
};

export const patchContactController = async(req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await updateContact({ _id: contactId, userId }, req.body);
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
    const { _id: userId } = req.user;

    const contact = await deleteContact({_id: contactId, userId});
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).json();
};
