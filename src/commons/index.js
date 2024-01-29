export const dateFormatter = (date) => {
    const inputDate = new Date(date);

    const formatter = new Intl.DateTimeFormat("ru", { timeZone: "UTc" });
    const isoDate = formatter.format(inputDate);

    return isoDate;
};

export const orderedColumn = (data, colName) => {
    const orderedUsersByColName = data.sort((a, b) =>
        a[colName].localeCompare(b[colName])
    );
    return orderedUsersByColName;
};

export const filterOnSearch = (data, value) => {
    const filtredUsersByColName = data.filter((user) => {
        const userLowerCase = user.fullname.toLowerCase();
        const valueLowerCase = value.toLowerCase();

        return userLowerCase.includes(valueLowerCase);
    });
    return filtredUsersByColName;
};
