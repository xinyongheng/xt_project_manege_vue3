function isEmpty(s?: string | Array<any>) {
    if (!s) return true;
    if (s.length < 1) return true;
    return false;
}
export { isEmpty }