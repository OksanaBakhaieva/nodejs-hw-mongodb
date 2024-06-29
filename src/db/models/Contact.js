import { Schema, model } from 'mongoose';
import { contactTypeArray } from '../../constants/contacts-constants.js';
import { setUpdateSettings, validateBody } from './hooks.js';

const contactSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: contactTypeArray,
            required: true,
            default: 'personal',
        },
    },
    {
    timestamps: true,
    versionKey: false,
    });

contactSchema.post("save", validateBody);
contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate", validateBody);

const Contact = model("contact", contactSchema);

export default Contact;
