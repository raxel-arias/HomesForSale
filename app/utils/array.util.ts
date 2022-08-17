const filterArrayByObjectEntries = (original: Array<any>, newArray: Array<any>, key: string) => {
    original.forEach((element: any) => {
        if (!newArray.some((existentElement: any) => element[key] === existentElement[key])) newArray.push(element);
    });
    return newArray;
}

const findArrayObjectByKey = (array: Array<any>, key: string, value: any, specific?: any) => {
    const object = array[array.findIndex((el: any) => el[key] === value)];

    if (!object) return null;

    if (specific) {
        return object[specific];
    }

    return object;
}