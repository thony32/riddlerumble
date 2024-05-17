const getCountryCode = (country: string) => {
    return country.split(', ')[1];
}

export default getCountryCode;