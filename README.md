1. flex-grow 규칙
  - flex-grow 가 설정되어있으면 그대로 사용
  - parnet가 column
    - height가 설정되지 않음
      - 1
    - else
      - undefined
  - else(parent가 row)
    - width가 설정되지 않음
      - 1
    - else
      - undefined

위 규칙을 통해 우선순위를 
1. flex-grow 가 설정되어있으면 그대로 사용
2. height (row 일때는 width) 가 설정되어있으면 그대로 사용
3. flex-grow = 1


컴포넌트 제작 규칙 (나름의...)
0. 목표: 어디에나 넣을수 있고 (자유로운 크기), 무엇이든 넣을수 있는 (공간 제공) 컴포넌트
1. 레이아웃과 관련된 (width, height, alignment, padding, flex) 것은 Layout 라이브러리 사용
  - margin 은 사용하지 않음
    - padding 으로 충분히 대체 가능.
    - 비슷한 두 속성으로 복잡도 증가
    - box-sizing이 margin은 지원하지 않음
2. 스타일은 sass에 컴포넌트별로 저장. 동적인 스타일만 js에서 관리
  - 스타일과 레이아웃의 분리.
  - 정적스타일과 동적스타일의 분리.
3. className, style 은 기본으로 외부에서 받을수 잇음 (props를 통해)


