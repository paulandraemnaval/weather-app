export type GlobalContextType = {
  weatherData?: any;
  loading: boolean;
  menu: string;
  setMenu: (menu: string) => void;
  setLocation: (location: string) => void;
};
