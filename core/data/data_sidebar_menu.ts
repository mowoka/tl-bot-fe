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
    {
        title: "Binding",
        url: "/binding",
    },
]

export const ADMIN_SIDEBAR_MENU: ISIDEBAR_MENU[] = [
    {
        title: "Dashboard",
        url: "/",
    },
    {
        title: "Teknisi Management",
        url: "/teknisi-management",
    },
    {
        title: "Team Lead Management",
        url: "/team-lead-management",
    },
    {
        title: "Options",
        url: '/options'
    }
]