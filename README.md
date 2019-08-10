# Will this React global state work in concurrent mode?

Checking tearing in React concurrent mode

## Introduction

In react-redux, there's a theoretical issue called "tearing"
that might occur in React concurrent mode.

Let's try to check it!

## What is tearing?

- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionaly expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode.git
cd will-this-react-global-state-work-in-concurrent-mode
npm install
npm run build-all
PORT=8080 npm run http-server &
PORT=8080 npm run jest
```

You can also test it by opening `http://localhost:8080/react-redux`
in your browser, and click the button very quickly. (check the console log)

## Screencast

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Result

<details>
<summary>Raw Output</summary>

```
  react-redux
    ✓ check1: updated properly (2439ms)
    ✕ check2: no tearing during update (19ms)
    ✓ check3: ability to interrupt render (1ms)
    ✕ check4: proper update after interrupt (5111ms)
  reactive-react-redux
    ✓ check1: updated properly (2336ms)
    ✓ check2: no tearing during update (2ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (835ms)
  react-tracked
    ✓ check1: updated properly (4538ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (781ms)
  constate
    ✓ check1: updated properly (4343ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (770ms)
  unstated-next
    ✓ check1: updated properly (4421ms)
    ✓ check2: no tearing during update (2ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (775ms)
  zustand
    ✕ check1: updated properly (11344ms)
    ✕ check2: no tearing during update (3ms)
    ✓ check3: ability to interrupt render (1ms)
    ✕ check4: proper update after interrupt (5081ms)
  react-sweet-state
    ✓ check1: updated properly (2984ms)
    ✕ check2: no tearing during update (28ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5126ms)
  storeon
    ✓ check1: updated properly (2297ms)
    ✕ check2: no tearing during update (14ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5116ms)
  react-hooks-global-state
    ✓ check1: updated properly (5057ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (801ms)
  use-context-selector
    ✓ check1: updated properly (4426ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (771ms)
  mobx-react-lite
    ✕ check1: updated properly (11181ms)
    ✕ check2: no tearing during update (2ms)
    ✓ check3: ability to interrupt render (1ms)
    ✕ check4: proper update after interrupt (5034ms)
  use-subscription
    ✓ check1: updated properly (2365ms)
    ✕ check2: no tearing during update (20ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5099ms)
```

</details>

<table>
  <tr>
    <th></th>
    <th>check1: updated properly</th>
    <th>check2: no tearing during update</th>
    <th>check3: ability to interrupt render</th>
    <th>check4: proper update after interrupt</th>
  </tr>

  <tr>
    <th>react-redux</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  <tr>
    <th>reactive-react-redux</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>react-tracked</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>constate</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>unstated-next</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>zustand</th>
    <td>Fail</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>react-sweet-state</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>storeon</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>react-hooks-global-state</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>use-context-selector</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>mobx-react-lite</th>
    <td>Fail</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>use-subscription (w/ redux)</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>
</table>

## Caution

Do no believe the result too much.
The test is done in a very limited way.
Something might be wrong.

## Caution2

We are not yet sure what the final conurrent mode would be.
It's likely that there could be some issues other than "tearing."

## If you are interested

The reason why I created this is to promote my projects!

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)

The feature of these libraries is not only concurrent mode friendly,
but also state usage tracking.
