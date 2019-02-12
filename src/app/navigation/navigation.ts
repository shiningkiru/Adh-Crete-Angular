import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'dashboard',
                translate: 'Dashboard',
                type     : 'item',
                icon     : 'home',
                url      : '/admin/dashboard'
            }
        ]
    },
    {
        id       : 'user-access',
        title    : 'User Access',
        translate: 'User Access',
        type     : 'collapsable',
        icon     : 'https',
        children : [
            {
                id   : 'designation',
                title: 'Designation',
                type : 'item',
                url  : '/admin/user-access/designation'
            },
            {
                id   : 'access-privileges',
                title: 'Access Privileges',
                type : 'item',
                url  : '/admin/user-access/previleges'
            }
        ]
    },
    {
        id       : 'area-manager',
        title    : 'Area Manager',
        translate: 'Area Manager',
        type     : 'collapsable',
        icon     : 'map',
        children : [
            {
                id   : 'country',
                title: 'Country',
                type : 'item',
                url  : '/admin/country'
            },
            {
                id   : 'state',
                title: 'State',
                type : 'item',
                url  : '/admin/state'
            },
            {
                id   : 'region',
                title: 'Region',
                type : 'item',
                url  : '/admin/region'
            },
            {
                id   : 'city',
                title: 'City',
                type : 'item',
                url  : '/admin/city'
            },
            {
                id   : 'block',
                title: 'Block',
                type : 'item',
                url  : '/admin/block'
            }
        ]
    },
];
