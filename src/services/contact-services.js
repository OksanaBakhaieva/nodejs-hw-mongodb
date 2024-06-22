import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();
