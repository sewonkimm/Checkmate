FROM openjdk:11 AS builder
VOLUME /tmp
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew build
FROM adoptopenjdk:11-jdk
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8197
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
