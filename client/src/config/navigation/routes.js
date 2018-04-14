import {FontIcons} from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'LoginMenu',
    title: 'Auth',
    icon: FontIcons.login,
    screen: Screens.LoginMenu,
    children: [
      {
        id: 'Login1',
        title: 'Login V1',
        screen: Screens.LoginV1,
        children: []
      },
      {
        id: 'Login2',
        title: 'Login V2',
        screen: Screens.LoginV2,
        children: []
      },
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
      {
        id: 'password',
        title: 'Password Recovery',
        screen: Screens.PasswordRecovery,
        children: []
      },
    ]
  },
  {
    id: 'SocialMenu',
    title: 'Social',
    icon: FontIcons.profile,
    screen: Screens.SocialMenu,
    children: [
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: []
      },
      {
        id: 'ProfileV2',
        title: 'User Profile V2',
        screen: Screens.ProfileV2,
        children: []
      },
      {
        id: 'ProfileV3',
        title: 'User Profile V3',
        screen: Screens.ProfileV3,
        children: []
      },
      {
        id: 'ProfileSettings',
        title: 'Profile Settings',
        screen: Screens.ProfileSettings,
        children: []
      },
      {
        id: 'Notifications',
        title: 'Notifications',
        screen: Screens.Notifications,
        children: []
      },
      {
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: []
      },
      {
        id: 'Subscribe',
    title: 'Subscribe View',
    screen: Screens.Subscribe,
    children: []
      },
      {
        id: 'Feed',
        title: 'Feed',
        screen: Screens.Feed,
        children: []
      },
    ]
  },
  {
    id: 'Article',
    title: 'Article View',
    icon: FontIcons.article,
    screen: Screens.Article,
    children: []
//     children: [{
//       id: 'Article',
//       title: 'Article View',
//       screen: Screens.Articles,
//       children: []
    
//   },
// ]
  },
  {
    id: 'Subscribe',
    title: 'Subscribe View',
    icon: FontIcons.article,
    screen: Screens.Subscribe,
    children: []
//     children: [{
//       id: 'Article',
//       title: 'Article View',
//       screen: Screens.Articles,
//       children: []
    
//   },
// ]
  },
  {
    id:'ContactsMenu',
    title: 'Browse',
    icon: FontIcons.article,
    screen: Screens.Contacts,
    children: [{
      id:'Contacts',
      title: 'Contacts',
      screen: Screens.Contacts,
      children:[{
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: []
      
    },]
    }
    ]
  },
  {
    id: 'WalkthroughMenu',
    title: 'Reccomended',
    icon: FontIcons.mobile,
    screen: Screens.ArticlesRec,
    children: [{
      id: 'Walkthrough',
      title: 'Walkthrough',
      screen: Screens.WalkthroughScreen,
      children: []
    }]
  },
  {
    id: 'EcommerceMenu',
    title: 'Ecommerce',
    icon: FontIcons.card,
    screen: Screens.EcommerceMenu,
    children: [
      {
        id: 'Cards',
        title: 'Cards',
        icon: FontIcons.card,
        screen: Screens.Cards,
        children: []
      },
      {
        id: 'AddToCardForm',
        title: 'Add Card Form',
        icon: FontIcons.addToCardForm,
        screen: Screens.AddToCardForm,
        children: []
      },

    ]
  },
  {
    id: 'OtherMenu',
    title: 'Other',
    icon: FontIcons.other,
    screen: Screens.OtherMenu,
    children: [
      {
        id: 'Settings',
        title: 'Settings',
        screen: Screens.Settings,
        children: []
      }
    ]
  },
  {
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
    screen: Screens.Themes,
    children: []
  },
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'SocialMenu',
  title: 'Social',
  screen: Screens.SocialMenu,
  children: []
},);

export const MenuRoutes = menuRoutes;