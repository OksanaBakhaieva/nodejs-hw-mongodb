const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    if (typeof page !== 'string') {
        return 1;
    }
    if (typeof perPage !== 'string') {
        return 10;
    }
    let parsedPage = parseInt(page);
    let parsedPerPage = parseInt(perPage);

    if (Number.isNaN(parsedPage)) {
        parsedPage = 1;
    }
    if (Number.isNaN(parsedPerPage)) {
        parsedPerPage = 10;
    }
    
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};


export default parsePaginationParams;
