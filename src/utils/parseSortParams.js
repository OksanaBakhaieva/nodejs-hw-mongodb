import { sortOrderList } from "../constants/contacts-constants.js";

const parseSortParams = (query, contactFieldList) => {
    const { sortBy, sortOrder } = query;

    // const parseSortOrder = ["asc", "desc"].includes(sortOrder) ? sortOrder : "asc";
    // Виносимо варіанти в окрему змінну:

    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : '_id';

    return {
        sortBy: parsedSortBy,
        sortedOrder: parsedSortOrder,
    };
};

export default parseSortParams;
