interface ISIDEBAR_MENU {
    title: string;
    url: string;
}

export const TEAM_LEAD_SIDEBAR_MENU: ISIDEBAR_MENU[] = [
    {
        title: "Dashboard",
        url: "/",
    },
    {
        title: "TL Board",
        url: "/boards",
    },
    {
        title: "Teknisi Management",
        url: "/teknisi-management",
    },
]

export const ADMIN_SIDEBAR_MENU: ISIDEBAR_MENU[] = [
    {
        title: "Dashboard",
        url: "/",
    },
    {
        title: "TL Board",
        url: "/boards",
    },
    {
        title: "Teknisi Management",
        url: "/teknisi-management",
    },
    {
        title: "Options",
        url: '/options'
    }
]