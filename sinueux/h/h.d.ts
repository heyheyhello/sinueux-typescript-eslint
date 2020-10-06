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
