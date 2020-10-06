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
declare function h(tag?: string | [], props?: unknown, ...children: unknown[]): Element | Node | DocumentFragment | undefined;
type Frag = { _startMark: Text }
declare const api: {
    ns: string;
    h: typeof h;
    svg: <T extends () => Element>(closure: T) => ReturnType<T>;
    add: (parent: Node, value: unknown, endMark?: Node) => Node | Frag;
    insert: (el: Node, value: unknown, endMark?: Node, current?: Node | Frag, startNode?: ChildNode | null) => Node | Frag | undefined;
    property: (el: Node, value: unknown, name: string | null, isAttr?: boolean, isCss?: boolean) => void;
    remove: (parent: Node, startNode: ChildNode | null, endMark: Node) => void;
    subscribe: (_: () => void) => void;
};
export { h, api };
