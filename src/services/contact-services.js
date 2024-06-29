import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

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
