import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
export const SidebarData = [
    {
        title: 'home',
        icon: <HomeIcon />,
        link: '/home'
    },
    {
        title: 'Services',
        icon: <BuildIcon />,
        link: '/skills'
    },
    {
        title: 'Custom Solutions',
        icon: <CodeIcon />,
        link: '/webdev'
    },
    {
        title: 'Projects',
        icon: <ColorLensIcon />,
        link: '/projects'
    },
    {
        title: 'contact',
        icon: <ContactPhoneIcon />,
        link: '/contact'
    },
];



