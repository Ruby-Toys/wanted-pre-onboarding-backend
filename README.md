# 채용공고 시스템 구현

- 기업의 채용을 위한 웹 서비스로서 회사(채용 담당자)는 채용 공고를 생성하고, 구직자는 채용 공고에 지원하는 기능을 구현한다.
<br/>

## ER Diagram
![image](https://user-images.githubusercontent.com/93859705/195059448-50397e14-dccf-4070-a083-e2664f487476.png)
<br/> <br/> 

## 요구사항 분석
- 회사
    - 회사는 여러 채용 공고를 등록할 수 있다.
    - 회사는 작성한 채용 공고를 수정, 삭제할 수 있다.
    - 회사는 등록한 채용 공고에 지원한 이력서들을 조회할 수 있다.
    - 회사는 등록한 채용 공고에 지원한 지원 이력들의 검토/합격/탈락 여부를 결정할 수 있다.
- 구직자
    - 구직자는 여러 이력서를 작성할 수 있다.
    - 구직자는 자신이 작성한 이력서를 조회, 수정, 삭제할 수 있다.
    - 구직자는 하나의 이력서로 여러 채용 공고에 지원할 수 있다.
    - 구직자는 자신이 지원한 지원 이력을 취소할 수 있다.
        - 한 번 지원한 채용공고에는 취소하더라도 다시 지원할 수 없다.
- 사용자 공통
    - 사용자는 채용 공고 목록을 조회할 수 있다.
        - 검색 기능 포함