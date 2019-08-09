import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, } from 'react-navigation';
import AnimeScreen from './AnimeScreen';
import MangaScreen from './MangaScreen';
import MyListScreen from './MyListScreen';
import MoreInfoScreen from './MoreInfoScreen';
import ListScreen from './ListScreen';
import SimilarTab from '../components/tabComponents/SimilarTab'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTabBarIcon = icon => ({ tintColor }) => (
    <MaterialCommunityIcons name={icon} size={26} style={{ color: tintColor }} />
);

// const MangaScreens = createStackNavigator(
//     {
//         MangaScreen: {
//             screen: MangaScreen,
//         },
//         MoreInfoScreen: {
//             screen: MoreInfoScreen,
//         },
//     },
//     {
//         initialRouteName: 'MangaScreen',
//         navigationOptions: {
//             tabBarIcon: getTabBarIcon('search')
//         },
//     }
// );

const AnimeScreenStack = createStackNavigator(
    {
        AnimeScreen: {
            screen: AnimeScreen,
        },
        MoreInfoScreen: {
            screen: MoreInfoScreen,
        },
        ListScreen: {
            screen: ListScreen
        },
    },
    {
        initialRouteName: 'AnimeScreen',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('movie')
        },
    }
);

const MangaScreenStack = createStackNavigator(
    {
        MangaScreen: {
            screen: MangaScreen,
        },
        MoreInfoScreen: {
            screen: MoreInfoScreen,
        },
    },
    {
        initialRouteName: 'MangaScreen',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('book-open-variant')
        },
    }
);


const MyListScreens = createStackNavigator(
    {
        MyListScreen: {
            screen: MyListScreen,
        },
        MoreInfoScreen: {
            screen: MoreInfoScreen,
        },
    },
    {
        initialRouteName: 'MyListScreen',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('star')
        },
    }
);


const tabBarNavigation = createBottomTabNavigator(
    {
        AnimeScreen: {
            screen: AnimeScreenStack,
        },
        MangaScreen: {
            screen: MangaScreenStack,
        },
        MyListScreen: {
            screen: MyListScreens,
        }
    },
    {
        initialRouteName: 'AnimeScreen',
        tabBarOptions: {
            style: {
                backgroundColor: '#19191a',
            },
            showLabel: false,
            showIcon: true,
            activeTintColor: '#ffffff',
            inactiveTintColor: '#262626',
            renderIndicator: () => null,
        },
    },

);

// export default createAppContainer(tabBarNavigation);
export default createAppContainer(tabBarNavigation);