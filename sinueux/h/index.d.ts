import { h, api } from './h';
import type { JSXInternal } from '../jsx';
declare namespace h {
    export namespace JSX {
        type Element = HTMLElement;

        interface ElementAttributesProperty { props: unknown; }
        interface ElementChildrenAttribute { children: unknown; }

        // Prevent children on components that don't declare them
        interface IntrinsicAttributes { children?: never; }

        // Allow children on all DOM elements (not components, see above)
        // ESLint will error for children on void elements like <img/>
        type DOMAttributes<Target extends EventTarget>
            = JSXInternal.DOMAttributes<Target>
              & { children?: unknown };

        type HTMLAttributes<Target extends EventTarget>
            = JSXInternal.HTMLAttributes<Target>
              & DOMAttributes<Target>;

        type SVGAttributes<Target extends EventTarget>
            = JSXInternal.SVGAttributes<Target>
              & HTMLAttributes<Target>;

        // Fix routing for IntrinsicElements the above {HTML,SVG}Attributes
        type ReplaceAttrsHTML<T>
            = T extends JSXInternal.HTMLAttributes<infer U>
                ? HTMLAttributes<U>
                : never;
        type ReplaceAttrsSVG<T>
            = T extends JSXInternal.SVGAttributes<infer U>
                ? SVGAttributes<U>
                : never;

        type PatchIntrinsicElements<T> = {
            [El in keyof T]: ReplaceAttrsSVG<T[El]> | ReplaceAttrsHTML<T[El]>;
        };

        type IntrinsicElements
            = PatchIntrinsicElements<JSXInternal.IntrinsicElements>;
    }
}
export { h, api };
