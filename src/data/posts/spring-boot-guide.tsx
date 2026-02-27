'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Spring Boot and how is it different from Spring Framework?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring Framework is a comprehensive Java application framework providing dependency injection, AOP, data access, MVC, and more. Spring Boot is an opinionated layer on top of Spring that provides auto-configuration, embedded servers (Tomcat/Jetty), production-ready features, and starter dependencies — eliminating most boilerplate XML configuration. With Spring Boot you can go from zero to a running REST API in minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Spring Boot starters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring Boot starters are curated dependency descriptors that bundle commonly used libraries together. For example, spring-boot-starter-web includes Spring MVC, Jackson (JSON), and an embedded Tomcat server. spring-boot-starter-data-jpa includes Hibernate, Spring Data JPA, and JDBC. Starters eliminate the need to manually manage compatible library versions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Spring Boot auto-configuration work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring Boot scans the classpath and automatically configures beans based on what libraries are present. For example, if H2 is on the classpath it auto-configures an in-memory datasource. Auto-configuration classes are loaded via spring.factories (or AutoConfiguration.imports in Spring Boot 3) and each is conditional — only activating when specific classes or properties are present. You can override any auto-configured bean by defining your own.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between @Component, @Service, and @Repository?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '@Component is the generic stereotype for any Spring-managed bean. @Service is a specialization of @Component for the service layer — semantically it means the class holds business logic. @Repository is a specialization for the data access layer — it also enables automatic exception translation, converting database-specific exceptions to Spring\'s DataAccessException hierarchy. All three enable classpath scanning and dependency injection.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement JWT authentication in Spring Boot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add spring-boot-starter-security and the java-jwt (Auth0) or jjwt library. Create a JwtUtil class to generate and validate tokens. Implement UserDetailsService to load user data. Write a JwtAuthenticationFilter that extends OncePerRequestFilter to extract and validate the Bearer token. Configure SecurityFilterChain to add the filter before UsernamePasswordAuthenticationFilter and configure which endpoints are public vs protected.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Spring Data JPA and how does it simplify database access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring Data JPA provides repository abstractions that eliminate boilerplate CRUD code. Extend JpaRepository<Entity, Id> to get save, findById, findAll, delete, and count for free. Define query methods by naming convention (e.g., findByEmailAndActiveTrue) and Spring generates the SQL automatically. Use @Query for custom JPQL or native SQL. Spring Data also supports pagination and sorting via Pageable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle exceptions globally in Spring Boot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use @ControllerAdvice (or @RestControllerAdvice) with @ExceptionHandler methods. Create a GlobalExceptionHandler class, annotate it with @RestControllerAdvice, and add methods annotated with @ExceptionHandler(SpecificException.class) returning ResponseEntity with appropriate HTTP status codes and error response bodies. This centralizes error handling instead of repeating try-catch blocks in every controller.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy a Spring Boot application with Docker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Build a JAR with mvn package or gradle build, then write a Dockerfile: use eclipse-temurin:21-jre as base, COPY the JAR, set ENTRYPOINT ["java","-jar","app.jar"]. For production use multi-stage builds — build stage uses maven:3.9-eclipse-temurin-21 to compile, runtime stage copies only the JAR. Spring Boot 3.1+ supports buildpacks natively: run ./mvnw spring-boot:build-image to create an OCI image without a Dockerfile.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'Spring Boot Complete Guide: REST APIs, JPA, Security & Docker in 2026',
    description:
      'Master Spring Boot from scratch with this comprehensive guide. Learn auto-configuration, Spring MVC REST APIs, Spring Data JPA, Spring Security with JWT, Spring Boot Actuator, testing with JUnit 5 and MockMvc, Docker deployment, and how Spring Boot compares to NestJS and Express.',
    tldr: 'Spring Boot is an opinionated Java framework that eliminates configuration boilerplate. Add starters to pom.xml, annotate your main class with @SpringBootApplication, and run. Use @RestController + @GetMapping/@PostMapping for REST APIs. Use JpaRepository for CRUD database access. Secure endpoints with spring-boot-starter-security. Monitor with Actuator (/actuator/health). Test with @SpringBootTest + MockMvc. Package as a fat JAR and run with java -jar app.jar.',
  },
  zh: {
    title: 'Spring Boot 完整指南：2026 年 REST API、JPA、Security 与 Docker',
    description:
      '从零开始掌握 Spring Boot。本教程涵盖自动配置、Spring MVC REST API、Spring Data JPA、Spring Security（JWT）、Spring Boot Actuator、JUnit 5 和 MockMvc 测试、Docker 部署，以及 Spring Boot 与 NestJS、Express 的对比分析。',
    tldr: 'Spring Boot 是一个固执己见的 Java 框架，消除了配置样板代码。在 pom.xml 中添加 starter，用 @SpringBootApplication 注解主类并运行即可。使用 @RestController + @GetMapping/@PostMapping 构建 REST API，使用 JpaRepository 进行 CRUD 数据库访问，使用 spring-boot-starter-security 保护端点，使用 Actuator（/actuator/health）监控应用，使用 @SpringBootTest + MockMvc 测试，打包为 fat JAR 后通过 java -jar app.jar 运行。',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Spring Boot Quick Reference
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.en.tldr}
        </p>
      </div>

      <h2>What Is Spring Boot?</h2>
      <p>
        <strong>Spring Boot</strong> is an opinionated, convention-over-configuration framework built on top of the{' '}
        <strong>Spring Framework</strong> that makes it easy to create stand-alone, production-grade Java applications.
        Released in 2014 by Pivotal (now VMware Tanzu), Spring Boot dramatically reduces the boilerplate configuration
        that made classic Spring development verbose.
      </p>
      <p>
        The core philosophy of Spring Boot is: <em>sensible defaults</em>. If you add{' '}
        <code>spring-boot-starter-web</code> to your project, Spring Boot automatically configures an embedded Tomcat
        server, sets up Spring MVC, configures JSON serialization with Jackson, and handles all the bean wiring — with
        zero XML configuration required.
      </p>
      <p>
        As of 2026, Spring Boot 3.x (requiring Java 17+) is the current major version, bringing native compilation
        support via GraalVM, improved observability, and full Jakarta EE 10 compatibility. It powers applications at
        Netflix, Airbnb, LinkedIn, and thousands of enterprises worldwide.
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Spring Boot auto-configures beans based on classpath dependencies — no XML required.</li>
          <li>Starters bundle compatible library versions: <code>spring-boot-starter-web</code>, <code>spring-boot-starter-data-jpa</code>, etc.</li>
          <li><code>@SpringBootApplication</code> combines <code>@Configuration</code>, <code>@EnableAutoConfiguration</code>, and <code>@ComponentScan</code>.</li>
          <li>Dependency injection uses constructor injection by default; <code>@Autowired</code> is optional for single-constructor beans.</li>
          <li>Spring Data JPA repositories eliminate CRUD boilerplate — extend <code>JpaRepository</code> to get 15+ methods for free.</li>
          <li>Spring Security integrates JWT and OAuth2; configure with <code>SecurityFilterChain</code> beans.</li>
          <li>Actuator exposes health, metrics, and management endpoints at <code>/actuator/*</code>.</li>
          <li>Package as a fat JAR and deploy anywhere Java runs — or containerize with Docker.</li>
        </ul>
      </div>

      <h2>Spring Boot vs Spring Framework</h2>
      <p>
        Understanding the difference between Spring Framework and Spring Boot is essential before diving in.
      </p>
      <pre><code className="language-text">{`Spring Framework (2002):
  - Core container: IoC / DI
  - Spring MVC: web layer
  - Spring Data: data access
  - Spring Security: authentication/authorization
  - Spring AOP: aspect-oriented programming
  - Requires manual configuration of beans, XML or @Configuration classes
  - You must choose and wire compatible library versions yourself

Spring Boot (2014):
  - Built ON TOP of Spring Framework
  - Auto-configuration: detects classpath and configures beans automatically
  - Starter dependencies: curated, version-compatible bundles
  - Embedded servers: Tomcat/Jetty/Undertow — no WAR deployment needed
  - Production-ready: Actuator metrics, health, info endpoints
  - Opinionated defaults you can override when needed`}</code></pre>

      <h2>Getting Started: Project Setup</h2>
      <p>
        The easiest way to bootstrap a Spring Boot project is <strong>Spring Initializr</strong> at{' '}
        <a href="https://start.spring.io" target="_blank" rel="noopener noreferrer">start.spring.io</a>.
        Choose your build tool (Maven or Gradle), Java version, and add dependencies.
      </p>
      <pre><code className="language-xml">{`<!-- pom.xml — Maven Spring Boot project -->
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.2.3</version>
</parent>

<dependencies>
  <!-- Web: Spring MVC + Embedded Tomcat + Jackson -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <!-- JPA: Hibernate + Spring Data JPA -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <!-- Security: Spring Security -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>

  <!-- Actuator: health, metrics, info -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
  </dependency>

  <!-- Database driver (PostgreSQL) -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>

  <!-- Validation -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>

  <!-- Testing -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>`}</code></pre>

      <p>The main application class:</p>
      <pre><code className="language-java">{`// src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// Equivalent to:
//   @Configuration          — marks this as a bean source
//   @EnableAutoConfiguration — enables Spring Boot auto-config
//   @ComponentScan          — scans current package and sub-packages
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`}</code></pre>

      <pre><code className="language-bash">{`# Run the application
./mvnw spring-boot:run

# Or build and run the JAR
./mvnw package
java -jar target/demo-0.0.1-SNAPSHOT.jar

# Application starts on http://localhost:8080`}</code></pre>

      <h2>Dependency Injection: @Component, @Service, @Repository, @Autowired</h2>
      <p>
        Spring&apos;s IoC (Inversion of Control) container manages object creation and wiring. You mark classes
        with stereotype annotations so Spring can discover and inject them.
      </p>

      <h3>Stereotype Annotations</h3>
      <pre><code className="language-java">{`// @Component — generic Spring-managed bean
@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email.contains("@");
    }
}

// @Service — business logic layer
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailValidator emailValidator;

    // Constructor injection (recommended — no @Autowired needed)
    public UserService(UserRepository userRepository,
                       EmailValidator emailValidator) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
    }

    public User createUser(String email, String name) {
        if (!emailValidator.isValid(email)) {
            throw new IllegalArgumentException("Invalid email: " + email);
        }
        User user = new User(email, name);
        return userRepository.save(user);
    }
}

// @Repository — data access layer (adds exception translation)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}`}</code></pre>

      <h3>Field Injection vs Constructor Injection</h3>
      <pre><code className="language-java">{`// ❌ Field injection — harder to test, hides dependencies
@Service
public class BadService {
    @Autowired
    private UserRepository userRepository; // avoid this
}

// ✅ Constructor injection — explicit, testable, immutable
@Service
public class GoodService {
    private final UserRepository userRepository;

    public GoodService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

// ✅ Lombok + constructor injection (recommended in modern projects)
@Service
@RequiredArgsConstructor  // generates constructor for all final fields
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
}`}</code></pre>

      <h3>@Bean and @Configuration</h3>
      <pre><code className="language-java">{`// Define beans programmatically in @Configuration classes
@Configuration
public class AppConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    @Profile("production")  // only active in production profile
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
}`}</code></pre>

      <h2>Spring MVC: Controllers, RequestMapping, and REST APIs</h2>
      <p>
        Spring MVC provides the web layer. <code>@RestController</code> combines <code>@Controller</code> and{' '}
        <code>@ResponseBody</code>, meaning every method returns data serialized directly to the response body (JSON
        by default) rather than rendering a view template.
      </p>

      <h3>Basic REST Controller</h3>
      <pre><code className="language-java">{`package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")  // base path for all methods
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/v1/users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    // GET /api/v1/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    // POST /api/v1/users
    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDto created = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/v1/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    // DELETE /api/v1/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // GET /api/v1/users/search?email=foo@bar.com&active=true
    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(
            @RequestParam String email,
            @RequestParam(defaultValue = "true") boolean active) {
        return ResponseEntity.ok(userService.search(email, active));
    }
}`}</code></pre>

      <h3>Request and Response DTOs with Validation</h3>
      <pre><code className="language-java">{`// Request DTO with Bean Validation
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    private String name;

    @NotBlank
    @Email(message = "Must be a valid email address")
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    // Lombok: @Getter @Setter @NoArgsConstructor or use Java records
    // Getters, setters...
}

// Response DTO (never expose entity directly)
public record UserDto(Long id, String name, String email, LocalDateTime createdAt) {}

// Validation error response — handled globally by @ControllerAdvice
// Returns HTTP 400 with field-level error messages`}</code></pre>

      <h2>Configuration: application.yml and Profiles</h2>
      <p>
        Spring Boot reads configuration from <code>application.properties</code> or{' '}
        <code>application.yml</code>. YAML is preferred for its readability and support for nested properties.
        Profiles allow environment-specific configuration.
      </p>

      <pre><code className="language-yaml">{`# src/main/resources/application.yml
spring:
  application:
    name: my-spring-app

  datasource:
    url: \${DATABASE_URL:jdbc:postgresql://localhost:5432/mydb}
    username: \${DB_USERNAME:postgres}
    password: \${DB_PASSWORD:secret}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2

  jpa:
    hibernate:
      ddl-auto: validate         # never use create/create-drop in production
    show-sql: false
    open-in-view: false          # recommended: disable OSIV

  security:
    jwt:
      secret: \${JWT_SECRET:change-this-in-production}
      expiration: 86400000       # 24 hours in ms

server:
  port: 8080
  servlet:
    context-path: /

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized

logging:
  level:
    com.example.demo: DEBUG
    org.springframework.security: INFO`}</code></pre>

      <pre><code className="language-yaml">{`# src/main/resources/application-dev.yml
# Active with: spring.profiles.active=dev
spring:
  datasource:
    url: jdbc:h2:mem:testdb    # in-memory H2 for development
  jpa:
    hibernate:
      ddl-auto: create-drop    # recreate schema on restart
    show-sql: true

logging:
  level:
    com.example.demo: TRACE`}</code></pre>

      <pre><code className="language-yaml">{`# src/main/resources/application-prod.yml
# Active with: SPRING_PROFILES_ACTIVE=prod
spring:
  jpa:
    hibernate:
      ddl-auto: validate
  datasource:
    hikari:
      maximum-pool-size: 20

management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus`}</code></pre>

      <pre><code className="language-java">{`// Inject configuration values
@Service
public class JwtService {

    @Value("\${spring.security.jwt.secret}")
    private String jwtSecret;

    @Value("\${spring.security.jwt.expiration}")
    private long jwtExpiration;

    // Or use @ConfigurationProperties for grouped config
}

// Typed configuration with @ConfigurationProperties
@ConfigurationProperties(prefix = "spring.security.jwt")
@Component
public class JwtProperties {
    private String secret;
    private long expiration;
    // getters and setters
}`}</code></pre>

      <h2>Spring Data JPA and Repositories</h2>
      <p>
        Spring Data JPA eliminates boilerplate database code. Define your entity with JPA annotations and extend
        <code> JpaRepository</code> to get dozens of CRUD and query operations automatically.
      </p>

      <h3>JPA Entity</h3>
      <pre><code className="language-java">{`package com.example.demo.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "users",
    uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;  // always store hashed!

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    @Column(nullable = false)
    private boolean active = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    // constructors, getters, setters...
}

public enum UserRole {
    USER, ADMIN, MODERATOR
}`}</code></pre>

      <h3>Repository Interface</h3>
      <pre><code className="language-java">{`package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
import java.util.List;

// JpaRepository<Entity, PrimaryKey> provides:
// save(), findById(), findAll(), deleteById(), count(), existsById(), etc.
public interface UserRepository extends JpaRepository<User, Long> {

    // Query by convention — Spring generates SQL automatically
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByActiveTrue();

    List<User> findByRoleOrderByCreatedAtDesc(UserRole role);

    // Pagination and sorting
    Page<User> findByActive(boolean active, Pageable pageable);

    // Custom JPQL query
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = true")
    Optional<User> findActiveUserByEmail(@Param("email") String email);

    // Native SQL query
    @Query(value = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'",
           nativeQuery = true)
    List<User> findRecentUsers();

    // Modifying query
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.id = :id")
    int deactivateUser(@Param("id") Long id);
}`}</code></pre>

      <h3>Service Layer with JPA</h3>
      <pre><code className="language-java">{`@Service
@Transactional(readOnly = true)  // default: read-only transactions
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<UserDto> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return userRepository.findAll(pageable).map(this::toDto);
    }

    public UserDto findById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        return toDto(user);
    }

    @Transactional  // write transaction
    public UserDto create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already registered: " + request.getEmail());
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return toDto(userRepository.save(user));
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt());
    }
}`}</code></pre>

      <h2>Exception Handling: @ControllerAdvice and @ExceptionHandler</h2>
      <p>
        Centralize exception handling with <code>@RestControllerAdvice</code>. This eliminates try-catch blocks
        in controllers and ensures consistent error response format across the entire API.
      </p>
      <pre><code className="language-java">{`package com.example.demo.exception;

// Custom exception classes
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}

// Error response body
public record ApiError(
    int status,
    String error,
    String message,
    String path,
    LocalDateTime timestamp
) {}

// Global exception handler
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        log.warn("Resource not found: {}", ex.getMessage());
        ApiError error = new ApiError(
            404, "Not Found", ex.getMessage(),
            request.getRequestURI(), LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiError> handleConflict(
            ConflictException ex, HttpServletRequest request) {
        ApiError error = new ApiError(
            409, "Conflict", ex.getMessage(),
            request.getRequestURI(), LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    // Handle @Valid validation failures
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            fieldErrors.put(error.getField(), error.getDefaultMessage())
        );
        Map<String, Object> body = Map.of(
            "status", 400,
            "error", "Validation Failed",
            "fields", fieldErrors,
            "timestamp", LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(body);
    }

    // Catch-all for unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneral(
            Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception", ex);
        ApiError error = new ApiError(
            500, "Internal Server Error", "An unexpected error occurred",
            request.getRequestURI(), LocalDateTime.now()
        );
        return ResponseEntity.internalServerError().body(error);
    }
}`}</code></pre>

      <h2>Spring Security: JWT Authentication</h2>
      <p>
        Spring Security 6 (Spring Boot 3) uses a lambda-based <code>SecurityFilterChain</code> configuration.
        The older <code>WebSecurityConfigurerAdapter</code> is removed. Here is a complete JWT setup:
      </p>

      <h3>JWT Utility Class</h3>
      <pre><code className="language-java">{`// Add to pom.xml: io.jsonwebtoken:jjwt-api:0.12.3 + jjwt-impl + jjwt-jackson
@Component
public class JwtUtil {

    @Value("\${spring.security.jwt.secret}")
    private String secretKey;

    @Value("\${spring.security.jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .subject(userDetails.getUsername())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getExpiration()
            .before(new Date());
    }
}`}</code></pre>

      <h3>JWT Authentication Filter</h3>
      <pre><code className="language-java">{`@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);  // remove "Bearer "
        final String username = jwtUtil.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}`}</code></pre>

      <h3>Security Configuration</h3>
      <pre><code className="language-java">{`@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // stateless API — no CSRF needed
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}

// Auth Controller — login and register
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}`}</code></pre>

      <h2>Spring Boot Actuator and Monitoring</h2>
      <p>
        Spring Boot Actuator provides production-ready endpoints for health checks, metrics, environment info, and
        more. It integrates natively with Prometheus and Micrometer for cloud-native observability.
      </p>
      <pre><code className="language-yaml">{`# application.yml — Actuator configuration
management:
  endpoints:
    web:
      base-path: /actuator
      exposure:
        include: health,info,metrics,prometheus,env,loggers,threaddump
  endpoint:
    health:
      show-details: when-authorized
      show-components: always
  info:
    env:
      enabled: true
    git:
      mode: full

info:
  app:
    name: \${spring.application.name}
    version: "@project.version@"
    java-version: "@java.version@"`}</code></pre>

      <pre><code className="language-bash">{`# Available Actuator endpoints
GET /actuator/health        # {"status":"UP","components":{...}}
GET /actuator/info          # application info, git info
GET /actuator/metrics       # list available metrics
GET /actuator/metrics/jvm.memory.used  # specific metric
GET /actuator/prometheus    # Prometheus-format metrics
GET /actuator/env           # environment properties
GET /actuator/loggers       # current log levels
POST /actuator/loggers/com.example  # change log level at runtime
GET /actuator/threaddump    # current thread dump`}</code></pre>

      <pre><code className="language-java">{`// Custom health indicator
@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    private final DataSource dataSource;

    public DatabaseHealthIndicator(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Health health() {
        try (Connection conn = dataSource.getConnection()) {
            return Health.up()
                .withDetail("database", conn.getMetaData().getDatabaseProductName())
                .withDetail("url", conn.getMetaData().getURL())
                .build();
        } catch (SQLException e) {
            return Health.down().withException(e).build();
        }
    }
}

// Custom metrics with Micrometer
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MeterRegistry meterRegistry;
    private final Counter orderCreatedCounter;

    public OrderService(MeterRegistry registry) {
        this.meterRegistry = registry;
        this.orderCreatedCounter = Counter.builder("orders.created")
            .description("Total orders created")
            .register(registry);
    }

    public Order createOrder(CreateOrderRequest request) {
        Order order = processOrder(request);
        orderCreatedCounter.increment();
        meterRegistry.gauge("orders.pending", getPendingOrderCount());
        return order;
    }
}`}</code></pre>

      <h2>Testing with JUnit 5 and MockMvc</h2>
      <p>
        Spring Boot provides excellent testing support out of the box. Use <code>@SpringBootTest</code> for
        integration tests and <code>@WebMvcTest</code> for controller slice tests with MockMvc.
      </p>

      <h3>Unit Testing with Mockito</h3>
      <pre><code className="language-java">{`// Pure unit test — no Spring context, fast
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_Success() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("Alice", "alice@example.com", "password123");
        User savedUser = new User(1L, "Alice", "alice@example.com", "hashed");

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        UserDto result = userService.create(request);

        // Assert
        assertThat(result.name()).isEqualTo("Alice");
        assertThat(result.email()).isEqualTo("alice@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUser_DuplicateEmail_ThrowsConflict() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("Alice", "alice@example.com", "password123");
        when(userRepository.existsByEmail("alice@example.com")).thenReturn(true);

        // Act + Assert
        assertThatThrownBy(() -> userService.create(request))
            .isInstanceOf(ConflictException.class)
            .hasMessageContaining("alice@example.com");
    }
}`}</code></pre>

      <h3>Controller Tests with MockMvc</h3>
      <pre><code className="language-java">{`// Slice test — only loads web layer (fast)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)  // disable security for unit tests
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void getUser_ExistingId_Returns200() throws Exception {
        UserDto user = new UserDto(1L, "Alice", "alice@example.com", LocalDateTime.now());
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Alice"))
            .andExpect(jsonPath("$.email").value("alice@example.com"));
    }

    @Test
    void getUser_NotFound_Returns404() throws Exception {
        when(userService.findById(999L))
            .thenThrow(new ResourceNotFoundException("User not found: 999"));

        mockMvc.perform(get("/api/v1/users/999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void createUser_ValidRequest_Returns201() throws Exception {
        CreateUserRequest request = new CreateUserRequest("Bob", "bob@example.com", "password123");
        UserDto created = new UserDto(2L, "Bob", "bob@example.com", LocalDateTime.now());
        when(userService.create(any())).thenReturn(created);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(2L));
    }

    @Test
    void createUser_InvalidEmail_Returns400() throws Exception {
        CreateUserRequest request = new CreateUserRequest("Bob", "not-an-email", "pass");

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.fields.email").exists());
    }
}`}</code></pre>

      <h3>Integration Tests with @SpringBootTest</h3>
      <pre><code className="language-java">{`// Full Spring context + embedded H2 database
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Transactional  // rollback after each test
class UserIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    void createAndFetchUser_FullFlow() {
        // Create
        CreateUserRequest request = new CreateUserRequest("Carol", "carol@test.com", "password123");
        ResponseEntity<UserDto> createResponse = restTemplate.postForEntity(
            "/api/v1/users", request, UserDto.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Long userId = createResponse.getBody().id();

        // Fetch
        ResponseEntity<UserDto> getResponse = restTemplate.getForEntity(
            "/api/v1/users/" + userId, UserDto.class);

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody().email()).isEqualTo("carol@test.com");
    }
}

// Run tests
// ./mvnw test                          — run all tests
// ./mvnw test -pl :users-service       — run specific module
// ./mvnw verify                        — run tests + integration tests
// ./mvnw test -Dtest=UserServiceTest   — run specific test class`}</code></pre>

      <h2>Docker Deployment with Spring Boot</h2>
      <p>
        Spring Boot applications package as executable fat JARs, making Docker deployment straightforward.
        Spring Boot 3.1+ also supports buildpacks natively for creating optimized OCI images without a Dockerfile.
      </p>

      <h3>Multi-stage Dockerfile</h3>
      <pre><code className="language-dockerfile">{`# Multi-stage build: compile in full JDK, run in slim JRE
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app

# Cache Maven dependencies separately
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Build the application
COPY src ./src
RUN mvn package -DskipTests -q

# Stage 2: Extract layers for better caching (Spring Boot layered JARs)
FROM eclipse-temurin:21-jre AS extractor
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# Stage 3: Final runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy extracted layers (most stable first for layer caching)
COPY --from=extractor /app/dependencies/ ./
COPY --from=extractor /app/spring-boot-loader/ ./
COPY --from=extractor /app/snapshot-dependencies/ ./
COPY --from=extractor /app/application/ ./

# Non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "org.springframework.boot.loader.launch.JarLauncher"]`}</code></pre>

      <h3>Docker Compose for Local Development</h3>
      <pre><code className="language-yaml">{`# docker-compose.yml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: docker
      DATABASE_URL: jdbc:postgresql://db:5432/mydb
      DB_USERNAME: postgres
      DB_PASSWORD: secret
      JWT_SECRET: my-docker-jwt-secret-change-in-prod
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:`}</code></pre>

      <pre><code className="language-bash">{`# Build image without Dockerfile (Spring Boot Buildpacks)
./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=myapp:latest

# Run with Docker Compose
docker compose up -d

# View logs
docker compose logs -f app

# Scale the app service
docker compose up -d --scale app=3`}</code></pre>

      <h2>Spring Boot vs NestJS vs Express: Framework Comparison</h2>
      <p>
        Choosing between Spring Boot, NestJS, and Express depends on your team, language preference, and application
        requirements. Here is a comprehensive side-by-side comparison:
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Spring Boot</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>NestJS</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Express.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Language</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Java / Kotlin</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>TypeScript / JavaScript</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>JavaScript / TypeScript</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Architecture</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Opinionated, annotation-driven</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Opinionated, decorator-driven</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Minimal, unopinionated</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Performance</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>High (JVM JIT); slow startup without GraalVM</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Good (Node.js event loop)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Fast startup, high RPS for I/O</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>DI Container</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Built-in (mature, powerful)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Built-in (inspired by Angular)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>None (use InversifyJS manually)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Database ORM</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Spring Data JPA / Hibernate</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>TypeORM, Prisma, Mongoose</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Prisma, Sequelize, Knex</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Auth</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Spring Security (JWT, OAuth2)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>@nestjs/passport + JWT</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Passport.js, custom middleware</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Testing</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>JUnit 5, MockMvc, Mockito</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Jest, Supertest</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Jest, Mocha, Supertest</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Learning Curve</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Steep (Java + Spring ecosystem)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Moderate (TypeScript + decorators)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Low (minimal abstractions)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Enterprise Adoption</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Very High (banking, fintech, large corps)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Growing (startups to mid-size)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>High (microservices, BFFs)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Microservices</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Spring Cloud ecosystem (Eureka, Gateway, Config)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Built-in microservice transports</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Manual setup with libraries</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}><strong>Best For</strong></td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Enterprise apps, Java teams, complex domains</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>TypeScript full-stack teams, structured APIs</td>
              <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0' }}>Simple APIs, prototypes, microservices</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Spring Boot Profiles and Environment-Specific Configuration</h2>
      <p>
        Spring Profiles allow beans and configuration to be activated conditionally based on the active environment.
        This is essential for managing dev, staging, and production configurations.
      </p>
      <pre><code className="language-java">{`// @Profile — bean only active in specific profiles
@Configuration
@Profile("dev")
public class DevDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        // Seed test data in development only
        if (userRepository.count() == 0) {
            userRepository.save(new User("Admin", "admin@dev.local", "admin123", UserRole.ADMIN));
        }
    }
}

// @ConditionalOnProperty — activate based on property value
@Bean
@ConditionalOnProperty(name = "feature.email-notifications", havingValue = "true")
public EmailNotificationService emailNotificationService() {
    return new SmtpEmailService();
}

@Bean
@ConditionalOnMissingBean(EmailNotificationService.class)
public EmailNotificationService noopEmailService() {
    return new NoopEmailService();  // fallback when email disabled
}`}</code></pre>

      <pre><code className="language-bash">{`# Activate profiles
# Option 1: application.yml
spring.profiles.active: prod

# Option 2: Environment variable (recommended for Docker/K8s)
SPRING_PROFILES_ACTIVE=prod java -jar app.jar

# Option 3: Command line argument
java -jar app.jar --spring.profiles.active=prod

# Option 4: Multiple profiles
java -jar app.jar --spring.profiles.active=prod,aws`}</code></pre>

      <h2>Summary and Next Steps</h2>
      <p>
        Spring Boot remains the dominant Java backend framework in 2026, powering applications from simple REST
        APIs to complex distributed systems with Spring Cloud. Its combination of convention-over-configuration,
        a mature ecosystem, battle-tested security model, and first-class testing support make it the go-to choice
        for enterprise Java development.
      </p>
      <p>
        From here, explore the Spring ecosystem further: <strong>Spring Cloud Gateway</strong> for API gateways,{' '}
        <strong>Spring Batch</strong> for bulk data processing, <strong>Spring WebFlux</strong> for reactive
        applications with Project Reactor, and <strong>Spring Cloud</strong> for microservices patterns like
        service discovery (Eureka), distributed configuration (Config Server), and circuit breakers (Resilience4j).
      </p>
    </>
  );
}

function ChineseContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Spring Boot 快速参考
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.zh.tldr}
        </p>
      </div>

      <h2>什么是 Spring Boot？</h2>
      <p>
        <strong>Spring Boot</strong> 是基于 <strong>Spring Framework</strong> 构建的固执己见的 Java 框架，
        让创建独立的、生产级 Java 应用变得极为简单。Spring Boot 的核心理念是"合理的默认值"——
        当你添加 <code>spring-boot-starter-web</code> 时，它会自动配置嵌入式 Tomcat、Spring MVC 和 JSON 序列化，
        无需任何 XML 配置。
      </p>
      <p>
        Spring Boot 3.x（需要 Java 17+）是当前主版本，带来了通过 GraalVM 的原生编译支持、改进的可观测性以及
        完整的 Jakarta EE 10 兼容性。它为 Netflix、Airbnb、LinkedIn 以及全球数千家企业提供支持。
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Spring Boot 根据类路径依赖自动配置 Bean，无需 XML。</li>
          <li>Starters 捆绑兼容的库版本：<code>spring-boot-starter-web</code>、<code>spring-boot-starter-data-jpa</code> 等。</li>
          <li><code>@SpringBootApplication</code> 组合了 <code>@Configuration</code>、<code>@EnableAutoConfiguration</code> 和 <code>@ComponentScan</code>。</li>
          <li>依赖注入优先使用构造函数注入；单构造函数 Bean 的 <code>@Autowired</code> 是可选的。</li>
          <li>Spring Data JPA 仓库消除了 CRUD 样板代码——继承 <code>JpaRepository</code> 即可免费获得 15+ 个方法。</li>
          <li>Spring Security 集成 JWT 和 OAuth2；使用 <code>SecurityFilterChain</code> Bean 进行配置。</li>
          <li>Actuator 在 <code>/actuator/*</code> 暴露健康、指标和管理端点。</li>
          <li>打包为 fat JAR 可部署到任何 Java 运行环境，或使用 Docker 容器化。</li>
        </ul>
      </div>

      <h2>依赖注入：@Component、@Service、@Repository、@Autowired</h2>
      <p>
        Spring 的 IoC（控制反转）容器管理对象的创建和装配。使用注解标记类，Spring 就可以发现并注入它们。
      </p>
      <pre><code className="language-java">{`// @Component — 通用 Spring 托管 Bean
@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email.contains("@");
    }
}

// @Service — 业务逻辑层
@Service
public class UserService {
    private final UserRepository userRepository;

    // 构造函数注入（推荐）
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

// @Repository — 数据访问层（自动异常转换）
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}`}</code></pre>

      <h2>Spring MVC：控制器与 REST API</h2>
      <p>
        <code>@RestController</code> 组合了 <code>@Controller</code> 和 <code>@ResponseBody</code>，
        所有方法返回的数据会直接序列化为 JSON 响应体。
      </p>
      <pre><code className="language-java">{`@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}`}</code></pre>

      <h2>Spring Data JPA</h2>
      <p>
        定义带 JPA 注解的实体，继承 <code>JpaRepository</code>，
        即可零代码获得完整的 CRUD 操作和分页排序功能。
      </p>
      <pre><code className="language-java">{`@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @CreationTimestamp
    private LocalDateTime createdAt;
    // 构造函数、getter、setter...
}

// 仓库接口 — Spring 自动生成实现
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByActiveTrue();
    Page<User> findAll(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(@Param("role") UserRole role);
}`}</code></pre>

      <h2>全局异常处理</h2>
      <p>
        使用 <code>@RestControllerAdvice</code> 集中处理异常，
        避免在每个控制器中重复 try-catch 代码块。
      </p>
      <pre><code className="language-java">{`@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        ApiError error = new ApiError(
            404, "Not Found", ex.getMessage(),
            request.getRequestURI(), LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            fieldErrors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(Map.of(
            "status", 400,
            "fields", fieldErrors
        ));
    }
}`}</code></pre>

      <h2>Spring Security 与 JWT</h2>
      <p>
        Spring Security 6 使用基于 Lambda 的 <code>SecurityFilterChain</code> 配置。
        实现 JWT 认证需要：JWT 工具类、认证过滤器、安全配置以及认证控制器。
      </p>
      <pre><code className="language-java">{`@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
            JwtAuthFilter jwtAuthFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}`}</code></pre>

      <h2>Spring Boot Actuator 监控</h2>
      <p>
        Actuator 提供生产就绪的端点，用于健康检查、指标、环境信息等，
        并与 Prometheus 和 Micrometer 原生集成。
      </p>
      <pre><code className="language-bash">{`# 常用 Actuator 端点
GET /actuator/health         # 健康状态
GET /actuator/info           # 应用信息
GET /actuator/metrics        # 所有指标列表
GET /actuator/prometheus     # Prometheus 格式指标
GET /actuator/env            # 环境属性
GET /actuator/loggers        # 当前日志级别`}</code></pre>

      <h2>测试：JUnit 5 与 MockMvc</h2>
      <pre><code className="language-java">{`// 控制器切片测试 — 只加载 Web 层
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getUser_返回200() throws Exception {
        UserDto user = new UserDto(1L, "张三", "zhang@example.com", LocalDateTime.now());
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/v1/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("张三"));
    }
}`}</code></pre>

      <h2>Docker 部署</h2>
      <pre><code className="language-dockerfile">{`# 多阶段 Dockerfile
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn package -DskipTests -q

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "app.jar"]`}</code></pre>

      <h2>总结</h2>
      <p>
        Spring Boot 是 2026 年主流的 Java 后端框架，凭借自动配置、完善的生态系统、成熟的安全模型
        和完整的测试支持，成为企业 Java 开发的首选。
      </p>
      <p>
        进阶方向：<strong>Spring Cloud Gateway</strong>（API 网关）、<strong>Spring Batch</strong>（批量数据处理）、
        <strong>Spring WebFlux</strong>（响应式编程）以及 <strong>Spring Cloud</strong>（微服务模式：
        服务发现 Eureka、配置中心 Config Server、熔断器 Resilience4j）。
      </p>
    </>
  );
}

export default function SpringBootGuide({ lang = 'en' }: { lang?: string }) {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {lang === 'zh' ? <ChineseContent /> : <EnglishContent />}
    </div>
  );
}
