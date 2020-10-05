import { h } from 'sinueux';
import { s } from 'sinueux/s';

const text = s('Hello!');

const Button = ({ text, fn }: { text: string, fn: () => unknown }) =>
  <button style='display:block;' type="button" onClick={fn}>{text}</button>;

const Page = () =>
  <main>
    <h1>🌺</h1>
    <p>Text has {() => text().length} chars</p>
    <input
      value={text}
      onInput={(ev) => {
        ev.target && text((ev.target as HTMLInputElement).value);
      }}/>
    <Button text='x2' fn={() => text(text().repeat(2))}/>
    <p style='word-wrap:anywhere;'>Text: {text}</p>
  </main>;

document.body.appendChild(<Page/>);
