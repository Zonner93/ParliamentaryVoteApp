FROM adoptopenjdk:11-jre-hotspot

ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} VoteApp.jar
ENTRYPOINT ["java", "-jar", "VoteApp.jar"]