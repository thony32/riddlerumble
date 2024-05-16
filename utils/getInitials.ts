const getInitial = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('');
}

export default getInitial;