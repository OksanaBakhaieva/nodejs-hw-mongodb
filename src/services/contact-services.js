import Contact from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getContacts = async ({ filter, page, perPage, sortBy = '_id', sortOrder }) => {
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find();
    if (filter.type) {
        contactsQuery.where("type").equals(filter.type);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const totalItems = await Contact.countDocuments();
    const data = await Contact.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({ total: totalItems, perPage, page });

    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage
    };
};

export const getContactByID = (contactId) => Contact.findById(contactId);

export const addContact = data => Contact.create(data);

// export const updateContact = async (filter, data, options = {}) => {
//     const result = await Contact.findOneAndUpdate(filter, data, {
//         // new: true,
//         // runValidators: true,
//         includeResultMetadata: true,
//         ...options,
//     });
//     if (!result || !result.value) return null;
//     return result.value;
// };
export const updateContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        // new: true,
        // runValidators: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!result || !result.value) return null;

    const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;
    // const isNew = Boolean(result?.lastErrorObject?.upserted);

    return {
        data: result.value,
        isNew,
    };
};
// export const deleteContact = filter => Contact.findOneAndDelete(filter);
export const deleteContact = (contactId) => {
    const contact = Contact.findOneAndDelete({
        _id: contactId,
    });
    return contact;
};
