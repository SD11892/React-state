# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 is coming with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

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
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
```

## Screencast (old)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (8196 ms)
       ✓ No tearing finally on mount (4769 ms)
     Level 2
       ✓ No tearing temporarily on update (13080 ms)
       ✓ No tearing temporarily on mount (4688 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8051 ms)
       ✕ Can branch state (wip state) (6757 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9773 ms)
       ✓ No tearing finally on mount (4700 ms)
     Level 2
       ✓ No tearing temporarily on update (14752 ms)
       ✓ No tearing temporarily on mount (4676 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8031 ms)
       ✓ No tearing finally on mount (4708 ms)
     Level 2
       ✓ No tearing temporarily on update (12989 ms)
       ✓ No tearing temporarily on mount (4616 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8017 ms)
       ✕ Can branch state (wip state) (6682 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9704 ms)
       ✓ No tearing finally on mount (4678 ms)
     Level 2
       ✓ No tearing temporarily on update (14684 ms)
       ✓ No tearing temporarily on mount (4647 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5659 ms)
       ✓ No tearing finally on mount (15550 ms)
     Level 2
       ✓ No tearing temporarily on update (8787 ms)
       ✓ No tearing temporarily on mount (13542 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3745 ms)
       ✓ Can branch state (wip state) (8360 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15602 ms)
       ✓ No tearing finally on mount (6609 ms)
     Level 2
       ✓ No tearing temporarily on update (19600 ms)
       ✓ No tearing temporarily on mount (8508 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4698 ms)
       ✓ No tearing finally on mount (9523 ms)
     Level 2
       ✓ No tearing temporarily on update (8736 ms)
       ✓ No tearing temporarily on mount (9518 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3742 ms)
       ✓ Can branch state (wip state) (5223 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9746 ms)
       ✓ No tearing finally on mount (5740 ms)
     Level 2
       ✓ No tearing temporarily on update (14702 ms)
       ✓ No tearing temporarily on mount (5651 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5626 ms)
       ✓ No tearing finally on mount (9576 ms)
     Level 2
       ✓ No tearing temporarily on update (9654 ms)
       ✕ No tearing temporarily on mount (8513 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3749 ms)
       ✕ Can branch state (wip state) (10222 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11392 ms)
       ✓ No tearing finally on mount (5776 ms)
     Level 2
       ✓ No tearing temporarily on update (15491 ms)
       ✕ No tearing temporarily on mount (5647 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5732 ms)
       ✓ No tearing finally on mount (13581 ms)
     Level 2
       ✓ No tearing temporarily on update (8766 ms)
       ✓ No tearing temporarily on mount (15439 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3697 ms)
       ✓ Can branch state (wip state) (8246 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15420 ms)
       ✓ No tearing finally on mount (8621 ms)
     Level 2
       ✓ No tearing temporarily on update (19594 ms)
       ✓ No tearing temporarily on mount (8485 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5658 ms)
       ✓ No tearing finally on mount (7565 ms)
     Level 2
       ✓ No tearing temporarily on update (8772 ms)
       ✕ No tearing temporarily on mount (9517 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3714 ms)
       ✕ Can branch state (wip state) (10259 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11355 ms)
       ✓ No tearing finally on mount (5749 ms)
     Level 2
       ✓ No tearing temporarily on update (15469 ms)
       ✕ No tearing temporarily on mount (5691 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8201 ms)
       ✓ No tearing finally on mount (5956 ms)
     Level 2
       ✓ No tearing temporarily on update (13114 ms)
       ✕ No tearing temporarily on mount (5854 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8057 ms)
       ✕ Can branch state (wip state) (7798 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10618 ms)
       ✓ No tearing finally on mount (6078 ms)
     Level 2
       ✓ No tearing temporarily on update (11689 ms)
       ✕ No tearing temporarily on mount (6049 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8124 ms)
       ✓ No tearing finally on mount (4700 ms)
     Level 2
       ✓ No tearing temporarily on update (13084 ms)
       ✓ No tearing temporarily on mount (4647 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8049 ms)
       ✕ Can branch state (wip state) (6755 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9802 ms)
       ✓ No tearing finally on mount (4710 ms)
     Level 2
       ✓ No tearing temporarily on update (14772 ms)
       ✓ No tearing temporarily on mount (4667 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5720 ms)
       ✓ No tearing finally on mount (8570 ms)
     Level 2
       ✓ No tearing temporarily on update (8780 ms)
       ✕ No tearing temporarily on mount (8517 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3694 ms)
       ✕ Can branch state (wip state) (10230 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11312 ms)
       ✓ No tearing finally on mount (5711 ms)
     Level 2
       ✓ No tearing temporarily on update (15405 ms)
       ✕ No tearing temporarily on mount (5605 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6673 ms)
       ✓ No tearing finally on mount (12505 ms)
     Level 2
       ✓ No tearing temporarily on update (9736 ms)
       ✕ No tearing temporarily on mount (12522 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4680 ms)
       ✕ Can branch state (wip state) (11240 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16471 ms)
       ✓ No tearing finally on mount (13595 ms)
     Level 2
       ✓ No tearing temporarily on update (20592 ms)
       ✕ No tearing temporarily on mount (13540 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5734 ms)
       ✓ No tearing finally on mount (8615 ms)
     Level 2
       ✓ No tearing temporarily on update (9793 ms)
       ✓ No tearing temporarily on mount (9544 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4698 ms)
       ✓ Can branch state (wip state) (6259 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11535 ms)
       ✓ No tearing finally on mount (5725 ms)
     Level 2
       ✓ No tearing temporarily on update (15654 ms)
       ✓ No tearing temporarily on mount (5604 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6667 ms)
       ✓ No tearing finally on mount (13530 ms)
     Level 2
       ✓ No tearing temporarily on update (9703 ms)
       ✓ No tearing temporarily on mount (15462 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4718 ms)
       ✓ Can branch state (wip state) (9270 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16638 ms)
       ✓ No tearing finally on mount (8520 ms)
     Level 2
       ✓ No tearing temporarily on update (20801 ms)
       ✓ No tearing temporarily on mount (6536 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8081 ms)
       ✓ No tearing finally on mount (4697 ms)
     Level 2
       ✓ No tearing temporarily on update (13027 ms)
       ✓ No tearing temporarily on mount (4730 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8063 ms)
       ✕ Can branch state (wip state) (3740 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9776 ms)
       ✓ No tearing finally on mount (4713 ms)
     Level 2
       ✓ No tearing temporarily on update (14775 ms)
       ✓ No tearing temporarily on mount (4679 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4710 ms)
       ✓ No tearing finally on mount (9597 ms)
     Level 2
       ✕ No tearing temporarily on update (8810 ms)
       ✕ No tearing temporarily on mount (9531 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3742 ms)
       ✕ Can branch state (wip state) (3002 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9751 ms)
       ✓ No tearing finally on mount (5762 ms)
     Level 2
       ✓ No tearing temporarily on update (14774 ms)
       ✕ No tearing temporarily on mount (5716 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8140 ms)
       ✓ No tearing finally on mount (4730 ms)
     Level 2
       ✓ No tearing temporarily on update (13103 ms)
       ✓ No tearing temporarily on mount (4682 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8065 ms)
       ✕ Can branch state (wip state) (6753 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9772 ms)
       ✓ No tearing finally on mount (4731 ms)
     Level 2
       ✓ No tearing temporarily on update (14708 ms)
       ✓ No tearing temporarily on mount (4642 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4664 ms)
       ✓ No tearing finally on mount (9539 ms)
     Level 2
       ✓ No tearing temporarily on update (8695 ms)
       ✓ No tearing temporarily on mount (9497 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3686 ms)
       ✕ Can branch state (wip state) (10343 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9746 ms)
       ✓ No tearing finally on mount (6781 ms)
     Level 2
       ✓ No tearing temporarily on update (14735 ms)
       ✓ No tearing temporarily on mount (5672 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>

</table>

## Caveats

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.
