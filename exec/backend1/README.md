# 시스템 아키텍쳐

![image](https://user-images.githubusercontent.com/43171179/115608617-7a895180-a321-11eb-8315-68a8bf183005.png)

# 개발환경 버전

 Name       | Version |
------------|---------|
 React      | 17.0.2  |
 Yarn       | 1.22.19 |
 TypeScript | 4.1.2   |
 Java       | 11      |
 Springboot | 2.4.5   |
 Gradle     | 6.8.3   |
 MariaDB    | latest  |


## Yarn 설치
```
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt npm install
$ sudo npm install --global yarn
```

## Open JDK 11 설치
```
$ sudo apt-get install openjdk-11-jdk
$ sudo apt-get isntall openjdk-11-jre
```
## 환경설정
```
$ vim ~/.bashrc
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export PATH=$PATH:$JAVA_HOME/bin
$ source ~/.bashrc
$ echo $JAVA_HOME // /user/lib/jvm/java-11-openjdk-amd64
```
## Gradle 6.8.3 install

```
$ sudo apt install whet unzip // 툴 다운로드
$ cd /tmp
$ wget https://services.gradle.org/distributions/gradle-6.3.8-bin.zip
$ sudo mkdir /opt/gradle
$ sudo unzip -d /opt/gradle gradle-6.8.3-bin.zip
$ export PATH=$PATH:/opt/gradle/gradle-6.8.3/bin
$ gradle -v
```

## Docker 설치

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

## MariaDB 도커 설치 및 컨테이너 실행
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

## 프로젝트 실행

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

## 젠킨스 설치

```
# 도커 설치 및 실행
$ docker run -d -u root -p {port}:{port} --name={container name} -v /home/admin/docker/jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home jenkinsci/blueocean

# jenkins 포트 방화벽 오픈
$ sudo iptables -I INPUT 1 -p tcp --dport {port} -j ACCEPT
$ sudo iptables -I OUTPUT 1 -p tcp --dport {port} -j ACCEPT

# 컨테이너 쉘 접속
$ docker exec -it {container name} /bin/bash
```