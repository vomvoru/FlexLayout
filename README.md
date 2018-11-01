# Typescript + React + 기타 등등등...
Typescript 공부겸 여러가지 써보는중
목적은 여러가지 기능의 위젯이 있는 Dashboard 만들기

## install
1. install Docker (https://www.docker.com/)
2. 실행: `docker-compose up`
3. 접속: http://localhost:8080/

## Tasks
https://www.meistertask.com/projects/5hvzd0cu4k/join/

## Typescript + React
장점과 단점

### 장점

- 조금 복잡한 라이브러리를 사용할때 대충 알고 쓸수 없게 된다.
  - 타입을 정확히 지정하고 써야되는데 예시가 없으면 직접 타입설정 파일을 뒤적여야 하므로
- 프로그램은 견고해지며 규모가 커질수록.. 커져봐야 알듯

### 단점

- 빠른 속도로 개발은 힘들다 (혹은 any를 쓰는 방법으로 어느정도 해소는 가능하지만..하지만..)
- React의 defaultProps의 지원방법을 찾아야 되는등, 라이브러리의 특정 기능에 대해 지원이 부족하거나 방법을 찾는데에 시간이 소요됨
- eslint-plugin-react/no-unused-prop-types 의 사용방법은 찾지 못함
- eslint의 강력한 기능을 쓰려면 어느정도 설정의 수고가 필요함
- Type 정의를 중복해서 작성하는것을 피하기위해, 혹은 정의된 타입간 의존성을 줄이기 위한 노력이 필요하다
> 결론은 러닝커어어어브 + eslint 사용이 힘듬(Typescript 생태계 크기가 아쉬움)

---

## PropTypes vs Typescript
### The better point of a Typescript
- PropTypes 는 Runtime 시점에서 타입을 검사. Typescript는 빌드 시점에서 검사.
- 동일한 역할을 수행하고 있음.
- 자동완성 기능은 Typescript가 더 좋게 지원
- Typescript를 React와 같이 사용한다면 굳이 쓸 필요가 없다고 생각됨

### The better point of a PropTypes
- PropTypes에 비해서 Typescript에 대한 러닝커브가 작다.
- 의도치 못한 문제가 잘 안생김 (React의 공식지원)

---

## Default Props
Typescript 에서 React의 Default Props 사용하기.

```tsx
import * as React from 'react';

interface MultipleProps {
  num: number;
  // multi?: number; 잘못된 사용방법. 이렇게 사용하면 render 안의 multi 타입이 number | undefined가 되서 타입에러 발생
  multi: number;
}

class Multiple extends React.PureComponent<MultipleProps> {
  static defaultProps = {
    multi: 1,
  };

  render() {
    const { num, multi } = this.props;

    return <span>{num * multi}</span>;
  }
}

const App = () => (
  <div>
    <Multiple multi={2} num={2} />
    <Multiple num={2} />
  </div>
);

```

### function Component

```tsx
import * as React from 'react';

interface MultipleProps {
  num: number;
  multi: number;
}

const Multiple = ({ num, multi=1 }: MultipleProps) =>(
  <span>{num * multi}</span>
)

Multiple.defaultProps = {
  multi: 1,
};
```

### 참고

- typescript에서 defaultProps 를 사용하는 방법
  - http://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#support-for-defaultprops-in-jsx
- Typescript 3.0 이전 방법들
  - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
  - https://github.com/Hotell/rex-tils
  - https://medium.com/@martin_hotell/react-typescript-and-defaultprops-dilemma-ca7f81c661c7

---

## defaultProps가 옵션으로 설정된 prop 타입 추출 방법
부제: `JSX.LibraryManagedAttributes` 사용법

`JSX.LibraryManagedAttributes<typeof 클래스, 클래스Props>;`

> 다른 언어와 다르게 Typescript 클래스의 타입은 `클래스명` 아니라 `typeof 클래스명` 이라는것에 주의.

> Javascript의 함수(클래스)는 **first-class**이므로 함수를 값으로 다루기 때문에 위와 같은 방식을 사용하는 것으로 추측

## infer & extends
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html



## 유용한 타입
https://github.com/Microsoft/TypeScript/issues/19569



## Typescript 로 이미지 가져오기 (Webpack과 함께 쓸때)

```ts
import * as desktopBackgroundImage from '../assets/img/apple.jpg';
```
위와 같이 작성시 아래와 같은 ts 에러가 발생
`'../assets/img/defaultBackgorund.jpg' 모듈을 찾을 수 없습니다.`

아래 구문을 d.ts 파일에 넣으면 해결가능
```ts
declare module '*.png'
declare module '*.jpg'
```


## ECT

### 비동기 처리 (impure function)
redux로 비순수함수에 대한 처리 (네트워크 통신 등)를 하는 미들웨어는 많다.
보통 기준으로
action listener 인가 아닌가로 나뉜다.

#### non action listener
흐름 action(non FSA객체 반환) -> (non FSA객체를 적절히 사용)middleware -> aciton(FSA 객체 반환) -> reducer -> store

#### action listener
흐름: action(FSA 객체 반환) -> (action listener)middleware -> aciton(FSA 객체 반환) -> reducer -> store
actionCreator에서는 무조건 FSA객체를 반환한다.
순수함수와 비순수함수를 나눔
  - redux-rx
  - redux-saga


### 사용(될) 기술
- react, redux, typescript
- immutableJS
- reslecet
- redux-rx



## 유용 문서
- https://github.com/piotrwitek/react-redux-typescript-guide
  - Typescript, react, redux 를 함께 사용하는 방법들

# Storybook (컴포넌트 기반 개발 방법)

- 위에서 아래로 개발하는 방식이 아닌 아래서 위로 개발하는 방식
- 작은 컴포넌트에서 큰 컴포넌트 순서로 개발하다보니 컴포넌트를 분할하게 된다.
- 작은 컴포넌트를 우선 개발하다보니 결과물을 더 빨리 볼 수 있다.
- 작은 부분부터 개발하니까 디자인의 좀 더 디테일한 부분에 신경을 쓰게 된다.
- 자연스럽게 Pure한 컴포넌트를 제작하게 된다.
- stories를 추가로 작성해야 하지만, 작성함으로서 얻는 이득이 더 많다. 익숙해지면 작성에 시간이 얼마 걸리지도 않고.
- 문서가 만들어진다.
- 크기에 의존되지 않고 부모 컴포넌트의 공간(크기)에 의존되는 반응성 좋은 컴포넌트를 작성하기에 좋은 환경

- 초기 세팅에 시간이 엄청 걸림...
- stories를 추가로 작성해야 함.