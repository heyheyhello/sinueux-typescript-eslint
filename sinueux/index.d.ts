import { h, api } from './h/h';
import type { Subject } from './s';
import type { JSXInternal } from './jsx';
declare namespace h {
    export namespace JSX {
        type MaybeSubject<T> = T | Subject<T>;
        type AllowSubject<T> = { [K in keyof T]: MaybeSubject<T[K]> };

        type Element = HTMLElement;

        interface ElementAttributesProperty { props: unknown; }
        interface ElementChildrenAttribute { children: unknown; }

        // Prevent children on components that don't declare them
        interface IntrinsicAttributes { children?: never }

        // Allow children on all DOM elements (not components, see above)
        // ESLint will error for children on void elements like <img/>
        type DOMAttributes<Target extends EventTarget>
            = AllowSubject<JSXInternal.DOMAttributes<Target>>
                & { children?: unknown };

        type HTMLAttributes<Target extends EventTarget = EventTarget>
            = AllowSubject<Omit<JSXInternal.HTMLAttributes<Target>, 'style'>>
              & DOMAttributes<Target>
              & { style?:
                    | MaybeSubject<string>
                    | { [key: string]: MaybeSubject<string | number> };
                };

        type SVGAttributes<Target extends EventTarget = SVGElement>
            = AllowSubject<JSXInternal.SVGAttributes<Target>>
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
