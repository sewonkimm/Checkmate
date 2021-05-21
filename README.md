# ✔Checkmate
<img src="https://user-images.githubusercontent.com/48380687/115811466-b6f4a480-a42a-11eb-9dff-dfa4057d3fa5.png" width=720 />

> 외국인 유학생을 위한 과제 첨삭 서비스 체크메이트!      
> 과제나 논문을 Check ✅ 해주는 당신만의 Mate 💟 

<br />
개발 기간 2021.04.12 ~ 2021.05.21
<br />

<img src="https://img.shields.io/static/v1?label=SSAFY&message=4%EA%B8%B0&color=ff69b4">
<img src="https://img.shields.io/static/v1?label=서울&message=1반&color=violet">

&nbsp;
&nbsp;
# 목차


- [1.기획배경](#기획배경)
- [2.주요기능](#주요기능)
- [3.기술스택](#기술스택)
- [4.프로젝트 세팅 가이드](#프로젝트Setting가이드)
- [5.만든사람들](#만든사람들)


&nbsp;
&nbsp;

# 기획배경

<img src="https://user-images.githubusercontent.com/30452963/119072133-f9a79d80-ba25-11eb-8764-8f04ce83799b.png" width="720" />


1. 꾸준히 증가하는 외국인 유학생! 
   - 국내 대학으로 유학 온 외국인 학생 수는 2000년 이후로 꾸준히 증가하고 있다.

2. 생각보다 어려운 한국어!
   - 너무나 다양한 어미의 종류와 사용법이 존재한다.
  
3. 코로나 블루로 우울한 유학생들!


## 타겟 유저

한국어 회화는 잘하지만 과제를 위한 작문에 어려움을 겪는 외국인 유학생
### 페르소나 : 한국 유학 3년차, 대만출신 유홍빈 님
<img src="https://user-images.githubusercontent.com/48380687/115805409-e18d3000-a41f-11eb-88e2-d74bdb9e207b.png" width=720 />
<br><br>


&nbsp;
&nbsp;
# 주요기능

### 1. AI 맞춤법 검사기

<img width="720" alt="image" src="https://user-images.githubusercontent.com/30452963/119074774-966c3a00-ba2a-11eb-9ed3-f0f8bf922ad6.png">

<img width="720" alt="image" src="https://user-images.githubusercontent.com/30452963/119074883-cca9b980-ba2a-11eb-9f33-7a902d42de9e.png">


### 2. 원어민 첨삭

<img width="720" alt="image" src="https://user-images.githubusercontent.com/30452963/119074971-f4991d00-ba2a-11eb-85ce-90a2bd3bbb81.png">

### 3. 온라인 커뮤니티

<img src="https://user-images.githubusercontent.com/30452963/119072497-86eaf200-ba26-11eb-9f7b-fb4051ddb4bd.gif" width="720" />





&nbsp;
&nbsp;

# 기술스택

### IDE

- VSCode
- IntelliJ
- Pycharm
### Frontend

| Name             | Version |
| ---------------- | ------- |
| React            | 17.0.2  |
| TypeScript       | 4.1.2   |
| Styled-component | 5.2.3   |
| redux            | 4.1.0   |
| chart.js         | 3.2.1   |
| i18next          | 20.2.2  |
| axios            | 0.21.1  |

### Backend

| Name        | Version |
| ----------- | ------- |
| Java        | 11      |
| Springboot  | 2.4.5   |
| Gradle      | 6.8.3   |
| MariaDB     | latest  |
| Nodejs      | 14.15.5 |
| express     | 4.17.1  |
| peer        | 0.5.3   |
| socket.io   | 2.3.0   |
| fastapi     | 0.63.0  |
| pip         | 21.1.1  |
| uvicorn     | 0.13.4  |
| gensim      | 3.8.3   |
| konlpy      | 0.5.2   |
| py-hanspell | 1.1     |


### DevOps

- Jenkins
- NginX
- Docker

### 협업 툴

- Git Lab
- Notion
- Jira
- Matter Most
- Webex 
- Figma

### 컨벤션

- Eslint - 7.24.0 (airbnb)
- Prettier - 2.2.1

### 크로스 브라우징 플랫폼 설정

- Last 1 chrome version
- Last 1 Firefox version
- Last 1 safari version


> 추후에 사용 범위를 늘려갈 예정
>
> '> 5% in KR' 등이 후보

### 와이어 프레임

<img src="https://user-images.githubusercontent.com/30452963/119069844-d8dd4900-ba21-11eb-97d2-fdb993cb8855.png" width="720" />
<img width="720" alt="image" src="https://user-images.githubusercontent.com/30452963/119068538-64090f80-ba1f-11eb-9df8-902fa39b6c26.png">
<img src="https://user-images.githubusercontent.com/56106402/115806773-57929680-a422-11eb-8ebe-3a93bf8e6ae4.png" width=360 /> <img src="https://user-images.githubusercontent.com/56106402/115806771-57929680-a422-11eb-88b5-85c36f223ee6.png" width=360 /><br/>

### ERD

<img src="https://user-images.githubusercontent.com/30452963/119068412-1ab8c000-ba1f-11eb-8127-25117e9291ef.png" width=720 />


### 서비스 아키텍쳐

<img src="https://user-images.githubusercontent.com/30452963/119070410-e6df9980-ba22-11eb-9a06-20d9b898f8d0.png" width=720 />


&nbsp;
&nbsp;

# 프로젝트Setting가이드
## Frontend

## Yarn 설치


```bash
// 설치
$ yarn install

// 시작
$ yarn start
```
## Backend

### AI

```bash
// 설치
$ pip install -r requirements.txt

// 시작
$ python main.py
```
### webRTC

```bash
// 설치
$ npm i install 

// 시작
$ npm run start
```

## 서버
### Yarn 설치
```
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt npm install
$ sudo npm install --global yarn
```
### Open JDK 11 설치
```
$ sudo apt-get install openjdk-11-jdk
$ sudo apt-get isntall openjdk-11-jre
```
### 환경설정
```
$ vim ~/.bashrc
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export PATH=$PATH:$JAVA_HOME/bin
$ source ~/.bashrc
$ echo $JAVA_HOME // /user/lib/jvm/java-11-openjdk-amd64
```
### Gradle 6.8.3 install

```
$ sudo apt install whet unzip // 툴 다운로드
$ cd /tmp
$ wget https://services.gradle.org/distributions/gradle-6.3.8-bin.zip
$ sudo mkdir /opt/gradle
$ sudo unzip -d /opt/gradle gradle-6.8.3-bin.zip
$ export PATH=$PATH:/opt/gradle/gradle-6.8.3/bin
$ gradle -v
```

### Docker 설치

```
# 필수 패키지 설치
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
# GPG Key 인증
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# docker repository 등록
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# 도커 설치
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
# 시스템 부팅시 도커 시작
sudo systemctl enable docker && service docker start
# 도커 확인
sudo service docker status
```

### MariaDB 도커 설치 및 컨테이너 실행
```
# mariadb 이미지 불러오기
sudo docker pull mariadb
# 도커 이미지 확인
sudo docker images
# 도커 이름은 --name 뒤에 넣고, password는 root 패스워드(사용자 지정)
sudo docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD={비밀번호} --name mariadb mariadb
# 도커 컨테이너 bash 접속
sudo docker exec -it mariadb bash
# mysql 접속
mysql -u root -p
# 패스워드 입력
{비밀번호}
```

### 프로젝트 실행

```
# frontend(React) 실행
$ git clone https://lab.ssafy.com/s04-final/s04p31a106.git
$ cd frontend
$ yarn install
$ yarn start

# backend(SpringBoot) 실행
$ cd backend
$ gradle build
```

### 젠킨스 설치

```
# 도커 설치 및 실행
$ docker run -d -u root -p {port}:{port} --name={container name} -v /home/admin/docker/jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home jenkinsci/blueocean

# jenkins 포트 방화벽 오픈
$ sudo iptables -I INPUT 1 -p tcp --dport {port} -j ACCEPT
$ sudo iptables -I OUTPUT 1 -p tcp --dport {port} -j ACCEPT

# 컨테이너 쉘 접속
$ docker exec -it {container name} /bin/bash
```
&nbsp;
&nbsp;

# 만든사람들

### 💙우아한 남매들💙
<img src="https://user-images.githubusercontent.com/48380687/115811345-7ac14400-a42a-11eb-8315-58dbb0cb50b9.png" width=720 />
<img src="https://user-images.githubusercontent.com/30452963/119068256-cb728f80-ba1e-11eb-96f4-101c1c99dc6f.png" width=720 />


