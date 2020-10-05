import { h, api } from './h';
import type { Subject } from './s';
import type { JSXInternal } from './jsx';
import type { JSXInternal as JSXInternalSinueux } from './jsx-sinueux';
export { h, api };

// (Use Ctrl+/ to comment/uncomment the test blocks)

// Test #1: Overwriting h namespace with jsx.d.ts (which is the same namespace,
// see sinueux/h/index.d.ts for that). You'll see it work in index.tsx but there
// will be an error about <input value={text}.../>

declare namespace h {
    // @ts-expect-error `import type`
    export import JSX = JSXInternal
}


// Test #2: Overwriting h namespace to use the jsx-sinueux.d.ts typings (which
// has 25 lines of edits). There are now no errors.

// declare namespace h {
//     // @ts-expect-error `import type`
//     export import JSX = JSXInternalSinueux
// }


// Test #3: Overwriting the h namespace to have the 25 lines of edits here in a
// new namespace that references the jsx.d.ts namespace. This way jsx.d.ts can
// remain library agnostic and allow developers to apply edits outside of it

// declare namespace h {
//     export namespace JSX {
//         type MaybeSubject<T> = T | Subject<T>
//         type AllowSubject<Props> = { [K in keyof Props]: MaybeSubject<Props[K]> }

//         // Prevent children on components that don't declare them
//         interface IntrinsicAttributes { children?: never }

//         // Allow children on all DOM elements (not components, see above)
//         // ESLint will error for children on void elements like <img/>
//         type DOMAttributes<Target extends EventTarget>
//             = AllowSubject<
//                 JSXInternal.DOMAttributes<Target>
//                 & { children?: unknown }>

//         type HTMLAttributes<RefType extends EventTarget = EventTarget>
//             = AllowSubject<Omit<JSXInternal.HTMLAttributes<RefType>, 'style'>>
//               & { style?:
//                     | MaybeSubject<string>
//                     | { [key: string]: MaybeSubject<string | number> }
//                 }

//         type SVGAttributes<Target extends EventTarget = SVGElement>
//             = AllowSubject<JSXInternal.SVGAttributes<Target>>

//         type IntrinsicElements
//             = AllowSubject<JSXInternal.IntrinsicElements>
//     }
// }
