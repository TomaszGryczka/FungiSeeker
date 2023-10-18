FROM openjdk:21 as builder

WORKDIR app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
#COPY gradle gradle
COPY mvnw.cmd .
#COPY settings.gradle .
COPY src src

RUN ./mvnw install -DskipTests

ARG JAR_FILE=target/*.jar
RUN java -Djarmode=layertools -jar ${JAR_FILE} extract --destination build/extracted

FROM openjdk:21

WORKDIR app
ARG EXTRACTED=app/build/extracted

COPY --from=builder ${EXTRACTED}/dependencies/ ./
COPY --from=builder ${EXTRACTED}/spring-boot-loader/ ./
COPY --from=builder ${EXTRACTED}/snapshot-dependencies/ ./
COPY --from=builder ${EXTRACTED}/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]