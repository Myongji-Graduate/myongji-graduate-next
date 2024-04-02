import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    //Add CSS Custom Properties
    '--percentage'?: number;
  }
}
