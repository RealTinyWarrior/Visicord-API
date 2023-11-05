const versions = ["7", "8", "9", "10"];
export const oauth2AtMe = [...gen("/oauth2/@me")];

export const availableRoutes = [
    "/users/@me",
    "/oauth2/@me",
    "/users/@me/guilds",
    "/users/@me/connections",
    "/gifs/trending",
    "/gifs/trending-search",
    "/sticker-packs",
    "/gateway",
    "/experiments",
    "/auth/location-metadata",
    "/applications/detectable",
    "/application-directory/categories",
    "/application-directory/collections",
    "/application-directory/search",
    "/experiments?with_guild_experiments=true",
];

export const routes = [
    ...gen("/applications/detectable"),
    ...gen("/application-directory/categories"),
    ...gen("/application-directory/collections"),
    ...gen("/application-directory/search"),
    ...gen("/auth/location-metadata"),
    ...gen("/experiments"),
    ...gen("/experiments?with_guild_experiments=true"),
    ...gen("/gateway"),
    ...gen("/gifs/trending"),
    ...gen("/gifs/trending-search"),
    ...gen("/oauth2/@me"),
    ...gen("/sticker-packs"),
    ...gen("/users/@me"),
    ...gen("/users/@me/guilds"),
    ...gen("/users/@me/connections"),
];

export const cachedRoutes = [
    "/gifs/trending",
    "/gifs/trending-search",
    "/sticker-packs",
    "/applications/detectable",
    "/application-directory/collections",
    "/application-directory/search",
];

export const categories = [
    {
        id: 4,
        name: "Entertainment",
    },
    {
        id: 6,
        name: "Games",
    },
    {
        id: 8,
        name: "Moderation and Tools",
    },
    {
        id: 9,
        name: "Social",
    },
    {
        id: 10,
        name: "Utilities",
    },
];

function gen(url: string) {
    const urlArray: string[] = [];

    for (let i = 0; i < versions.length; i++)
        urlArray.push("https://discord.com/api/v<version>".replace("<version>", versions[i]) + url);

    return urlArray;
}
