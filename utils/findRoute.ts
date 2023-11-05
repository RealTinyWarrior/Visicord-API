const findRoute = (urlString: string) => {
    const url = new URL(urlString);
    const pathname = url.pathname;
    const result = pathname.match(/\/v\d+\//g) || "";
    const lastVersion = result[result.length - 1];
    const textAfterLastVersion = pathname.substring(pathname.lastIndexOf(lastVersion) + lastVersion.length);

    return "/" + textAfterLastVersion;
};

export default findRoute;
