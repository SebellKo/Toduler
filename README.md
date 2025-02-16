# ToDo & Calendar
달력과 ToDo 리스트를 이용한 일정, todo 관리 애플리케이션입니다.
<br/>

## 실행방법

- 프로젝트 클론
- 프로젝트 폴더 이동
- `yarn add` 패키지 설치
- `yarn start` 프로젝트 실행
<br/>

## 개발환경

- 라이브러리 : React
- 언어 : TypeScript
- UI : and-design
- 상태관리 : zustand, tanstack-query
- db : indexedDB
<br/>


## 개발화면
<img width="1675" alt="메인화면" src="https://github.com/user-attachments/assets/6bd26ebe-9a88-4e23-9640-7c8a68a70908" />
[메인화면]
<br/>
<br/>

![새로운 카테고리 추가-삭제](https://github.com/user-attachments/assets/06df0d6b-a390-4077-a44d-dc0ac80e0bc3)
[ToDo 카테고리 추가 삭제]
<br/>
<br/>

![일정 추가 삭제](https://github.com/user-attachments/assets/ce6ac24e-4947-44ed-88ec-1ee9d6285dc0)
[Schedule 추가 삭제]
<br/>
<br/>

![투두 생성 수정 삭제](https://github.com/user-attachments/assets/a830a3a2-1f96-41d0-85ef-abc90d811a92)
[Todo 추가 삭제]
<br/>
<br/>

## 개발내용

### 메인페이지
- 화면 렌더링시 좌측 달력에 '날'별로 일정이 표시됩니다.
- 우측 ToDo 컴포넌트를 활용해 선택한 날짜의 Todo 리스트와 일정을 확인 할 수 있습니다.

### 일정관리
- ToDo 컴포넌트를 활용해 선택한 날짜의 일정을 생성하고 삭제할 수 있습니다.
- TimePicker 컴포넌트를 사용해 일정 시간을 선택할 수 있습니다.

### ToDo 카테고리 추가
- ToDo 컴포넌트를 활용해 새로운 카테고리를 추가, 삭제할 수 있습니다.
- Schedules, ToDos 카테고리는 모든 날짜별 고정 카테고리 입니다.

### ToDo 리스트 아이템 추가
- 새로운 ToDo 리스트 아이템을 생성, 수정, 삭제할 수 있습니다.
<br/>


## Issue

### 데이터 영속성 유지

애플리케이션 UX 증진을 위해서 클라이언트 사이드에서 사용자가 생성,삭제 수정한 데이터를 유지해야 했습니다.
백엔드 서버를 구현하지 않았기에 사용할 수 있는 방법은 전역상태, 세션 스토리지, 로컬 스토리지, IndexedDB가 있었습니다.

기술 선택에 있어 두가지 지표를 선정했습니다.

1. 데이터 영속성
2. 쉬운 데이터 핸들링

첫번째 데이터 영속성 지표로 인해 리로드되면 사라지는 전역상태와 탭이 닫히면 사라지는 세션 스토리지를 제외했습니다.
두번째 사용자 데이터를 쉽게 핸들링하기 위해 스트링 타입만 저장 가능한 로컬 스토리지를 제외하고 객체 타입을 저장할 수 있는 indexedDB를 선택했습니다.

### 상태관리

사용자 데이터를 핸들링 하기위해 indexedDB를 선택하면서 비동기로 수행되는 작업을 효과적으로 관리하며, suspense를 적용하기 위해 tanstack-query를 사용했습니다.
(suspense는 적용하지 못했습니다.)
추가로 캘린터 컴포넌트와 ToDo 컴포넌트 깊은 곳에서도 사용되는 현재 선택한 날짜 상태를 관리하기 위해 zustand를 사용해 전역으로 관리하여 Props Drilling을 방지했습니다.




