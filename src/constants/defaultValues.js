/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];



export const firebaseConfig = {
      apiKey: "AIzaSyBKS2Gop0fFO66TPC0Z5OHMwJTBXsiJ7zg",
      authDomain: "coachingtech-9f8ba.firebaseapp.com",
      databaseURL: "https://coachingtech-9f8ba.firebaseio.com",
      projectId: "coachingtech-9f8ba",
      storageBucket: "coachingtech-9f8ba.appspot.com",
      messagingSenderId: "18501623957",
      appId: "1:18501623957:web:376da22a8a23eed4d2bb9c",
      measurementId: "G-42M9VL9FKZ"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey="__theme_color"
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
export const isDarkSwitchActive = true;
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;
