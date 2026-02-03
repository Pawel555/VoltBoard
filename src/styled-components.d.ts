import 'styled-components';
import { ThemeType } from './styles/theme';

// TODO:chceck this to have theme in styled 
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType  {}
}


