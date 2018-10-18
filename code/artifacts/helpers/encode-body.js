export const encodeBody = (body) => {
    let s = "";
    Object.keys(body).forEach(key => {
        s += `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}&`;
    });
    return s.substr(0, s.length - 1);
};
