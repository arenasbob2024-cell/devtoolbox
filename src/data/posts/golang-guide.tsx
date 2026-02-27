'use client'

const translations = {
  en: {
    title: 'Go (Golang) Guide: Complete Tutorial for Backend Development',
    description:
      'Master Go programming from fundamentals to production-ready backend development. Learn goroutines, channels, REST APIs, testing, generics, and concurrency patterns with real code examples.',
    content: 'en',
  },
  zh: {
    title: 'Go (Golang) 指南：后端开发完整教程',
    description:
      '从基础到生产就绪的后端开发，全面掌握 Go 编程。学习 goroutine、channel、REST API、测试、泛型和并发模式，包含真实代码示例。',
    content: 'zh',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Go (Golang) and why should I use it for backend development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go is a statically typed, compiled language created by Google in 2009. It excels at backend development due to its built-in concurrency model (goroutines), fast compilation, simple syntax, and excellent standard library. It is ideal for microservices, APIs, CLI tools, and high-performance systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between goroutines and threads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Goroutines are lightweight user-space threads managed by the Go runtime. They start with only ~2KB of stack space (vs ~1MB for OS threads), can number in the millions, and are multiplexed onto OS threads automatically. This makes concurrent Go programs extremely memory-efficient.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does error handling work in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go uses explicit error returns rather than exceptions. Functions return (value, error) pairs. Callers check if error != nil and handle it. Use fmt.Errorf with %w to wrap errors, errors.Is for sentinel error comparison, and errors.As for type assertion on errors.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Go interfaces and how does duck typing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go interfaces are satisfied implicitly — if a type implements all methods of an interface, it automatically satisfies it without explicit declaration. This is called structural typing (duck typing). It promotes loose coupling and makes testing with mocks very easy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Go channels work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Channels are typed conduits for communication between goroutines. Unbuffered channels block until both sender and receiver are ready. Buffered channels (make(chan T, n)) can hold n values before blocking. Use select to handle multiple channels. Close channels to signal completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Go module system and how do I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go modules (introduced in Go 1.11) manage dependencies using go.mod and go.sum files. Initialize with "go mod init module-name", add dependencies with "go get package@version", and tidy with "go mod tidy". Modules replace the old GOPATH-based workflow.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use Go generics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Go generics (introduced in 1.18) when you need type-safe data structures or algorithms that work across multiple types without code duplication. Common use cases include generic collections (stacks, queues, maps), utility functions (Map, Filter, Reduce), and constraint-based APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Go compare to Node.js and Python for backend development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go is faster and more memory-efficient than both Node.js and Python, with true parallelism via goroutines. Node.js has a larger ecosystem and is better for real-time apps. Python excels in data science and ML. Go is the best choice for high-performance APIs, microservices, and systems programming.',
      },
    },
  ],
}

const enContent = (
  <article>
    {/* TL;DR Box */}
    <div
      style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
        TL;DR — Go in 60 Seconds
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
        <li>Go is a compiled, statically typed language optimized for simplicity and performance</li>
        <li>Goroutines and channels enable elegant, efficient concurrency</li>
        <li>Built-in tooling: <code>go build</code>, <code>go test</code>, <code>go fmt</code>, <code>go vet</code></li>
        <li>Explicit error handling — no exceptions, just <code>(value, error)</code> returns</li>
        <li>Interfaces are satisfied implicitly — duck typing without the overhead</li>
        <li>Generics available since Go 1.18 for type-safe reusable code</li>
        <li>Ideal for REST APIs, microservices, CLI tools, and systems programming</li>
      </ul>
    </div>

    {/* Introduction */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0', marginBottom: '16px', color: '#1e293b' }}>
      Introduction to Go
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go (often called Golang) was designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson and released publicly
      in 2009. It was created to solve real engineering problems: slow compilation, complex dependency management, and the
      difficulty of writing safe concurrent programs in C++ and Java.
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Today, Go powers some of the most critical infrastructure on the internet — Docker, Kubernetes, Terraform, InfluxDB,
      CockroachDB, and countless microservices at Google, Cloudflare, Dropbox, and Uber. Its combination of performance
      close to C, developer ergonomics close to Python, and a world-class concurrency model makes it the language of choice
      for modern backend development.
    </p>

    {/* Key Takeaways */}
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.05rem', color: '#334155', display: 'block', marginBottom: '12px' }}>
        Key Takeaways
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
        <li>Go compiles to native binaries — no runtime required for deployment</li>
        <li>The language spec fits on a single webpage and changes rarely</li>
        <li>Goroutines are ~1000x cheaper than OS threads</li>
        <li>The standard library covers HTTP servers, JSON, crypto, SQL, and much more</li>
        <li>Table-driven tests and the <code>testing</code> package make testing idiomatic</li>
        <li>Go modules provide reproducible, hermetic builds</li>
      </ul>
    </div>

    {/* Section 1: Go Fundamentals */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      1. Go Fundamentals: Packages, Imports, and the Main Function
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Every Go program is organized into packages. The <code>main</code> package is special — it defines a standalone
      executable. Packages are imported using their module path, and unused imports cause a compile error, keeping codebases
      clean.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"fmt"\n\t"math"\n\t"strings"\n)\n\nfunc main() {\n\t// fmt is the format package — print, scan, sprintf\n\tfmt.Println("Hello, Go!")\n\n\t// math functions\n\tfmt.Printf("Pi: %.4f\\n", math.Pi)\n\tfmt.Printf("Sqrt(16): %.0f\\n", math.Sqrt(16))\n\n\t// strings package\n\ts := strings.ToUpper("golang")\n\tfmt.Println(s) // GOLANG\n\n\t// Multiple return values\n\tq, r := divide(17, 5)\n\tfmt.Printf("17 / 5 = %d remainder %d\\n", q, r)\n}\n\nfunc divide(a, b int) (int, int) {\n\treturn a / b, a % b\n}'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Package Naming Conventions
    </h3>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Package names should be short, lowercase, and describe what the package provides. Avoid generic names like{' '}
      <code>util</code> or <code>common</code>. The package name is the last element of the import path by convention —{' '}
      <code>import "net/http"</code> uses <code>http.Get</code>.
    </p>

    {/* Section 2: Variables and Types */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      2. Variables and Types: var, :=, and Zero Values
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go is statically typed with strong type inference. There are two ways to declare variables: the verbose{' '}
      <code>var</code> form (useful at package scope or when the type must be explicit) and the short declaration operator{' '}
      <code>:=</code> (most common inside functions).
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport "fmt"\n\n// Package-level variables\nvar (\n\tappName = "myapp"\n\tversion = "1.0.0"\n\tdebug   bool // zero value: false\n)\n\nfunc main() {\n\t// Short declaration (most common)\n\tname := "Alice"\n\tage  := 30\n\tscore := 98.6\n\n\t// Explicit type declaration\n\tvar count int = 10\n\tvar pi float64 = 3.14159\n\n\t// Multiple assignment\n\tx, y := 1, 2\n\tx, y = y, x // swap!\n\n\t// Zero values (Go initializes everything)\n\tvar i int     // 0\n\tvar f float64 // 0.0\n\tvar b bool    // false\n\tvar s string  // ""\n\n\tfmt.Println(name, age, score)\n\tfmt.Println(count, pi)\n\tfmt.Println(x, y)\n\tfmt.Printf("Zeros: %d %f %v %q\\n", i, f, b, s)\n\n\t// Constants\n\tconst MaxRetries = 3\n\tconst (\n\t\tStatusOK    = 200\n\t\tStatusNotFound = 404\n\t\tStatusError = 500\n\t)\n\n\t// iota for enumerations\n\tconst (\n\t\tSmall = iota // 0\n\t\tMedium       // 1\n\t\tLarge        // 2\n\t)\n\tfmt.Println(Small, Medium, Large)\n\t_ = MaxRetries // suppress unused warning\n\t_ = StatusOK\n\t_ = StatusNotFound\n\t_ = StatusError\n}'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Basic Types Reference
    </h3>
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9rem',
        }}
      >
        <thead>
          <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
            <th style={{ padding: '10px 16px', textAlign: 'left', borderRadius: '4px 0 0 0' }}>Category</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Types</th>
            <th style={{ padding: '10px 16px', textAlign: 'left', borderRadius: '0 4px 0 0' }}>Zero Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Integers', 'int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64', '0'],
            ['Floats', 'float32, float64', '0.0'],
            ['Complex', 'complex64, complex128', '0+0i'],
            ['Boolean', 'bool', 'false'],
            ['String', 'string', '"" (empty string)'],
            ['Byte/Rune', 'byte (=uint8), rune (=int32)', '0'],
            ['Pointer', '*T', 'nil'],
            ['Slice', '[]T', 'nil'],
            ['Map', 'map[K]V', 'nil'],
            ['Channel', 'chan T', 'nil'],
            ['Interface', 'interface{}', 'nil'],
            ['Function', 'func(...)', 'nil'],
          ].map(([cat, types, zero], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
              <td style={{ padding: '9px 16px', fontWeight: '600', color: '#334155', borderBottom: '1px solid #e2e8f0' }}>{cat}</td>
              <td style={{ padding: '9px 16px', fontFamily: 'monospace', color: '#0369a1', borderBottom: '1px solid #e2e8f0' }}>{types}</td>
              <td style={{ padding: '9px 16px', fontFamily: 'monospace', color: '#7c3aed', borderBottom: '1px solid #e2e8f0' }}>{zero}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Section 3: Functions */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      3. Functions: Multiple Returns, Named Returns, Variadic, and Defer
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go functions are first-class values. Key features include multiple return values (eliminating the need for
      out-parameters or exceptions), named return values for documentation, variadic functions, and the powerful{' '}
      <code>defer</code> statement for cleanup logic.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\n// Multiple return values\nfunc minMax(nums []int) (int, int) {\n\tmin, max := nums[0], nums[0]\n\tfor _, n := range nums {\n\t\tif n < min {\n\t\t\tmin = n\n\t\t}\n\t\tif n > max {\n\t\t\tmax = n\n\t\t}\n\t}\n\treturn min, max\n}\n\n// Named return values (useful for documentation)\nfunc divide(a, b float64) (result float64, err error) {\n\tif b == 0 {\n\t\terr = errors.New("division by zero")\n\t\treturn // naked return uses named values\n\t}\n\tresult = a / b\n\treturn\n}\n\n// Variadic function\nfunc sum(nums ...int) int {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\n// Defer: runs when surrounding function returns\nfunc readFile(path string) error {\n\t// file, err := os.Open(path)\n\t// if err != nil { return err }\n\t// defer file.Close() // always runs, even on panic\n\tfmt.Println("Opening:", path)\n\tdefer fmt.Println("Closing:", path)\n\tfmt.Println("Reading:", path)\n\treturn nil\n}\n\n// Function as value\nfunc apply(nums []int, fn func(int) int) []int {\n\tresult := make([]int, len(nums))\n\tfor i, n := range nums {\n\t\tresult[i] = fn(n)\n\t}\n\treturn result\n}\n\nfunc main() {\n\tmin, max := minMax([]int{3, 1, 4, 1, 5, 9, 2, 6})\n\tfmt.Printf("min=%d max=%d\\n", min, max)\n\n\tres, err := divide(10, 3)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t} else {\n\t\tfmt.Printf("10/3 = %.4f\\n", res)\n\t}\n\n\tfmt.Println(sum(1, 2, 3, 4, 5)) // 15\n\tnums := []int{1, 2, 3}\n\tfmt.Println(sum(nums...)) // spread slice\n\n\t_ = readFile("data.txt")\n\n\tdoubled := apply([]int{1, 2, 3, 4}, func(n int) int {\n\t\treturn n * 2\n\t})\n\tfmt.Println(doubled) // [2 4 6 8]\n}'
      }</code>
    </pre>

    {/* Section 4: Structs and Interfaces */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      4. Structs and Interfaces: Embedding, Methods, and Duck Typing
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go uses composition over inheritance. Structs group related data, methods attach behavior to types, and interfaces
      define contracts satisfied implicitly. Struct embedding provides a form of inheritance without the complexity.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"fmt"\n\t"math"\n)\n\n// Struct definition\ntype Point struct {\n\tX, Y float64\n}\n\n// Method on Point (pointer receiver for mutation)\nfunc (p *Point) Scale(factor float64) {\n\tp.X *= factor\n\tp.Y *= factor\n}\n\n// Value receiver (does not mutate)\nfunc (p Point) Distance(q Point) float64 {\n\tdx := p.X - q.X\n\tdy := p.Y - q.Y\n\treturn math.Sqrt(dx*dx + dy*dy)\n}\n\nfunc (p Point) String() string {\n\treturn fmt.Sprintf("(%.2f, %.2f)", p.X, p.Y)\n}\n\n// Embedding: Circle embeds Point\ntype Circle struct {\n\tPoint  // embedded — promotes X, Y, Scale, Distance\n\tRadius float64\n}\n\nfunc (c Circle) Area() float64 {\n\treturn math.Pi * c.Radius * c.Radius\n}\n\n// Interface: implicitly satisfied\ntype Shape interface {\n\tArea() float64\n\tString() string\n}\n\n// Rectangle also satisfies Shape\ntype Rectangle struct {\n\tWidth, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n\treturn r.Width * r.Height\n}\n\nfunc (r Rectangle) String() string {\n\treturn fmt.Sprintf("Rect(%.1f x %.1f)", r.Width, r.Height)\n}\n\nfunc printShape(s Shape) {\n\tfmt.Printf("%s has area %.2f\\n", s, s.Area())\n}\n\nfunc main() {\n\tp := Point{3, 4}\n\tp.Scale(2)\n\tfmt.Println(p) // (6.00, 8.00)\n\n\tc := Circle{Point: Point{0, 0}, Radius: 5}\n\tfmt.Printf("Circle area: %.2f\\n", c.Area())\n\tfmt.Println(c.Distance(Point{3, 4})) // uses embedded Point method\n\n\tr := Rectangle{10, 5}\n\n\t// Both satisfy Shape without explicit declaration\n\tshapes := []Shape{c, r}\n\tfor _, s := range shapes {\n\t\tprintShape(s)\n\t}\n\n\t// Empty interface accepts any value\n\tvar any interface{} = 42\n\tany = "hello"\n\tany = p\n\t_ = any\n}'
      }</code>
    </pre>

    {/* Section 5: Goroutines and Channels */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      5. Goroutines and Channels: Concurrency the Go Way
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go's concurrency model is based on Communicating Sequential Processes (CSP). The mantra: <em>"Don't communicate by
      sharing memory; share memory by communicating."</em> Goroutines are cheap lightweight threads, and channels are typed
      pipes for safe data transfer between them.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"time"\n)\n\n// Unbuffered channel: sender blocks until receiver is ready\nfunc pingPong() {\n\tch := make(chan string)\n\n\tgo func() {\n\t\tch <- "ping"\n\t}()\n\n\tmsg := <-ch\n\tfmt.Println(msg) // ping\n}\n\n// Buffered channel: sender only blocks when buffer is full\nfunc buffered() {\n\tch := make(chan int, 3)\n\tch <- 1\n\tch <- 2\n\tch <- 3\n\t// ch <- 4 // would block! buffer full\n\n\tfmt.Println(<-ch) // 1\n\tfmt.Println(<-ch) // 2\n}\n\n// WaitGroup for synchronization\nfunc fanOut() {\n\tvar wg sync.WaitGroup\n\tresults := make(chan int, 5)\n\n\tfor i := 0; i < 5; i++ {\n\t\twg.Add(1)\n\t\tgo func(id int) {\n\t\t\tdefer wg.Done()\n\t\t\ttime.Sleep(time.Millisecond * 10)\n\t\t\tresults <- id * id\n\t\t}(i)\n\t}\n\n\t// Close channel when all goroutines done\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(results)\n\t}()\n\n\t// Range over closed channel\n\tfor r := range results {\n\t\tfmt.Println(r)\n\t}\n}\n\n// Select: handle multiple channels\nfunc selectDemo() {\n\tch1 := make(chan string)\n\tch2 := make(chan string)\n\ttimeout := time.After(100 * time.Millisecond)\n\n\tgo func() { time.Sleep(10 * time.Millisecond); ch1 <- "one" }()\n\tgo func() { time.Sleep(20 * time.Millisecond); ch2 <- "two" }()\n\n\tfor i := 0; i < 2; i++ {\n\t\tselect {\n\t\tcase msg1 := <-ch1:\n\t\t\tfmt.Println("Received:", msg1)\n\t\tcase msg2 := <-ch2:\n\t\t\tfmt.Println("Received:", msg2)\n\t\tcase <-timeout:\n\t\t\tfmt.Println("Timed out")\n\t\t\treturn\n\t\t}\n\t}\n}\n\nfunc main() {\n\tpingPong()\n\tbuffered()\n\tfanOut()\n\tselectDemo()\n}'
      }</code>
    </pre>

    {/* Section 6: Error Handling */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      6. Error Handling: The error Interface, Wrapping, and Sentinel Errors
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go treats errors as values. The built-in <code>error</code> interface has a single method:{' '}
      <code>Error() string</code>. This simplicity, combined with explicit error returns, makes error handling highly
      visible and forces developers to think about failure cases.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\n// Sentinel errors: predefined, comparable\nvar (\n\tErrNotFound   = errors.New("not found")\n\tErrUnauthorized = errors.New("unauthorized")\n)\n\n// Custom error type\ntype ValidationError struct {\n\tField   string\n\tMessage string\n}\n\nfunc (e *ValidationError) Error() string {\n\treturn fmt.Sprintf("validation error: %s — %s", e.Field, e.Message)\n}\n\n// Wrapping errors with %w (Go 1.13+)\nfunc findUser(id int) (string, error) {\n\tif id <= 0 {\n\t\treturn "", &ValidationError{Field: "id", Message: "must be positive"}\n\t}\n\tif id > 100 {\n\t\treturn "", fmt.Errorf("findUser(%d): %w", id, ErrNotFound)\n\t}\n\treturn fmt.Sprintf("user_%d", id), nil\n}\n\nfunc getProfile(id int) (string, error) {\n\tuser, err := findUser(id)\n\tif err != nil {\n\t\t// Wrap with additional context\n\t\treturn "", fmt.Errorf("getProfile: %w", err)\n\t}\n\treturn "Profile of " + user, nil\n}\n\nfunc main() {\n\t// Normal error check\n\tprofile, err := getProfile(42)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t} else {\n\t\tfmt.Println(profile)\n\t}\n\n\t// errors.Is: unwraps error chain\n\t_, err = getProfile(999)\n\tif errors.Is(err, ErrNotFound) {\n\t\tfmt.Println("Resource not found")\n\t}\n\n\t// errors.As: type assertion through chain\n\t_, err = getProfile(-1)\n\tvar valErr *ValidationError\n\tif errors.As(err, &valErr) {\n\t\tfmt.Printf("Field %q: %s\\n", valErr.Field, valErr.Message)\n\t}\n\n\t// Multi-error (Go 1.20+)\n\terr1 := errors.New("first error")\n\terr2 := errors.New("second error")\n\tcombined := errors.Join(err1, err2)\n\tfmt.Println(combined)\n}'
      }</code>
    </pre>

    {/* Section 7: Standard Library */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      7. Standard Library: net/http, encoding/json, os, io, context
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go's standard library is one of its greatest strengths. You can build production-ready HTTP servers, parse JSON,
      interact with the filesystem, and manage cancellation — all without any third-party dependencies.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"context"\n\t"encoding/json"\n\t"fmt"\n\t"net/http"\n\t"time"\n)\n\n// JSON serialization\ntype User struct {\n\tID        int    `json:"id"`\n\tName      string `json:"name"`\n\tEmail     string `json:"email,omitempty"`\n\tCreatedAt time.Time `json:"created_at"`\n}\n\nfunc jsonDemo() {\n\tuser := User{ID: 1, Name: "Alice", Email: "alice@example.com", CreatedAt: time.Now()}\n\n\t// Marshal to JSON\n\tdata, err := json.Marshal(user)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(string(data))\n\n\t// Unmarshal from JSON\n\tjsonStr := `{"id":2,"name":"Bob","created_at":"2024-01-01T00:00:00Z"}`\n\tvar u2 User\n\tif err := json.Unmarshal([]byte(jsonStr), &u2); err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Printf("User: %+v\\n", u2)\n}\n\n// HTTP server with context\nfunc httpDemo() {\n\tmux := http.NewServeMux()\n\n\tmux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {\n\t\t// Go 1.22+ pattern matching\n\t\tid := r.PathValue("id")\n\t\tuser := User{ID: 1, Name: "Alice"}\n\n\t\tw.Header().Set("Content-Type", "application/json")\n\t\tw.WriteHeader(http.StatusOK)\n\t\tjson.NewEncoder(w).Encode(user)\n\t\tfmt.Println("Served user:", id)\n\t})\n\n\tserver := &http.Server{\n\t\tAddr:         ":8080",\n\t\tHandler:      mux,\n\t\tReadTimeout:  5 * time.Second,\n\t\tWriteTimeout: 10 * time.Second,\n\t\tIdleTimeout:  60 * time.Second,\n\t}\n\n\tfmt.Println("Server on :8080")\n\t_ = server // server.ListenAndServe()\n}\n\n// Context for cancellation\nfunc contextDemo() {\n\tctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\n\tdefer cancel()\n\n\tch := make(chan string, 1)\n\tgo func() {\n\t\ttime.Sleep(1 * time.Second)\n\t\tch <- "result"\n\t}()\n\n\tselect {\n\tcase result := <-ch:\n\t\tfmt.Println("Got:", result)\n\tcase <-ctx.Done():\n\t\tfmt.Println("Timed out:", ctx.Err())\n\t}\n}\n\nfunc main() {\n\tjsonDemo()\n\thttpDemo()\n\tcontextDemo()\n}'
      }</code>
    </pre>

    {/* Section 8: Building REST APIs */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      8. Building REST APIs: net/http vs chi vs gin
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 1.22 significantly improved the built-in <code>net/http</code> mux with method-based routing and path
      parameters. For more complex needs, <strong>chi</strong> provides middleware composition without reflection, and{' '}
      <strong>gin</strong> offers a batteries-included framework with excellent performance.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'// === Standard Library (Go 1.22+) ===\npackage main\n\nimport (\n\t"encoding/json"\n\t"log/slog"\n\t"net/http"\n)\n\ntype APIServer struct {\n\tmux *http.ServeMux\n}\n\nfunc NewAPIServer() *APIServer {\n\ts := &APIServer{mux: http.NewServeMux()}\n\ts.routes()\n\treturn s\n}\n\nfunc (s *APIServer) routes() {\n\ts.mux.HandleFunc("GET /api/users", s.listUsers)\n\ts.mux.HandleFunc("POST /api/users", s.createUser)\n\ts.mux.HandleFunc("GET /api/users/{id}", s.getUser)\n\ts.mux.HandleFunc("PUT /api/users/{id}", s.updateUser)\n\ts.mux.HandleFunc("DELETE /api/users/{id}", s.deleteUser)\n}\n\nfunc (s *APIServer) listUsers(w http.ResponseWriter, r *http.Request) {\n\tusers := []map[string]any{\n\t\t{"id": 1, "name": "Alice"},\n\t\t{"id": 2, "name": "Bob"},\n\t}\n\twriteJSON(w, http.StatusOK, users)\n}\n\nfunc (s *APIServer) getUser(w http.ResponseWriter, r *http.Request) {\n\tid := r.PathValue("id")\n\tslog.Info("Getting user", "id", id)\n\twriteJSON(w, http.StatusOK, map[string]string{"id": id})\n}\n\nfunc (s *APIServer) createUser(w http.ResponseWriter, r *http.Request) {\n\tvar body map[string]any\n\tif err := json.NewDecoder(r.Body).Decode(&body); err != nil {\n\t\thttp.Error(w, "bad request", http.StatusBadRequest)\n\t\treturn\n\t}\n\twriteJSON(w, http.StatusCreated, body)\n}\n\nfunc (s *APIServer) updateUser(w http.ResponseWriter, r *http.Request) {\n\tid := r.PathValue("id")\n\twriteJSON(w, http.StatusOK, map[string]string{"updated": id})\n}\n\nfunc (s *APIServer) deleteUser(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusNoContent)\n}\n\nfunc writeJSON(w http.ResponseWriter, status int, v any) {\n\tw.Header().Set("Content-Type", "application/json")\n\tw.WriteHeader(status)\n\tif err := json.NewEncoder(w).Encode(v); err != nil {\n\t\tpanic(err)\n\t}\n}\n\nfunc main() {\n\tserver := NewAPIServer()\n\tslog.Info("Starting server", "addr", ":8080")\n\thttp.ListenAndServe(":8080", server.mux)\n}'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Router Comparison: stdlib vs chi vs gin
    </h3>
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>net/http (1.22+)</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>chi</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>gin</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Path params', 'Yes ({id})', 'Yes ({id})', 'Yes (:id)'],
            ['Method routing', 'Yes', 'Yes', 'Yes'],
            ['Middleware', 'Manual', 'Excellent', 'Excellent'],
            ['Groups/Subrouters', 'No', 'Yes', 'Yes'],
            ['Request binding', 'Manual', 'Manual', 'Auto (JSON/form)'],
            ['Validation', 'No', 'No', 'Built-in'],
            ['Zero alloc routing', 'No', 'Yes', 'Yes (radix tree)'],
            ['Dependencies', 'None', 'Minimal', 'Several'],
            ['Best for', 'Simple APIs', 'Idiomatic Go', 'Rapid development'],
          ].map(([feat, std, chi, gin], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
              <td style={{ padding: '9px 16px', fontWeight: '600', color: '#334155', borderBottom: '1px solid #e2e8f0' }}>{feat}</td>
              <td style={{ padding: '9px 16px', color: '#374151', borderBottom: '1px solid #e2e8f0' }}>{std}</td>
              <td style={{ padding: '9px 16px', color: '#374151', borderBottom: '1px solid #e2e8f0' }}>{chi}</td>
              <td style={{ padding: '9px 16px', color: '#374151', borderBottom: '1px solid #e2e8f0' }}>{gin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Section 9: Testing */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      9. Testing: Table-Driven Tests, Mocks, and Benchmarks
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go has built-in testing support via the <code>testing</code> package. The idiomatic pattern is table-driven tests —
      a slice of test cases run in a loop. This approach scales from simple unit tests to complex integration scenarios.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package calc_test\n\nimport (\n\t"testing"\n\t"errors"\n)\n\n// Function under test\nfunc divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("division by zero")\n\t}\n\treturn a / b, nil\n}\n\n// Table-driven test\nfunc TestDivide(t *testing.T) {\n\ttests := []struct {\n\t\tname    string\n\t\ta, b    float64\n\t\twant    float64\n\t\twantErr bool\n\t}{\n\t\t{"positive", 10, 2, 5, false},\n\t\t{"negative divisor", -6, 2, -3, false},\n\t\t{"division by zero", 5, 0, 0, true},\n\t\t{"decimal result", 1, 3, 0.333, false},\n\t}\n\n\tfor _, tt := range tests {\n\t\tt.Run(tt.name, func(t *testing.T) {\n\t\t\tgot, err := divide(tt.a, tt.b)\n\t\t\tif (err != nil) != tt.wantErr {\n\t\t\t\tt.Errorf("divide() error = %v, wantErr %v", err, tt.wantErr)\n\t\t\t\treturn\n\t\t\t}\n\t\t\tif !tt.wantErr && abs(got-tt.want) > 0.001 {\n\t\t\t\tt.Errorf("divide() = %v, want %v", got, tt.want)\n\t\t\t}\n\t\t})\n\t}\n}\n\nfunc abs(x float64) float64 {\n\tif x < 0 {\n\t\treturn -x\n\t}\n\treturn x\n}\n\n// Interface for mocking\ntype UserStore interface {\n\tFindByID(id int) (string, error)\n}\n\n// Mock implementation\ntype MockUserStore struct {\n\tusers map[int]string\n}\n\nfunc (m *MockUserStore) FindByID(id int) (string, error) {\n\tif user, ok := m.users[id]; ok {\n\t\treturn user, nil\n\t}\n\treturn "", errors.New("not found")\n}\n\nfunc TestGetUser(t *testing.T) {\n\tstore := &MockUserStore{\n\t\tusers: map[int]string{1: "Alice", 2: "Bob"},\n\t}\n\n\tuser, err := store.FindByID(1)\n\tif err != nil {\n\t\tt.Fatal(err)\n\t}\n\tif user != "Alice" {\n\t\tt.Errorf("got %q, want %q", user, "Alice")\n\t}\n}\n\n// Benchmark\nfunc BenchmarkDivide(b *testing.B) {\n\tfor i := 0; i < b.N; i++ {\n\t\t_, _ = divide(1000.0, 3.0)\n\t}\n}\n// Run: go test ./... -bench=. -benchmem -race'
      }</code>
    </pre>

    {/* Section 10: Modules */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      10. Modules and Packages: go.mod, go.sum, and Workspaces
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go modules provide reproducible, hermetic builds. Every module has a <code>go.mod</code> file declaring its module
      path and dependencies, and a <code>go.sum</code> file with cryptographic checksums for security.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'# Initialize a new module\ngo mod init github.com/yourname/myapp\n\n# Add a dependency\ngo get github.com/go-chi/chi/v5@latest\ngo get github.com/lib/pq@v1.10.9\n\n# Remove unused dependencies, add missing ones\ngo mod tidy\n\n# Download all dependencies to local cache\ngo mod download\n\n# Verify integrity\ngo mod verify\n\n# Replace a dependency (local dev or fork)\n# In go.mod:\n# replace github.com/original/pkg => ../local/pkg\n\n# === go.mod example ===\n# module github.com/yourname/myapp\n#\n# go 1.22\n#\n# require (\n#     github.com/go-chi/chi/v5 v5.1.0\n#     github.com/lib/pq v1.10.9\n#     golang.org/x/exp v0.0.0-20240222234643-814bf88cf225\n# )\n\n# === Workspace (multi-module development) ===\n# go work init ./moduleA ./moduleB\n# go work use ./newmodule\n# go work sync\n\n# === Build and run ===\ngo run ./cmd/server          # run without building\ngo build -o bin/server ./cmd/server  # compile binary\ngo install github.com/tools/cmd@latest  # install tool\n\n# Cross-compilation\nGOOS=linux GOARCH=amd64 go build -o bin/server-linux ./cmd/server\nGOOS=windows GOARCH=amd64 go build -o bin/server.exe ./cmd/server'
      }</code>
    </pre>

    {/* Section 11: Generics */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      11. Generics (Go 1.18+): Type Parameters and Constraints
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go generics use type parameters in square brackets with constraint interfaces. The{' '}
      <code>golang.org/x/exp/constraints</code> package and the built-in <code>comparable</code> constraint are commonly
      used. Generics are most valuable for data structures and functional utilities.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport "fmt"\n\n// Number constraint\ntype Number interface {\n\t~int | ~int8 | ~int16 | ~int32 | ~int64 |\n\t\t~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |\n\t\t~float32 | ~float64\n}\n\n// Generic sum function\nfunc Sum[T Number](nums []T) T {\n\tvar total T\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\n// Generic Map (functional)\nfunc Map[T, U any](slice []T, fn func(T) U) []U {\n\tresult := make([]U, len(slice))\n\tfor i, v := range slice {\n\t\tresult[i] = fn(v)\n\t}\n\treturn result\n}\n\n// Generic Filter\nfunc Filter[T any](slice []T, pred func(T) bool) []T {\n\tvar result []T\n\tfor _, v := range slice {\n\t\tif pred(v) {\n\t\t\tresult = append(result, v)\n\t\t}\n\t}\n\treturn result\n}\n\n// Generic stack data structure\ntype Stack[T any] struct {\n\titems []T\n}\n\nfunc (s *Stack[T]) Push(item T) {\n\ts.items = append(s.items, item)\n}\n\nfunc (s *Stack[T]) Pop() (T, bool) {\n\tvar zero T\n\tif len(s.items) == 0 {\n\t\treturn zero, false\n\t}\n\tn := len(s.items) - 1\n\titem := s.items[n]\n\ts.items = s.items[:n]\n\treturn item, true\n}\n\nfunc (s *Stack[T]) Len() int { return len(s.items) }\n\n// Generic Set\ntype Set[T comparable] struct {\n\titems map[T]struct{}\n}\n\nfunc NewSet[T comparable]() *Set[T] {\n\treturn &Set[T]{items: make(map[T]struct{})}\n}\n\nfunc (s *Set[T]) Add(v T)      { s.items[v] = struct{}{} }\nfunc (s *Set[T]) Has(v T) bool { _, ok := s.items[v]; return ok }\nfunc (s *Set[T]) Len() int     { return len(s.items) }\n\nfunc main() {\n\t// Generic functions\n\tfmt.Println(Sum([]int{1, 2, 3, 4, 5}))       // 15\n\tfmt.Println(Sum([]float64{1.1, 2.2, 3.3}))   // 6.6\n\n\tdoubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })\n\tfmt.Println(doubled) // [2 4 6]\n\n\tevens := Filter([]int{1, 2, 3, 4, 5}, func(n int) bool { return n%2 == 0 })\n\tfmt.Println(evens) // [2 4]\n\n\t// Generic stack\n\ts := &Stack[string]{}\n\ts.Push("a")\n\ts.Push("b")\n\tif v, ok := s.Pop(); ok {\n\t\tfmt.Println("Popped:", v) // b\n\t}\n\n\t// Generic set\n\tset := NewSet[int]()\n\tset.Add(1)\n\tset.Add(2)\n\tset.Add(1) // duplicate ignored\n\tfmt.Println("Set size:", set.Len()) // 2\n\tfmt.Println("Has 1:", set.Has(1))   // true\n}'
      }</code>
    </pre>

    {/* Section 12: Concurrency Patterns */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      12. Concurrency Patterns: Worker Pools, Fan-Out/Fan-In, Context Cancellation
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Beyond basic goroutines and channels, Go enables elegant higher-level concurrency patterns. These patterns handle
      real-world concerns like backpressure, graceful shutdown, and coordinating many concurrent operations.
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"sync"\n\t"time"\n)\n\n// Worker Pool Pattern\nfunc workerPool(ctx context.Context, jobs <-chan int, numWorkers int) <-chan int {\n\tresults := make(chan int, numWorkers)\n\tvar wg sync.WaitGroup\n\n\tfor i := 0; i < numWorkers; i++ {\n\t\twg.Add(1)\n\t\tgo func(workerID int) {\n\t\t\tdefer wg.Done()\n\t\t\tfor {\n\t\t\t\tselect {\n\t\t\t\tcase job, ok := <-jobs:\n\t\t\t\t\tif !ok {\n\t\t\t\t\t\treturn // channel closed\n\t\t\t\t\t}\n\t\t\t\t\t// simulate work\n\t\t\t\t\ttime.Sleep(time.Millisecond)\n\t\t\t\t\tresults <- job * job\n\t\t\t\tcase <-ctx.Done():\n\t\t\t\t\treturn // cancelled\n\t\t\t\t}\n\t\t\t}\n\t\t}(i)\n\t}\n\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(results)\n\t}()\n\n\treturn results\n}\n\n// Fan-Out: one input, multiple processors\nfunc fanOut[T any](ctx context.Context, input <-chan T, n int) []<-chan T {\n\toutputs := make([]<-chan T, n)\n\tfor i := 0; i < n; i++ {\n\t\tch := make(chan T)\n\t\toutputs[i] = ch\n\t\tgo func(out chan<- T) {\n\t\t\tdefer close(out)\n\t\t\tfor v := range input {\n\t\t\t\tselect {\n\t\t\t\tcase out <- v:\n\t\t\t\tcase <-ctx.Done():\n\t\t\t\t\treturn\n\t\t\t\t}\n\t\t\t}\n\t\t}(ch)\n\t}\n\treturn outputs\n}\n\n// Fan-In: multiple inputs, one output\nfunc fanIn[T any](ctx context.Context, inputs ...<-chan T) <-chan T {\n\tmerged := make(chan T)\n\tvar wg sync.WaitGroup\n\n\tfor _, ch := range inputs {\n\t\twg.Add(1)\n\t\tgo func(c <-chan T) {\n\t\t\tdefer wg.Done()\n\t\t\tfor v := range c {\n\t\t\t\tselect {\n\t\t\t\tcase merged <- v:\n\t\t\t\tcase <-ctx.Done():\n\t\t\t\t\treturn\n\t\t\t\t}\n\t\t\t}\n\t\t}(ch)\n\t}\n\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(merged)\n\t}()\n\n\treturn merged\n}\n\n// Pipeline stage\nfunc generate(nums ...int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor _, n := range nums {\n\t\t\tout <- n\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc square(in <-chan int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := range in {\n\t\t\tout <- n * n\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\t// Worker pool demo\n\tctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n\tdefer cancel()\n\n\tjobs := make(chan int, 10)\n\tfor i := 1; i <= 5; i++ {\n\t\tjobs <- i\n\t}\n\tclose(jobs)\n\n\tresults := workerPool(ctx, jobs, 3)\n\tfor r := range results {\n\t\tfmt.Println("Result:", r)\n\t}\n\n\t// Pipeline demo\n\tnums := generate(1, 2, 3, 4, 5)\n\tsquares := square(nums)\n\tfor s := range squares {\n\t\tfmt.Println("Square:", s)\n\t}\n}'
      }</code>
    </pre>

    {/* Section 13: Go vs Node.js vs Python */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      13. Go vs Node.js vs Python: Which to Choose?
    </h2>
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Criterion</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Go</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Node.js</th>
            <th style={{ padding: '10px 16px', textAlign: 'left' }}>Python</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Performance', 'Excellent (near C)', 'Good (V8 JIT)', 'Moderate (CPython)'],
            ['Concurrency', 'Goroutines (true parallel)', 'Event loop (single-threaded)', 'GIL limited (asyncio)'],
            ['Memory usage', 'Very low', 'Moderate', 'High'],
            ['Cold start', 'Instant (compiled)', 'Fast', 'Slow (imports)'],
            ['Type safety', 'Static, strict', 'Optional (TypeScript)', 'Optional (type hints)'],
            ['Learning curve', 'Low-moderate', 'Low', 'Very low'],
            ['Ecosystem', 'Growing', 'Massive (npm)', 'Massive (PyPI)'],
            ['Deployment', 'Single binary', 'Node runtime needed', 'Python runtime needed'],
            ['Best for', 'APIs, microservices, systems', 'Real-time, full-stack', 'Data science, ML, scripting'],
            ['Error handling', 'Explicit (values)', 'try/catch (exceptions)', 'try/except (exceptions)'],
            ['Generics', 'Yes (1.18+)', 'TypeScript generics', 'Type hints only'],
            ['Standard library', 'Excellent', 'Good', 'Excellent'],
          ].map(([crit, go_, node, py], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
              <td style={{ padding: '9px 16px', fontWeight: '600', color: '#334155', borderBottom: '1px solid #e2e8f0' }}>{crit}</td>
              <td style={{ padding: '9px 16px', color: '#059669', borderBottom: '1px solid #e2e8f0' }}>{go_}</td>
              <td style={{ padding: '9px 16px', color: '#374151', borderBottom: '1px solid #e2e8f0' }}>{node}</td>
              <td style={{ padding: '9px 16px', color: '#374151', borderBottom: '1px solid #e2e8f0' }}>{py}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Production Tips */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      14. Production Tips and Best Practices
    </h2>
    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Project Structure
    </h3>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'myapp/\n├── cmd/\n│   └── server/\n│       └── main.go          # entry point\n├── internal/\n│   ├── handler/             # HTTP handlers\n│   ├── service/             # business logic\n│   ├── repository/          # data access layer\n│   └── model/               # domain types\n├── pkg/\n│   ├── logger/              # reusable packages\n│   └── middleware/\n├── migrations/              # SQL migrations\n├── config/\n│   └── config.go\n├── Dockerfile\n├── docker-compose.yml\n├── Makefile\n├── go.mod\n└── go.sum\n\n# Makefile targets\n# make build   → go build -o bin/server ./cmd/server\n# make test    → go test ./... -race -cover\n# make lint    → golangci-lint run\n# make docker  → docker build -t myapp .'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Graceful Shutdown Pattern
    </h3>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"context"\n\t"log/slog"\n\t"net/http"\n\t"os"\n\t"os/signal"\n\t"syscall"\n\t"time"\n)\n\nfunc main() {\n\tsrv := &http.Server{\n\t\tAddr:    ":8080",\n\t\tHandler: http.DefaultServeMux,\n\t}\n\n\t// Start server in goroutine\n\tgo func() {\n\t\tif err := srv.ListenAndServe(); err != http.ErrServerClosed {\n\t\t\tslog.Error("Server error", "err", err)\n\t\t\tos.Exit(1)\n\t\t}\n\t}()\n\tslog.Info("Server started", "addr", srv.Addr)\n\n\t// Wait for interrupt signal\n\tquit := make(chan os.Signal, 1)\n\tsignal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)\n\t<-quit\n\n\tslog.Info("Shutting down...")\n\tctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)\n\tdefer cancel()\n\n\tif err := srv.Shutdown(ctx); err != nil {\n\t\tslog.Error("Shutdown error", "err", err)\n\t}\n\tslog.Info("Server stopped")\n}'
      }</code>
    </pre>

    {/* Conclusion */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      Conclusion
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go has earned its place as one of the premier languages for backend development. Its philosophy of simplicity —
      orthogonal features, a small spec, and one idiomatic way to do most things — pays dividends in maintainability as
      teams and codebases grow.
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      The goroutine model makes concurrency approachable without sacrificing performance. The standard library reduces
      external dependencies. And the compiler catches errors that would only surface at runtime in dynamic languages.
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '0' }}>
      Whether you are building a high-throughput microservice, a CLI tool, or a data pipeline, Go gives you the tools to
      write correct, fast, and maintainable code. Start with the standard library, follow idiomatic patterns, and reach
      for third-party packages only when genuinely needed.
    </p>
  </article>
)

const zhContent = (
  <article>
    {/* TL;DR Box */}
    <div
      style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
        TL;DR — Go 60秒速览
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
        <li>Go 是编译型静态类型语言，兼顾简洁性与高性能</li>
        <li>Goroutine 和 channel 实现优雅高效的并发</li>
        <li>内置工具链：<code>go build</code>、<code>go test</code>、<code>go fmt</code>、<code>go vet</code></li>
        <li>显式错误处理 — 无异常机制，只有 <code>(value, error)</code> 返回值</li>
        <li>接口隐式满足 — 鸭子类型无需额外开销</li>
        <li>Go 1.18+ 支持泛型，实现类型安全的可复用代码</li>
        <li>适用于 REST API、微服务、CLI 工具和系统编程</li>
      </ul>
    </div>

    {/* Introduction */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0', marginBottom: '16px', color: '#1e293b' }}>
      Go 简介
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go（常称 Golang）由 Robert Griesemer、Rob Pike 和 Ken Thompson 在 Google 设计，于 2009 年公开发布。其创建初衷是解决真实工程问题：缓慢的编译速度、复杂的依赖管理，以及在 C++ 和 Java 中编写安全并发程序的困难。
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      如今，Go 驱动着互联网上最关键的基础设施——Docker、Kubernetes、Terraform、InfluxDB、CockroachDB，以及 Google、Cloudflare、Dropbox 和 Uber 的无数微服务。其接近 C 的性能、接近 Python 的开发体验，以及世界级的并发模型，使其成为现代后端开发的首选语言。
    </p>

    {/* Key Takeaways */}
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.05rem', color: '#334155', display: 'block', marginBottom: '12px' }}>
        核心要点
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
        <li>Go 编译为原生二进制文件——部署无需运行时</li>
        <li>语言规范可在单页内呈现，变化极少</li>
        <li>Goroutine 比 OS 线程轻量约 1000 倍</li>
        <li>标准库涵盖 HTTP 服务器、JSON、加密、SQL 等</li>
        <li>表格驱动测试和 <code>testing</code> 包是 Go 的惯用测试方式</li>
        <li>Go 模块提供可复现的、密封式构建</li>
      </ul>
    </div>

    {/* Section 1 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      1. Go 基础：包、导入与 main 函数
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      每个 Go 程序都组织在包中。<code>main</code> 包是特殊的——它定义了一个独立的可执行文件。包通过模块路径导入，未使用的导入会导致编译错误，从而保持代码库的整洁。
    </p>
    <pre
      style={{
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '24px',
      }}
    >
      <code>{
'package main\n\nimport (\n\t"fmt"\n\t"strings"\n)\n\nfunc main() {\n\t// fmt 是格式化包\n\tfmt.Println("你好，Go！")\n\n\t// strings 包\n\ts := strings.ToUpper("golang")\n\tfmt.Println(s) // GOLANG\n\n\t// 多返回值\n\tq, r := divide(17, 5)\n\tfmt.Printf("17 / 5 = %d 余 %d\\n", q, r)\n}\n\nfunc divide(a, b int) (int, int) {\n\treturn a / b, a % b\n}'
      }</code>
    </pre>

    {/* Section 2 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      2. 变量与类型：var、:= 和零值
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 是静态类型语言，具有强大的类型推断。声明变量有两种方式：冗长的 <code>var</code> 形式（在包级别或需要显式类型时使用）和简短声明运算符 <code>:=</code>（函数内部最常用）。Go 会将所有变量初始化为其零值。
    </p>

    {/* Section 3 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      3. 函数：多返回值、具名返回、可变参数与 defer
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 函数是一等公民。关键特性包括：多返回值（消除了对出参或异常的需求）、用于文档化的具名返回值、可变参数函数，以及用于清理逻辑的强大 <code>defer</code> 语句。defer 在包围函数返回时执行，即使发生 panic 也不例外。
    </p>

    {/* Section 4 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      4. 结构体与接口：嵌入、方法与鸭子类型
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 使用组合而非继承。结构体组织相关数据，方法为类型附加行为，接口定义隐式满足的契约。结构体嵌入提供了一种无需复杂性的继承形式。只要类型实现了接口的所有方法，它就自动满足该接口，无需显式声明。
    </p>

    {/* Section 5 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      5. Goroutine 与 Channel：Go 式并发
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 的并发模型基于通信顺序进程（CSP）。箴言：<em>"不要通过共享内存来通信；要通过通信来共享内存。"</em> Goroutine 是轻量级廉价线程，channel 是它们之间安全数据传输的类型化管道。无缓冲 channel 会阻塞直到发送方和接收方都就绪，缓冲 channel 在缓冲区满之前不会阻塞。
    </p>

    {/* Section 6 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      6. 错误处理：error 接口、包装与哨兵错误
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 将错误视为值。内置的 <code>error</code> 接口只有一个方法：<code>Error() string</code>。使用 <code>fmt.Errorf</code> 和 <code>%w</code> 包装错误，用 <code>errors.Is</code> 比较哨兵错误，用 <code>errors.As</code> 在错误链上进行类型断言。这种简洁性加上显式错误返回，使错误处理高度可见。
    </p>

    {/* Section 7 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      7. 标准库：net/http、encoding/json、os、io、context
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 的标准库是其最大优势之一。无需任何第三方依赖，就能构建生产就绪的 HTTP 服务器、解析 JSON、与文件系统交互、管理取消操作。context 包提供截止时间、取消和请求范围值，在 API 边界之间传递。
    </p>

    {/* Section 8 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      8. 构建 REST API：net/http vs chi vs gin
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 1.22 通过基于方法的路由和路径参数显著改进了内置的 <code>net/http</code> 多路复用器。对于更复杂的需求，<strong>chi</strong> 无需反射即可提供中间件组合，<strong>gin</strong> 则提供了包含电池的框架，具有出色的性能。选择取决于项目需求和团队偏好。
    </p>

    {/* Section 9 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      9. 测试：表格驱动测试、Mock 与基准测试
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 通过 <code>testing</code> 包内置了测试支持。惯用模式是表格驱动测试——在循环中运行的测试用例切片。运行 <code>go test ./... -race -cover</code> 可进行竞争检测和覆盖率报告。接口使 mock 变得简单，无需专门的 mock 框架。
    </p>

    {/* Section 10 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      10. 模块与包：go.mod、go.sum 与工作区
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 模块提供可复现的密封构建。每个模块都有一个 <code>go.mod</code> 文件，声明其模块路径和依赖关系，以及一个包含加密校验和的 <code>go.sum</code> 文件。使用 <code>go mod init</code> 初始化，<code>go get</code> 添加依赖，<code>go mod tidy</code> 整理。
    </p>

    {/* Section 11 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      11. 泛型（Go 1.18+）：类型参数与约束
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 泛型在方括号中使用类型参数和约束接口。<code>~T</code> 语法表示底层类型为 T 的任何类型。泛型在数据结构（Stack、Set、Queue）和函数式工具（Map、Filter、Reduce）中最有价值，可避免代码重复，同时保持类型安全。
    </p>

    {/* Section 12 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      12. 并发模式：Worker Pool、Fan-Out/Fan-In、Context 取消
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      超越基本的 goroutine 和 channel，Go 支持优雅的高级并发模式。Worker Pool 通过固定数量的 goroutine 限制并发度。Fan-Out 将工作分发给多个处理器，Fan-In 将结果合并回单个 channel。Context 取消允许优雅地停止长时间运行的操作。
    </p>

    {/* Conclusion */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      总结
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Go 已赢得其作为后端开发首选语言之一的地位。其简洁哲学——正交特性、精简规范，以及大多数事情的一种惯用方式——随着团队和代码库的增长，在可维护性方面带来丰厚回报。
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '0' }}>
      无论您是在构建高吞吐量微服务、CLI 工具还是数据管道，Go 都为您提供了编写正确、快速、可维护代码的工具。从标准库开始，遵循惯用模式，仅在真正需要时才引入第三方包。
    </p>
  </article>
)

export default function GolangGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en
  const isZh = lang === 'zh'

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* Main Content */}
      {isZh ? zhContent : enContent}

      {/* Quick Reference */}
      <section style={{ marginTop: '48px', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
          {isZh ? '快速参考：Go 常用命令' : 'Quick Reference: Essential Go Commands'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            { cmd: 'go run ./cmd/server', desc: isZh ? '无需构建直接运行' : 'Run without building' },
            { cmd: 'go build -o bin/app .', desc: isZh ? '编译为二进制文件' : 'Compile to binary' },
            { cmd: 'go test ./... -race', desc: isZh ? '运行所有测试（含竞争检测）' : 'Run tests with race detector' },
            { cmd: 'go test -bench=.', desc: isZh ? '运行基准测试' : 'Run benchmarks' },
            { cmd: 'go fmt ./...', desc: isZh ? '格式化所有代码' : 'Format all code' },
            { cmd: 'go vet ./...', desc: isZh ? '静态分析检查' : 'Static analysis checks' },
            { cmd: 'go mod tidy', desc: isZh ? '清理依赖' : 'Clean up dependencies' },
            { cmd: 'go generate ./...', desc: isZh ? '运行代码生成器' : 'Run code generators' },
          ].map(({ cmd, desc }, i) => (
            <div
              key={i}
              style={{
                background: '#0f172a',
                borderRadius: '8px',
                padding: '14px 18px',
              }}
            >
              <code style={{ color: '#38bdf8', fontSize: '0.875rem', display: 'block', marginBottom: '6px' }}>{cmd}</code>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ marginTop: '0' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
          {isZh ? '常见问题' : 'Frequently Asked Questions'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqSchema.mainEntity.map((faq, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '20px 24px',
                background: '#ffffff',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
                {faq.name}
              </h3>
              <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
