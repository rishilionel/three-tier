# Use an official Maven image as a parent image
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the source code into the container
COPY . .

# Build the application using Maven
RUN mvn clean install -DskipTests

# Second stage: Use a smaller base image to reduce the size of the final image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the JAR file from the builder stage
COPY --from=builder /usr/src/app/target/learning-0.0.1-SNAPSHOT.jar .

# Specify the command to run your application
CMD ["java", "-jar", "learning-0.0.1-SNAPSHOT.jar"]
