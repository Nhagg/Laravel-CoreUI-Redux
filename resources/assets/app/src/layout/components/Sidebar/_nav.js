export default {
    items: [
        {
            name: 'Bảng tin',
            url: '/dashboard',
            icon: 'icon-home',
        },
        {
            title: true,
            name: 'Data Insight',
            wrapper: {                        // optional wrapper object
                element: '',                // required valid HTML5 element tag
                attributes: {}                // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''                         // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'Data Explorer',
            url: '/data-explorer',
            icon: 'icon-diamond',
        },
        {
            name: 'Schema Explorer',
            url: '/schema-explorer',
            icon: 'icon-diamond',
        },
        {
            name: 'Categories',
            url: '/categories',
            icon: 'icon-grid',
            children: [
                {
                    name: 'Products',
                    url: '/categories',
                    icon: 'icon-layers',
                    children: [
                        {
                            name: 'CPD',
                            url: '/categories/teg',
                            icon: 'icon-graduation'
                        },
                        {
                            name: 'NVN',
                            url: '/categories/nvn',
                            icon: 'icon-graduation'
                        },
                        {
                            name: 'EDM',
                            url: '/categories/edm',
                            icon: 'icon-graduation'
                        },
                        {
                            name: 'UNI',
                            url: '/categories/uni',
                            icon: 'icon-graduation'
                        },
                        {
                            name: 'NTL',
                            url: '/categories/uni',
                            icon: 'icon-graduation'
                        },
                        {
                            name: 'ETL',
                            url: '/categories/uni',
                            icon: 'icon-graduation'
                        }
                    ]
                },
                {
                    name: 'Labels',
                    url: '/filter',
                    icon: 'icon-magic-wand',
                    children: [
                        {
                            name: 'user-core',
                            url: '/filter?label=user-core',
                            icon: 'icon-tag'
                        },
                        {
                            name: 'user-core',
                            url: '/filter?label=user-core',
                            icon: 'icon-tag'
                        },
                        {
                            name: 'user-core',
                            url: '/filter?label=user-core',
                            icon: 'icon-tag'
                        },
                    ]
                },
            ]
        },
        {
            name: 'Settings',
            url: '/settings',
            icon: 'icon-settings',
            children: [
                {
                    name: 'Tag Manager',
                    url: '/tags/list',
                    icon: 'icon-tag',
                }
            ]
        }
    ]
};
