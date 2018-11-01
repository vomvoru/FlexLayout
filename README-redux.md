# Redux
상태관리 라이브러리

---

## 핵심 개념(Core Concepts)

### 앱의 상태를 객체로 저장
- 앱을 상태라는 개념으로 분리
- setter가 없는 model

```js
export default {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```

### 앱의 상태를 변경하기 위해 액션객체를 사용
- 앱의 모든 상황(상태)을 액션으로 설명이 가능하다면 어떤 일이 벌어졌는지 추적이 가능
- 무엇인가 변경되면 왜 변경됬는지 파악이 가능 (상태는 액션으로만 변경)

```js
const addTodoAction = { type : 'ADD_TODO' , 텍스트 : '수영장으로 이동' }   
const toggleTodoAction = { type : 'TOGGLE_TODO' , index : 1 }   
const setVisibilityFilterAction = { type : 'SET_VISIBILITY_FILTER' , 필터 : 'SHOW_ALL' } 
```

### 상태와 액션을 인수로 받는 순수함수 Reducer
- 상태와 액션을 인수로 받고 새로운 상태를 반환하는 순수함수
- 연관성이 높은 상태별로 분리

앱의 부분 상태를 관리하는 Reducer 들
```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}
​
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index) =>
          action.index === index
            ? { text: todo.text, completed: !todo.completed }
            : todo
      )
    default:
      return state
  }
}
```

앱의 전체 상태를 관리하는 Root Reduer
```js
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```

---

## 3가지 원칙

### Single source of truth
App의 상태는 단일 Stroe에 저장
- 관리의 용이성
- 디버깅과 검사가 쉬워짐

### State is read-only
상태는 읽기전용... 보다 중요한건 **상태는 액션으로만 변경 됨**
- 순차적으로 변경되기때문에 경쟁 문제가 적게 발생(동시성 문제)
- 상태 변경의 모든 원인은 액션
  - 디버깅 또는 테스트 목적으로 기록, 직렬화, 저장 가능

### Changes are made with pure functions
상태, 액션을 받고 새로운 상태를 반환하는 순수 함수 (Redux)
- 순수 함수이므로 외부 값의 영향을 받지않고 **오직 상태와 액션의 영향만 받음**
  - 명확하며 예측이 가능