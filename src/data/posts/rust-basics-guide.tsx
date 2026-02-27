'use client';

import React from 'react';

const translations = {
  en: {
    title: 'Rust Basics Guide: Ownership, Borrowing, Lifetimes, and Systems Programming',
    description:
      'A comprehensive guide to Rust programming language fundamentals — ownership, borrowing, lifetimes, traits, error handling, concurrency, and more. Learn why Rust is the future of systems programming.',
    content: {
      intro: `Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. Since its 1.0 release in 2015, Rust has consistently ranked as the most loved programming language in the Stack Overflow Developer Survey for eight consecutive years. This guide walks you through the core concepts that make Rust unique and powerful.`,
      sections: [
        {
          id: 'why-rust',
          h2: 'Why Rust? Memory Safety Without Garbage Collection',
          body: `Most programming languages choose one of two paths: manual memory management (C, C++) for performance, or garbage collection (Go, Java, Python) for safety. Rust takes a third path — memory safety enforced at compile time through the ownership system, with zero runtime cost.`,
          subsections: [
            {
              h3: 'The Three Pillars of Rust',
              body: `Rust is built on three core promises:
1. Memory safety — no null pointer dereferences, no use-after-free, no buffer overflows
2. Thread safety — data races are a compile error, not a runtime crash
3. Zero-cost abstractions — high-level code compiles to machine code as efficient as hand-written C`,
            },
            {
              h3: 'Who Uses Rust?',
              body: `Rust is used in production by Mozilla (Firefox), Microsoft (Windows kernel components), Google (Android, Chromium), Amazon (AWS Firecracker), Meta (Diem, Sapling), Cloudflare, Discord, Dropbox, and many more. The Linux kernel officially accepted Rust as a second implementation language in 2022.`,
            },
          ],
        },
        {
          id: 'ownership',
          h2: 'The Ownership System: Rules, Move Semantics, and the Copy Trait',
          body: `Ownership is Rust's most unique feature and central innovation. Every value in Rust has a single owner, and when that owner goes out of scope, the value is automatically dropped (freed).`,
          subsections: [
            {
              h3: 'The Three Ownership Rules',
              body: `The Rust ownership rules are simple but powerful:
1. Each value in Rust has a variable called its owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.`,
              code: `fn main() {
    // s1 owns the String
    let s1 = String::from("hello");

    // Ownership moves from s1 to s2
    let s2 = s1;

    // ERROR: s1 is no longer valid — it was moved
    // println!("{}", s1); // error[E0382]: borrow of moved value: \`s1\`

    // s2 is valid
    println!("{}", s2); // "hello"
} // s2 is dropped here, memory is freed`,
            },
            {
              h3: 'Move Semantics vs Copy Semantics',
              body: `Heap-allocated types like String and Vec are moved by default. Stack-only types that implement the Copy trait are copied instead, so the original remains valid.`,
              code: `fn main() {
    // i32 implements Copy — both variables are valid
    let x = 5;
    let y = x;
    println!("x = {}, y = {}", x, y); // both work!

    // String does NOT implement Copy — it moves
    let s1 = String::from("world");
    let s2 = s1; // s1 is moved into s2
    // println!("{}", s1); // compile error!

    // To keep both, use .clone()
    let s3 = String::from("clone me");
    let s4 = s3.clone(); // deep copy
    println!("s3 = {}, s4 = {}", s3, s4); // both work
}

// Types that implement Copy: i32, f64, bool, char, tuples of Copy types
// Types that do NOT implement Copy: String, Vec<T>, Box<T>, any type with heap data`,
            },
            {
              h3: 'Ownership and Functions',
              body: `Passing a value to a function moves or copies it, just like assignment.`,
              code: `fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string is dropped here

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer is copied, original still valid

fn main() {
    let s = String::from("hello");
    takes_ownership(s); // s is moved
    // s is no longer valid here!

    let x = 5;
    makes_copy(x); // x is copied
    println!("{}", x); // x still valid!
}`,
            },
          ],
        },
        {
          id: 'borrowing',
          h2: 'Borrowing and References: &T, &mut T, and the Borrow Checker',
          body: `Instead of transferring ownership, you can borrow a value by creating a reference. References allow you to refer to a value without taking ownership of it.`,
          subsections: [
            {
              h3: 'Immutable References (&T)',
              body: `You can have multiple immutable references to the same data simultaneously. This is safe because no one can modify the data while it is being read.`,
              code: `fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but because it does not have ownership,
  // the value it refers to is NOT dropped

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // borrow s1
    println!("The length of '{}' is {}.", s1, len);
    // s1 is still valid — we only borrowed it!

    // Multiple immutable borrows are fine
    let r1 = &s1;
    let r2 = &s1;
    println!("{} and {}", r1, r2);
}`,
            },
            {
              h3: 'Mutable References (&mut T)',
              body: `Mutable references allow you to change the borrowed value. The critical rule: you can only have ONE mutable reference to a piece of data at a time, and you cannot mix mutable and immutable references in the same scope.`,
              code: `fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s); // "hello, world"

    // ERROR: Cannot have two mutable references at once
    let r1 = &mut s;
    // let r2 = &mut s; // error[E0499]: cannot borrow \`s\` as mutable more than once

    // ERROR: Cannot mix mutable and immutable references
    let r3 = &s;
    // let r4 = &mut s; // error[E0502]: cannot borrow \`s\` as mutable because it is also borrowed as immutable
}`,
            },
            {
              h3: 'Dangling References — Prevented at Compile Time',
              body: `In C/C++, dangling pointers (pointing to freed memory) are a major source of bugs. Rust's borrow checker prevents them entirely.`,
              code: `// This will NOT compile — Rust prevents dangling references
fn dangle() -> &String { // error[E0106]: missing lifetime specifier
    let s = String::from("hello");
    &s // s is dropped when dangle() ends, so this reference would dangle!
}

// The fix: return the String directly (transfer ownership)
fn no_dangle() -> String {
    let s = String::from("hello");
    s // ownership is moved out
}`,
            },
          ],
        },
        {
          id: 'lifetimes',
          h2: "Lifetimes: 'a, Lifetime Elision, and 'static",
          body: `Lifetimes are Rust's way of ensuring that references remain valid for as long as they are used. Every reference in Rust has a lifetime — the scope for which that reference is valid.`,
          subsections: [
            {
              h3: 'Why Lifetimes Exist',
              body: `Lifetimes prevent dangling references. In most cases, Rust can infer lifetimes automatically (lifetime elision), but sometimes you need to annotate them explicitly.`,
              code: `// This function won't compile without lifetime annotations
// because Rust doesn't know if the returned reference lives as long as x or y
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is '{}'", result);
    }
    // result can't be used here because string2 is out of scope
}`,
            },
            {
              h3: 'Lifetime Elision Rules',
              body: `The compiler applies three rules to infer lifetimes without annotations:
1. Each reference parameter gets its own lifetime parameter.
2. If there is exactly one input lifetime, it is assigned to all output lifetimes.
3. If one input is &self or &mut self, its lifetime is assigned to all outputs.`,
              code: `// These two function signatures are equivalent:
fn first_word(s: &str) -> &str {       // with elision
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn first_word_explicit<'a>(s: &'a str) -> &'a str { // explicit lifetimes
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}`,
            },
            {
              h3: "The 'static Lifetime",
              body: `The 'static lifetime means the reference can live for the entire duration of the program. String literals have 'static lifetime because they are stored directly in the program binary.`,
              code: `fn main() {
    // String literals have 'static lifetime
    let s: &'static str = "I have a static lifetime.";

    // Static references in functions
    fn static_string() -> &'static str {
        "I am always valid"
    }
}

// Structs with lifetime annotations
struct Important<'a> {
    part: &'a str,
}

impl<'a> Important<'a> {
    fn announce(&self, announcement: &str) -> &str {
        println!("Attention everyone: {}!", announcement);
        self.part
    }
}`,
            },
          ],
        },
        {
          id: 'structs-enums',
          h2: 'Structs and Enums: impl Blocks, Methods, and Associated Functions',
          body: `Structs and enums are Rust's primary tools for creating custom data types. Unlike C structs, Rust structs can have methods attached via impl blocks.`,
          subsections: [
            {
              h3: 'Defining and Using Structs',
              code: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Associated function (no self) — called as Rectangle::new(...)
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }

    // Method (takes &self) — called as rect.area()
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // Mutable method
    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }
}

fn main() {
    let mut rect1 = Rectangle::new(30, 50);
    let rect2 = Rectangle::new(10, 40);
    println!("Area: {} sq px", rect1.area());
    println!("Perimeter: {} px", rect1.perimeter());
    println!("rect1 can hold rect2: {}", rect1.can_hold(&rect2));
    rect1.scale(2);
    println!("Scaled: {:?}", rect1);
}`,
            },
            {
              h3: 'Enums and the Option Type',
              body: `Rust enums are algebraic data types — each variant can hold different data. The built-in Option<T> enum replaces null in Rust.`,
              code: `#[derive(Debug)]
enum Shape {
    Circle(f64),              // radius
    Rectangle(f64, f64),      // width, height
    Triangle(f64, f64, f64),  // sides
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle(a, b, c) => {
                let s = (a + b + c) / 2.0;
                (s * (s - a) * (s - b) * (s - c)).sqrt()
            }
        }
    }
}

// Option<T> — the safe alternative to null
fn find_user(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Alice"))
    } else {
        None
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle(3.0, 4.0, 5.0),
    ];
    for shape in &shapes {
        println!("{:?} has area {:.2}", shape, shape.area());
    }

    match find_user(1) {
        Some(name) => println!("Found user: {}", name),
        None => println!("User not found"),
    }
}`,
            },
          ],
        },
        {
          id: 'pattern-matching',
          h2: 'Pattern Matching: match, if let, while let, and Destructuring',
          body: `Pattern matching in Rust is exhaustive — the compiler forces you to handle all cases. This eliminates entire classes of bugs common in other languages.`,
          subsections: [
            {
              h3: 'The match Expression',
              code: `fn describe_number(n: i32) -> &'static str {
    match n {
        0 => "zero",
        1 | 2 | 3 => "small",
        4..=9 => "medium",
        10..=99 => "large",
        n if n < 0 => "negative",
        _ => "huge",
    }
}

#[derive(Debug)]
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(String), // state quarter
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {}!", state);
            25
        }
    }
}`,
            },
            {
              h3: 'if let and while let',
              code: `fn main() {
    let some_value: Option<i32> = Some(42);

    // Verbose match
    match some_value {
        Some(v) => println!("Got {}", v),
        None => (),
    }

    // Concise if let
    if let Some(v) = some_value {
        println!("Got {}", v);
    }

    // while let — loop until pattern doesn't match
    let mut stack = Vec::new();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    while let Some(top) = stack.pop() {
        println!("Popped: {}", top);
    }

    // Destructuring in let bindings
    let (x, y, z) = (1, 2, 3);
    let Point { x: px, y: py } = Point { x: 0, y: 7 };

    // Tuple structs
    struct Color(i32, i32, i32);
    let Color(red, green, blue) = Color(255, 128, 0);
    println!("RGB: {}, {}, {}", red, green, blue);
}

struct Point { x: i32, y: i32 }`,
            },
          ],
        },
        {
          id: 'error-handling',
          h2: 'Error Handling: Result<T, E>, Option<T>, ? Operator, and Custom Errors',
          body: `Rust has no exceptions. Instead, it uses the Result<T, E> and Option<T> types to represent fallible operations, making error handling explicit and composable.`,
          subsections: [
            {
              h3: 'Result<T, E> and the ? Operator',
              code: `use std::fs::File;
use std::io::{self, Read};
use std::num::ParseIntError;

// The ? operator propagates errors automatically
fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("username.txt")?.read_to_string(&mut username)?;
    Ok(username)
}

// Chaining with ? operator
fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.trim().parse::<i32>()?;
    Ok(n * 2)
}

fn main() {
    match parse_and_double("  21  ") {
        Ok(n) => println!("Result: {}", n),       // Result: 42
        Err(e) => println!("Error: {}", e),
    }

    match parse_and_double("not a number") {
        Ok(n) => println!("Result: {}", n),
        Err(e) => println!("Error: {}", e),         // Error: invalid digit
    }
}`,
            },
            {
              h3: 'Custom Error Types',
              code: `use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    ParseError(ParseIntError),
    NegativeNumber(i32),
    TooBig(i32),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::ParseError(e) => write!(f, "Parse error: {}", e),
            AppError::NegativeNumber(n) => write!(f, "Negative number not allowed: {}", n),
            AppError::TooBig(n) => write!(f, "Number too big: {}", n),
        }
    }
}

impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self {
        AppError::ParseError(e)
    }
}

fn validate_age(s: &str) -> Result<i32, AppError> {
    let age: i32 = s.trim().parse()?; // ParseIntError -> AppError via From
    if age < 0 {
        return Err(AppError::NegativeNumber(age));
    }
    if age > 150 {
        return Err(AppError::TooBig(age));
    }
    Ok(age)
}

fn main() {
    for input in &["25", "-5", "200", "abc"] {
        match validate_age(input) {
            Ok(age) => println!("Valid age: {}", age),
            Err(e) => println!("Error for '{}': {}", input, e),
        }
    }
}`,
            },
          ],
        },
        {
          id: 'traits',
          h2: 'Traits: Defining, Implementing, Trait Objects, and Generics',
          body: `Traits in Rust are similar to interfaces in other languages. They define shared behavior that types can implement. Rust uses traits extensively for polymorphism.`,
          subsections: [
            {
              h3: 'Defining and Implementing Traits',
              code: `trait Drawable {
    fn draw(&self);
    fn bounding_box(&self) -> (f64, f64, f64, f64); // required
    fn description(&self) -> String {                // default impl
        format!("A drawable object")
    }
}

struct Circle {
    x: f64, y: f64, radius: f64,
}

struct Square {
    x: f64, y: f64, side: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle at ({}, {}) with radius {}", self.x, self.y, self.radius);
    }
    fn bounding_box(&self) -> (f64, f64, f64, f64) {
        (self.x - self.radius, self.y - self.radius,
         self.x + self.radius, self.y + self.radius)
    }
    fn description(&self) -> String {
        format!("Circle with radius {}", self.radius)
    }
}

impl Drawable for Square {
    fn draw(&self) {
        println!("Drawing square at ({}, {}) with side {}", self.x, self.y, self.side);
    }
    fn bounding_box(&self) -> (f64, f64, f64, f64) {
        (self.x, self.y, self.x + self.side, self.y + self.side)
    }
}`,
            },
            {
              h3: 'Generics and Trait Bounds',
              code: `use std::fmt::Display;

// Static dispatch (monomorphization — zero-cost at runtime)
fn print_largest<T: PartialOrd + Display>(list: &[T]) {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    println!("The largest is {}", largest);
}

// Multiple trait bounds with where clause
fn complex_function<T, U>(t: &T, u: &U) -> String
where
    T: Display + Clone,
    U: Display + std::fmt::Debug,
{
    format!("t={}, u={:?}", t, u)
}

// Dynamic dispatch with trait objects (runtime polymorphism)
fn draw_all(shapes: &[Box<dyn Drawable>]) {
    for shape in shapes {
        shape.draw();
        println!("  Description: {}", shape.description());
    }
}

fn main() {
    print_largest(&[34, 50, 25, 100, 65]);
    print_largest(&[3.4, 5.0, 2.5, 1.0]);

    let shapes: Vec<Box<dyn Drawable>> = vec![
        Box::new(Circle { x: 0.0, y: 0.0, radius: 5.0 }),
        Box::new(Square { x: 1.0, y: 1.0, side: 4.0 }),
    ];
    draw_all(&shapes);
}

trait Drawable {
    fn draw(&self);
    fn description(&self) -> String { String::from("A drawable object") }
}`,
            },
          ],
        },
        {
          id: 'iterators-closures',
          h2: 'Iterators and Closures: map, filter, collect, and Chaining',
          body: `Rust's iterator pattern is lazy — no work is done until you consume the iterator. This allows for expressive, efficient pipelines that compile to optimal machine code.`,
          subsections: [
            {
              h3: 'Closures in Rust',
              code: `fn apply_twice<F>(f: F, x: i32) -> i32
where
    F: Fn(i32) -> i32,
{
    f(f(x))
}

fn main() {
    // Closures capture their environment
    let multiplier = 3;
    let triple = |x| x * multiplier; // captures multiplier by reference

    println!("{}", apply_twice(triple, 2));  // 18

    // FnMut — can mutate captured variables
    let mut count = 0;
    let mut increment = || {
        count += 1;
        count
    };
    println!("{}", increment()); // 1
    println!("{}", increment()); // 2

    // FnOnce — consumes captured variables
    let name = String::from("Alice");
    let greet = move || println!("Hello, {}!", name); // moves name
    greet();
    // name is no longer accessible here
}`,
            },
            {
              h3: 'Iterator Chaining',
              code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Chain: filter evens, square them, sum
    let sum_of_even_squares: i32 = numbers
        .iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .sum();
    println!("Sum of even squares: {}", sum_of_even_squares); // 220

    // collect into different types
    let strings: Vec<String> = numbers
        .iter()
        .map(|n| n.to_string())
        .collect();

    // zip, enumerate, take, skip
    let words = vec!["hello", "world", "foo", "bar"];
    let indexed: Vec<(usize, &&str)> = words
        .iter()
        .enumerate()
        .filter(|(i, _)| i % 2 == 0)
        .collect();

    // flat_map — flatten nested iterators
    let sentences = vec!["hello world", "foo bar baz"];
    let all_words: Vec<&str> = sentences
        .iter()
        .flat_map(|s| s.split_whitespace())
        .collect();
    println!("{:?}", all_words); // ["hello", "world", "foo", "bar", "baz"]

    // Custom iterator with fold
    let product: i32 = (1..=5).fold(1, |acc, x| acc * x);
    println!("5! = {}", product); // 120

    // any, all, find, position
    let has_even = numbers.iter().any(|&x| x % 2 == 0);
    let all_positive = numbers.iter().all(|&x| x > 0);
    let first_big = numbers.iter().find(|&&x| x > 5);
    println!("has_even={}, all_positive={}, first_big={:?}", has_even, all_positive, first_big);
}`,
            },
          ],
        },
        {
          id: 'cargo',
          h2: 'Cargo and Crates: Cargo.toml, crates.io, and Workspaces',
          body: `Cargo is Rust's build system and package manager. It handles compiling code, downloading dependencies, running tests, and publishing packages — all with a single tool.`,
          subsections: [
            {
              h3: 'Cargo.toml Structure',
              code: `# Cargo.toml — the manifest file for your Rust project

[package]
name = "my_awesome_app"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
description = "A brief description of my app"
license = "MIT OR Apache-2.0"
repository = "https://github.com/user/my_awesome_app"

[dependencies]
serde = { version = "1.0", features = ["derive"] }   # JSON/serialization
tokio = { version = "1", features = ["full"] }        # async runtime
reqwest = { version = "0.11", features = ["json"] }   # HTTP client
anyhow = "1.0"                                        # error handling
clap = { version = "4", features = ["derive"] }       # CLI argument parsing

[dev-dependencies]
criterion = "0.5"     # benchmarking
mockall = "0.11"      # mocking in tests

[profile.release]
opt-level = 3         # maximum optimization
lto = true            # link-time optimization
codegen-units = 1     # better optimization, slower compile

[[bin]]
name = "my_app"
path = "src/main.rs"

[lib]
name = "my_lib"
path = "src/lib.rs"`,
            },
            {
              h3: 'Essential Cargo Commands',
              code: `# Create a new project
cargo new my_project           # binary (main.rs)
cargo new my_library --lib     # library (lib.rs)

# Build and run
cargo build                    # debug build
cargo build --release          # optimized release build
cargo run                      # build and run
cargo run --release            # run with optimizations
cargo run -- arg1 arg2         # pass arguments

# Testing
cargo test                     # run all tests
cargo test my_function         # run tests matching name
cargo test -- --nocapture      # show println! output
cargo test -- --test-threads=1 # run tests sequentially

# Documentation
cargo doc --open               # generate and open docs

# Publishing
cargo login                    # authenticate with crates.io
cargo publish                  # publish to crates.io

# Workspace — multiple related packages
# workspace/Cargo.toml:
# [workspace]
# members = ["app", "library", "shared-types"]`,
            },
          ],
        },
        {
          id: 'stdlib',
          h2: 'Standard Library: Vec, HashMap, String vs &str, and Box<T>',
          body: `Rust's standard library provides powerful, safe data structures. Understanding the difference between owned and borrowed types is key to writing idiomatic Rust.`,
          subsections: [
            {
              h3: 'String vs &str',
              code: `fn main() {
    // &str — string slice, borrowed, immutable, stored in binary or stack
    let s1: &str = "hello";               // string literal — 'static lifetime
    let s2: &str = &String::from("hi")[..]; // slice of a String

    // String — owned, heap-allocated, mutable
    let mut s3: String = String::from("hello");
    s3.push_str(", world");
    s3.push('!');
    println!("{}", s3); // "hello, world!"

    // Converting between them
    let owned: String = s1.to_string();          // &str -> String
    let borrowed: &str = &s3;                    // String -> &str (deref coercion)
    let borrowed2: &str = s3.as_str();           // explicit

    // Use &str for function parameters when you don't need ownership
    fn greet(name: &str) -> String {
        format!("Hello, {}!", name)
    }
    println!("{}", greet("Alice"));      // works with &str
    println!("{}", greet(&s3));          // works with &String (deref coercion)
}`,
            },
            {
              h3: 'Vec<T> and HashMap',
              code: `use std::collections::HashMap;

fn main() {
    // Vec<T> — growable, heap-allocated array
    let mut numbers: Vec<i32> = Vec::new();
    numbers.push(1);
    numbers.push(2);
    numbers.push(3);
    numbers.extend([4, 5, 6]);

    println!("Length: {}", numbers.len());
    println!("First: {:?}", numbers.first());
    println!("Last: {:?}", numbers.last());

    // Indexing (panics on out of bounds)
    let third = numbers[2];

    // Safe indexing with get()
    match numbers.get(10) {
        Some(val) => println!("Got: {}", val),
        None => println!("Index out of bounds"),
    }

    numbers.sort();
    numbers.dedup();       // remove consecutive duplicates
    numbers.retain(|&x| x % 2 == 0); // keep only even

    // HashMap<K, V>
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert(String::from("Alice"), 95);
    scores.insert(String::from("Bob"), 87);
    scores.insert(String::from("Charlie"), 91);

    // entry API — insert if not present
    scores.entry(String::from("Dave")).or_insert(75);
    scores.entry(String::from("Alice")).or_insert(0); // Alice already exists, no change

    // Word count example
    let text = "hello world hello rust world hello";
    let mut word_count: HashMap<&str, i32> = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", word_count);
}`,
            },
            {
              h3: 'Smart Pointers: Box<T>, Rc<T>, and RefCell<T>',
              code: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    // Box<T> — heap allocation, single owner
    let boxed = Box::new(5);
    println!("boxed value: {}", boxed);

    // Box is necessary for recursive types
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }
    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));

    // Rc<T> — reference-counted, multiple owners (single-threaded only)
    let a = Rc::new(5);
    let b = Rc::clone(&a); // increment reference count
    let c = Rc::clone(&a);
    println!("a={}, b={}, c={}", a, b, c);
    println!("Reference count: {}", Rc::strong_count(&a)); // 3

    // RefCell<T> — interior mutability (runtime borrow checking)
    let shared = Rc::new(RefCell::new(vec![1, 2, 3]));
    let clone1 = Rc::clone(&shared);
    let clone2 = Rc::clone(&shared);

    clone1.borrow_mut().push(4); // runtime borrow check
    clone2.borrow_mut().push(5);
    println!("{:?}", shared.borrow()); // [1, 2, 3, 4, 5]
}`,
            },
          ],
        },
        {
          id: 'concurrency',
          h2: 'Concurrency: Threads, Arc, Mutex, and Channels',
          body: `Rust's ownership system prevents data races at compile time. The type system ensures that unsafe concurrent access to shared state is impossible without explicit synchronization.`,
          subsections: [
            {
              h3: 'Threads and Arc<Mutex<T>>',
              code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Spawning threads
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("Thread: {}", i);
            thread::sleep(std::time::Duration::from_millis(1));
        }
    });

    for i in 1..3 {
        println!("Main: {}", i);
    }

    handle.join().unwrap(); // wait for thread to finish

    // Sharing data with Arc<Mutex<T>>
    // Arc = Atomic Reference Count (thread-safe Rc)
    // Mutex = Mutual Exclusion (only one thread can access at a time)
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap()); // 10
}`,
            },
            {
              h3: 'Message Passing with Channels',
              code: `use std::sync::mpsc; // multiple producer, single consumer
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Clone transmitter for multiple producers
    let tx1 = tx.clone();
    let tx2 = tx;

    thread::spawn(move || {
        let messages = vec!["hi", "from", "thread", "1"];
        for msg in messages {
            tx1.send(msg).unwrap();
            thread::sleep(Duration::from_millis(100));
        }
    });

    thread::spawn(move || {
        let messages = vec!["more", "from", "thread", "2"];
        for msg in messages {
            tx2.send(msg).unwrap();
            thread::sleep(Duration::from_millis(200));
        }
    });

    // Receive all messages (blocks until all senders drop)
    for received in rx {
        println!("Received: {}", received);
    }
}`,
            },
            {
              h3: 'The Send and Sync Marker Traits',
              code: `// Send — safe to transfer ownership between threads
// Sync — safe to share references between threads (&T is Send if T: Sync)

// Arc<T> is Send + Sync if T is Send + Sync
// Mutex<T> is Send + Sync if T is Send

// This won't compile — Rc is NOT Send (not thread-safe reference counting)
// use std::rc::Rc;
// let rc = Rc::new(5);
// thread::spawn(move || { println!("{}", rc); }); // ERROR

// This works — Arc IS Send
use std::sync::Arc;
let arc = Arc::new(5);
thread::spawn(move || { println!("{}", arc); }).join().unwrap();

// Raw pointers are neither Send nor Sync
// You can manually mark types as Send/Sync with unsafe impl
// but this should be done carefully`,
            },
          ],
        },
        {
          id: 'comparison',
          h2: 'Rust vs C++ vs Go: A Comparison',
          body: `Rust occupies a unique space in the systems programming landscape. Here is how it compares to the two most common alternatives.`,
        },
      ],
    },
  },
  zh: {
    title: 'Rust 基础教程：所有权、借用、生命周期与系统编程',
    description:
      '全面介绍 Rust 编程语言核心概念 — 所有权、借用、生命周期、特征、错误处理、并发等。学习 Rust 为何是系统编程的未来。',
    content: {
      intro: `Rust 是一门系统编程语言，运行速度极快，能防止段错误，并保证线程安全。自 2015 年发布 1.0 版本以来，Rust 在 Stack Overflow 开发者调查中连续八年被评为最受喜爱的编程语言。本指南将带你深入了解使 Rust 独特且强大的核心概念。`,
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Rust different from C and C++?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust provides memory safety guarantees at compile time through its ownership system, eliminating entire categories of bugs like null pointer dereferences, use-after-free, and data races — without needing a garbage collector. C and C++ rely on programmer discipline for memory safety, while Rust enforces it automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Rust hard to learn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust has a steeper learning curve than Go or Python, primarily because of the ownership and borrow checker concepts. However, most developers report that once these concepts click, they become second nature. The Rust Book (doc.rust-lang.org/book) and the Rustlings exercises are excellent free learning resources.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use Rust vs Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Rust when you need maximum performance, low-level control, or safety-critical systems — OS kernels, embedded systems, game engines, or WebAssembly. Use Go when you need fast development cycles, simple concurrency, and network services — microservices, CLI tools, DevOps utilities.',
      },
    },
    {
      '@type': 'Question',
      name: "What is the borrow checker in Rust?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The borrow checker is the Rust compiler component that enforces ownership rules at compile time. It ensures that: (1) references don't outlive the data they refer to, (2) you don't have both mutable and immutable references simultaneously, and (3) there's at most one mutable reference at a time. This eliminates memory bugs without runtime overhead.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is async/await in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust supports async/await syntax for writing asynchronous code. The async keyword transforms a function into one returning a Future. The await keyword suspends execution until a Future is resolved. Rust does not include an async runtime by default — you typically use Tokio or async-std. Unlike Go, Rust async is zero-cost and does not require separate OS threads.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Rust used for in production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust is used in production for: systems programming (OS components, drivers), WebAssembly (Figma, game engines), networking (Cloudflare workers, AWS Firecracker), databases (TiKV, Neon), CLI tools (ripgrep, fd, bat, exa), game development (Bevy engine), and embedded systems. Major adopters include Microsoft, Google, Amazon, Meta, Discord, and Dropbox.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Rust handle null values?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust has no null keyword. Instead, it uses the Option<T> enum with two variants: Some(T) when a value exists, and None when it does not. This forces you to explicitly handle the absence of a value, eliminating null pointer dereferences entirely. You handle Option using match, if let, unwrap_or, map, and the ? operator.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is cargo and how do I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cargo is the official Rust build tool and package manager. Key commands: cargo new project_name (create project), cargo build (compile), cargo run (compile and run), cargo test (run tests), cargo add crate_name (add dependency), cargo doc --open (generate docs), cargo publish (publish to crates.io). Dependencies are declared in Cargo.toml and automatically downloaded from crates.io.',
      },
    },
  ],
};

export default function RustBasicsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const codeStyle: React.CSSProperties = {
    display: 'block',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    overflowX: 'auto',
    marginTop: '0.75rem',
    marginBottom: '1.25rem',
    border: '1px solid #1e293b',
    whiteSpace: 'pre',
  };

  const inlineCodeStyle: React.CSSProperties = {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    padding: '0.15em 0.4em',
    borderRadius: '4px',
    fontFamily: '"Fira Code", Consolas, monospace',
    fontSize: '0.875em',
    border: '1px solid #e2e8f0',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#0f172a',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#1e293b',
    marginTop: '1.75rem',
    marginBottom: '0.75rem',
  };

  const paragraphStyle: React.CSSProperties = {
    color: '#374151',
    lineHeight: '1.75',
    marginBottom: '1rem',
    fontSize: '1rem',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    color: '#374151',
    border: '1px solid #e2e8f0',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    color: '#4b5563',
    verticalAlign: 'top',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    backgroundColor: '#f8fafc',
  };

  return (
    <article
      style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        color: '#1a202c',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1
        style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: '1.3',
          marginBottom: '1rem',
        }}
      >
        {t.title}
      </h1>

      <p
        style={{
          fontSize: '1.15rem',
          color: '#475569',
          lineHeight: '1.7',
          marginBottom: '1.5rem',
        }}
      >
        {t.description}
      </p>

      {/* TL;DR Box */}
      <div
        style={{
          backgroundColor: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}
      >
        <strong
          style={{
            display: 'block',
            fontSize: '1rem',
            color: '#0369a1',
            marginBottom: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          TL;DR
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.65' }}>
          {isZh
            ? 'Rust 通过编译时所有权系统实现内存安全，无需垃圾回收器，同时保持 C/C++ 级别的性能。核心概念包括：所有权（每个值只有一个所有者）、借用（通过引用临时访问数据）、生命周期（确保引用始终有效）。掌握这三个概念，你就能写出安全、高效的系统级代码。'
            : 'Rust achieves memory safety through a compile-time ownership system — no garbage collector required — while matching C/C++ performance. The three key concepts are: ownership (each value has exactly one owner), borrowing (temporary access via references), and lifetimes (ensuring references remain valid). Master these three and you can write safe, blazing-fast systems code.'}
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <strong
          style={{
            display: 'block',
            fontSize: '1rem',
            color: '#374151',
            marginBottom: '0.75rem',
          }}
        >
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#4b5563', lineHeight: '1.8' }}>
          {isZh ? (
            <>
              <li>所有权规则：每个值只有一个所有者；所有者离开作用域时值被自动释放</li>
              <li>借用规则：可以有多个不可变引用，或者恰好一个可变引用，但不能同时存在</li>
              <li>生命周期注解确保引用不会比它引用的数据存活更长时间</li>
              <li>Result&lt;T, E&gt; 和 Option&lt;T&gt; 替代异常和 null，使错误处理显式化</li>
              <li>特征（Trait）提供多态性，无需继承；泛型提供零成本抽象</li>
              <li>Arc&lt;Mutex&lt;T&gt;&gt; 用于多线程共享状态；通道用于消息传递</li>
              <li>Cargo 统一管理构建、测试、依赖和发布</li>
            </>
          ) : (
            <>
              <li>Ownership rule: each value has one owner; value is dropped when owner goes out of scope</li>
              <li>Borrow rules: many immutable refs OR exactly one mutable ref — never both simultaneously</li>
              <li>Lifetime annotations ensure references never outlive the data they point to</li>
              <li>Result&lt;T, E&gt; and Option&lt;T&gt; replace exceptions and null for explicit error handling</li>
              <li>Traits provide polymorphism without inheritance; generics provide zero-cost abstractions</li>
              <li>Arc&lt;Mutex&lt;T&gt;&gt; for shared state across threads; channels for message passing</li>
              <li>Cargo unifies building, testing, dependency management, and publishing</li>
            </>
          )}
        </ul>
      </div>

      {/* Introduction */}
      <p style={paragraphStyle}>{t.content.intro}</p>

      {/* Why Rust */}
      <h2 style={h2Style}>
        {isZh ? '为什么选择 Rust？无 GC 的内存安全、性能与并发' : 'Why Rust? Memory Safety Without GC, Performance, and Concurrency'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? '大多数编程语言在两条路径中选择其一：手动内存管理（C、C++）追求性能，或垃圾回收（Go、Java、Python）追求安全。Rust 走第三条路——通过所有权系统在编译时强制保证内存安全，零运行时开销。'
          : 'Most programming languages choose one of two paths: manual memory management (C, C++) for performance, or garbage collection (Go, Java, Python) for safety. Rust takes a third path — memory safety enforced at compile time through the ownership system, with zero runtime cost.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Rust 的三大支柱' : 'The Three Pillars of Rust'}</h3>
      <p style={paragraphStyle}>
        {isZh ? 'Rust 建立在三个核心承诺之上：' : 'Rust is built on three core promises:'}
      </p>
      <ul style={{ color: '#374151', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {isZh ? (
          <>
            <li><strong>内存安全</strong> — 无空指针解引用、无释放后使用、无缓冲区溢出</li>
            <li><strong>线程安全</strong> — 数据竞争是编译错误，不是运行时崩溃</li>
            <li><strong>零成本抽象</strong> — 高级代码编译成与手写 C 一样高效的机器码</li>
          </>
        ) : (
          <>
            <li><strong>Memory safety</strong> — no null pointer dereferences, no use-after-free, no buffer overflows</li>
            <li><strong>Thread safety</strong> — data races are a compile error, not a runtime crash</li>
            <li><strong>Zero-cost abstractions</strong> — high-level code compiles to machine code as efficient as hand-written C</li>
          </>
        )}
      </ul>

      {/* Ownership */}
      <h2 style={h2Style}>
        {isZh ? '所有权系统：规则、移动语义与 Copy 特征' : 'The Ownership System: Rules, Move Semantics, and the Copy Trait'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? '所有权是 Rust 最独特的特性和核心创新。Rust 中的每个值都有一个称为所有者的变量，当所有者超出作用域时，值会被自动丢弃（释放）。'
          : 'Ownership is Rust\'s most unique feature and central innovation. Every value in Rust has a single owner, and when that owner goes out of scope, the value is automatically dropped (freed).'}
      </p>

      <h3 style={h3Style}>{isZh ? '三条所有权规则' : 'The Three Ownership Rules'}</h3>
      <ol style={{ color: '#374151', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {isZh ? (
          <>
            <li>Rust 中的每个值都有一个称为其所有者的变量。</li>
            <li>同一时刻只能有一个所有者。</li>
            <li>当所有者超出作用域时，值将被丢弃。</li>
          </>
        ) : (
          <>
            <li>Each value in Rust has a variable called its owner.</li>
            <li>There can only be one owner at a time.</li>
            <li>When the owner goes out of scope, the value will be dropped.</li>
          </>
        )}
      </ol>

      <code style={codeStyle}>{`fn main() {
    // s1 owns the String
    let s1 = String::from("hello");

    // Ownership moves from s1 to s2
    let s2 = s1;

    // ERROR: s1 is no longer valid — it was moved
    // println!("{}", s1); // error[E0382]: borrow of moved value: \`s1\`

    // s2 is valid
    println!("{}", s2); // "hello"
} // s2 is dropped here, memory is freed`}</code>

      <h3 style={h3Style}>{isZh ? '移动语义 vs 复制语义' : 'Move Semantics vs Copy Semantics'}</h3>
      <p style={paragraphStyle}>
        {isZh
          ? '堆分配类型如 String 和 Vec 默认会移动。只在栈上的类型（实现了 Copy 特征）则会被复制，原始变量仍然有效。'
          : 'Heap-allocated types like String and Vec are moved by default. Stack-only types that implement the Copy trait are copied instead, so the original remains valid.'}
      </p>

      <code style={codeStyle}>{`fn main() {
    // i32 implements Copy — both variables are valid
    let x = 5;
    let y = x;
    println!("x = {}, y = {}", x, y); // both work!

    // String does NOT implement Copy — it moves
    let s1 = String::from("world");
    let s2 = s1; // s1 is moved into s2
    // println!("{}", s1); // compile error!

    // To keep both, use .clone()
    let s3 = String::from("clone me");
    let s4 = s3.clone(); // deep copy
    println!("s3 = {}, s4 = {}", s3, s4); // both work
}

// Types that implement Copy: i32, f64, bool, char, tuples of Copy types
// Types that do NOT: String, Vec<T>, Box<T>, any type owning heap data`}</code>

      {/* Borrowing */}
      <h2 style={h2Style}>
        {isZh ? '借用与引用：&T、&mut T 与借用检查器' : 'Borrowing and References: &T, &mut T, and the Borrow Checker'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? '不转移所有权而是借用值，可以通过创建引用来实现。引用让你可以引用一个值而不取得它的所有权。'
          : 'Instead of transferring ownership, you can borrow a value by creating a reference. References allow you to refer to a value without taking ownership of it.'}
      </p>

      <h3 style={h3Style}>{isZh ? '不可变引用 (&T)' : 'Immutable References (&T)'}</h3>
      <code style={codeStyle}>{`fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // borrow s1, don't move it
    println!("Length of '{}' is {}.", s1, len);
    // s1 is still valid!

    // Multiple immutable borrows are fine
    let r1 = &s1;
    let r2 = &s1;
    println!("{} and {}", r1, r2); // both valid simultaneously
}`}</code>

      <h3 style={h3Style}>{isZh ? '可变引用 (&mut T)' : 'Mutable References (&mut T)'}</h3>
      <p style={paragraphStyle}>
        {isZh
          ? '关键规则：同一时刻对同一数据只能有一个可变引用，且不能在同一作用域内混用可变和不可变引用。'
          : 'The critical rule: you can only have ONE mutable reference to a piece of data at a time, and you cannot mix mutable and immutable references in the same scope.'}
      </p>

      <code style={codeStyle}>{`fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s); // "hello, world"

    // ERROR: Cannot have two mutable references at once
    // let r1 = &mut s;
    // let r2 = &mut s; // error[E0499]: cannot borrow \`s\` as mutable more than once

    // NLL (Non-Lexical Lifetimes) — borrow ends at last use
    let r3 = &s;           // immutable borrow starts
    let r4 = &s;           // another immutable borrow
    println!("{} and {}", r3, r4); // r3 and r4 last used here
    // r3 and r4 are no longer active
    let r5 = &mut s;       // mutable borrow is now OK
    r5.push_str("!");
}`}</code>

      {/* Lifetimes */}
      <h2 style={h2Style}>
        {isZh ? "生命周期：'a、生命周期省略与 'static" : "Lifetimes: 'a, Lifetime Elision, and 'static"}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? '生命周期是 Rust 确保引用在使用期间始终有效的方式。大多数情况下编译器可以自动推断生命周期（生命周期省略），但有时需要显式注解。'
          : "Lifetimes are Rust's way of ensuring that references remain valid for as long as they are used. In most cases the compiler infers lifetimes automatically (lifetime elision), but sometimes explicit annotation is required."}
      </p>

      <code style={codeStyle}>{`// Explicit lifetime annotation needed:
// Rust can't know if the return references x or y without 'a
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Lifetime in structs
struct Important<'a> {
    part: &'a str, // part must live at least as long as Important
}

impl<'a> Important<'a> {
    fn level(&self) -> usize { 3 }
}

// 'static lifetime — lives for the entire program
fn static_example() -> &'static str {
    "I am always valid" // string literals are 'static
}

fn main() {
    let string1 = String::from("long string");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("Longest: {}", result); // OK — both strings live here
    }
    // println!("{}", result); // ERROR if uncommented — string2 dropped
}`}</code>

      {/* Structs and Enums */}
      <h2 style={h2Style}>
        {isZh ? 'Structs 与 Enums：impl 块、方法与关联函数' : 'Structs and Enums: impl Blocks, Methods, and Associated Functions'}
      </h2>

      <code style={codeStyle}>{`#[derive(Debug, Clone)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Associated function (constructor) — Rectangle::new(30, 50)
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }

    // Method — rect.area()
    fn area(&self) -> u32 { self.width * self.height }
    fn perimeter(&self) -> u32 { 2 * (self.width + self.height) }
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // Mutable method
    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }
}

// Enums with data
#[derive(Debug)]
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle { base: f64, height: f64 }, // named fields
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle { base, height } => 0.5 * base * height,
        }
    }
}

fn main() {
    let mut r = Rectangle::new(30, 50);
    println!("Area: {}, Perimeter: {}", r.area(), r.perimeter());
    r.scale(2);
    println!("Scaled: {:?}", r);

    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle { base: 6.0, height: 4.0 },
    ];
    for s in &shapes {
        println!("{:?} => area {:.2}", s, s.area());
    }
}`}</code>

      {/* Pattern Matching */}
      <h2 style={h2Style}>
        {isZh ? '模式匹配：match、if let、while let 与解构' : 'Pattern Matching: match, if let, while let, and Destructuring'}
      </h2>

      <code style={codeStyle}>{`fn describe_number(n: i32) -> &'static str {
    match n {
        0           => "zero",
        1 | 2 | 3   => "small positive",
        4..=9       => "medium",
        10..=99     => "large",
        n if n < 0  => "negative",
        _           => "huge",
    }
}

fn main() {
    // Exhaustive matching — compiler forces all cases
    let val: Option<i32> = Some(42);

    // match
    match val {
        Some(n) if n > 100 => println!("Big: {}", n),
        Some(n)            => println!("Got: {}", n),
        None               => println!("Nothing"),
    }

    // if let — concise single-branch match
    if let Some(n) = val {
        println!("Shorthand: {}", n);
    }

    // while let — pop from stack until empty
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        print!("{} ", top); // 3 2 1
    }
    println!();

    // Destructuring tuples, structs
    let point = (3, 7);
    let (x, y) = point;
    println!("x={}, y={}", x, y);

    struct Pt { x: i32, y: i32 }
    let p = Pt { x: 10, y: 20 };
    let Pt { x, y } = p;
    println!("x={}, y={}", x, y);

    // @ bindings — bind while testing
    let num = 15;
    match num {
        n @ 1..=12  => println!("Month: {}", n),
        n @ 13..=19 => println!("Teen: {}", n),
        n           => println!("Other: {}", n),
    }
}`}</code>

      {/* Error Handling */}
      <h2 style={h2Style}>
        {isZh ? '错误处理：Result<T, E>、Option<T>、? 运算符与自定义错误' : 'Error Handling: Result<T, E>, Option<T>, ? Operator, and Custom Errors'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? 'Rust 没有异常。它使用 Result<T, E> 和 Option<T> 类型表示可能失败的操作，使错误处理显式且可组合。'
          : 'Rust has no exceptions. It uses Result<T, E> and Option<T> types to represent fallible operations, making error handling explicit and composable.'}
      </p>

      <code style={codeStyle}>{`use std::fs::File;
use std::io::{self, Read};
use std::num::ParseIntError;
use std::fmt;

// ? operator — propagates errors automatically
fn read_file(path: &str) -> Result<String, io::Error> {
    let mut contents = String::new();
    File::open(path)?.read_to_string(&mut contents)?;
    Ok(contents)
}

// Custom error type
#[derive(Debug)]
enum AppError {
    Parse(ParseIntError),
    OutOfRange(i32),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::Parse(e)      => write!(f, "parse error: {}", e),
            AppError::OutOfRange(n) => write!(f, "{} is out of valid range", n),
        }
    }
}

// From trait enables automatic conversion with ?
impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self { AppError::Parse(e) }
}

fn validate_age(s: &str) -> Result<u8, AppError> {
    let age: i32 = s.trim().parse()?; // ParseIntError -> AppError via From
    if !(0..=150).contains(&age) {
        return Err(AppError::OutOfRange(age));
    }
    Ok(age as u8)
}

fn main() {
    // unwrap_or, unwrap_or_else, map, and_then
    let age = validate_age("25").unwrap_or(0);
    let doubled = validate_age("21").map(|a| a * 2).unwrap_or(0);

    // and_then chains Results
    let result = validate_age("30")
        .and_then(|a| if a > 18 { Ok(a) } else { Err(AppError::OutOfRange(a as i32)) });

    for input in &["25", "-5", "200", "abc"] {
        match validate_age(input) {
            Ok(a)  => println!("Valid age: {}", a),
            Err(e) => println!("Error for {:?}: {}", input, e),
        }
    }
}`}</code>

      {/* Traits */}
      <h2 style={h2Style}>
        {isZh ? '特征（Traits）：定义、实现、特征对象与泛型' : 'Traits: Defining, Implementing, Trait Objects, and Generics'}
      </h2>

      <code style={codeStyle}>{`use std::fmt::Display;

trait Summary {
    fn summarize_author(&self) -> String; // required
    fn summarize(&self) -> String {       // default implementation
        format!("(Read more from {}...)", self.summarize_author())
    }
}

struct Article {
    title: String,
    author: String,
    content: String,
}

impl Summary for Article {
    fn summarize_author(&self) -> String { self.author.clone() }
    fn summarize(&self) -> String {
        format!("{}, by {} — {}", self.title, self.author, &self.content[..50])
    }
}

// Trait bounds — static dispatch (monomorphization, zero overhead)
fn notify<T: Summary + Display>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Where clause for readability
fn complex<T, U>(t: &T, u: &U)
where
    T: Summary + Clone,
    U: Summary + std::fmt::Debug,
{
    println!("{} {}", t.summarize(), u.summarize());
}

// Trait objects — dynamic dispatch (runtime polymorphism)
fn notify_all(items: &[Box<dyn Summary>]) {
    for item in items {
        println!("{}", item.summarize());
    }
}

// Returning trait objects
fn make_summarizable(is_article: bool) -> Box<dyn Summary> {
    if is_article {
        Box::new(Article {
            title: String::from("Rust Is Amazing"),
            author: String::from("Ferris"),
            content: String::from("Rust achieves memory safety without GC..."),
        })
    } else {
        // Some other type implementing Summary
        Box::new(Article {
            title: String::from("Default"),
            author: String::from("Anonymous"),
            content: String::from("Content here..."),
        })
    }
}`}</code>

      {/* Iterators and Closures */}
      <h2 style={h2Style}>
        {isZh ? '迭代器与闭包：map、filter、collect 与链式调用' : 'Iterators and Closures: map, filter, collect, and Chaining'}
      </h2>

      <code style={codeStyle}>{`fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Lazy iterator chain — no work until consumed
    let sum: i32 = numbers
        .iter()
        .filter(|&&x| x % 2 == 0)  // keep evens: 2,4,6,8,10
        .map(|&x| x * x)            // square: 4,16,36,64,100
        .sum();                     // consume: 220
    println!("Sum of even squares: {}", sum);

    // Collect into Vec
    let strings: Vec<String> = (1..=5)
        .map(|n| format!("item_{}", n))
        .collect();
    println!("{:?}", strings);

    // zip — pair two iterators
    let names = vec!["Alice", "Bob", "Charlie"];
    let scores = vec![95, 87, 91];
    let paired: Vec<_> = names.iter().zip(scores.iter()).collect();
    println!("{:?}", paired);

    // flat_map
    let sentences = vec!["hello world", "foo bar"];
    let words: Vec<&str> = sentences.iter()
        .flat_map(|s| s.split_whitespace())
        .collect();
    println!("{:?}", words);

    // fold — general accumulator
    let product: i32 = (1..=5).fold(1, |acc, x| acc * x);
    println!("5! = {}", product);

    // Closures capturing environment
    let threshold = 5;
    let above_threshold: Vec<_> = numbers.iter()
        .filter(|&&x| x > threshold) // captures threshold
        .collect();
    println!("{:?}", above_threshold);

    // Custom iterator with take_while and skip_while
    let partitioned: Vec<_> = numbers.iter()
        .skip_while(|&&x| x < 3)  // skip until x >= 3
        .take_while(|&&x| x < 8)  // take until x >= 8
        .collect();
    println!("{:?}", partitioned); // [3, 4, 5, 6, 7]
}`}</code>

      {/* Cargo */}
      <h2 style={h2Style}>
        {isZh ? 'Cargo 与 Crates：Cargo.toml、crates.io 与工作区' : 'Cargo and Crates: Cargo.toml, crates.io, and Workspaces'}
      </h2>

      <code style={codeStyle}>{`# Cargo.toml — project manifest

[package]
name = "my_app"
version = "0.1.0"
edition = "2021"
description = "My awesome Rust application"
license = "MIT OR Apache-2.0"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
anyhow = "1.0"
clap = { version = "4", features = ["derive"] }
log = "0.4"
env_logger = "0.10"

[dev-dependencies]
criterion = "0.5"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1

# Workspace Cargo.toml (monorepo)
# [workspace]
# members = ["app", "core-lib", "api-types"]
# resolver = "2"`}</code>

      <code style={codeStyle}>{`# Key Cargo commands

cargo new my_project             # new binary project
cargo new my_lib --lib           # new library project
cargo init                       # init in existing directory

cargo build                      # debug build (fast compile)
cargo build --release            # optimized build
cargo run -- --arg value         # build and run with args
cargo test                       # run all tests
cargo test my_test_name          # run specific test
cargo test -- --nocapture        # show stdout from tests
cargo bench                      # run benchmarks
cargo doc --open                 # generate + open docs
cargo fmt                        # format code (rustfmt)
cargo clippy                     # lint with Clippy
cargo check                      # type-check without compiling
cargo add serde --features derive # add dependency
cargo update                     # update Cargo.lock`}</code>

      {/* Standard Library */}
      <h2 style={h2Style}>
        {isZh ? '标准库：Vec、HashMap、String vs &str 与 Box<T>' : 'Standard Library: Vec, HashMap, String vs &str, and Box<T>'}
      </h2>

      <code style={codeStyle}>{`use std::collections::HashMap;

fn main() {
    // ============ String vs &str ============
    let literal: &str = "static string"; // &str — immutable slice, stack
    let owned: String = String::from("heap string"); // String — heap, mutable
    let also_owned: String = "convert".to_string();
    let slice: &str = &owned;           // String to &str via deref coercion

    // String operations
    let mut s = String::new();
    s.push_str("hello");
    s.push(' ');
    s += "world";
    let upper = s.to_uppercase();
    let words: Vec<&str> = s.split_whitespace().collect();
    let contains_hello = s.contains("hello");
    let replaced = s.replace("world", "Rust");

    // ============ Vec<T> ============
    let mut v: Vec<i32> = vec![3, 1, 4, 1, 5, 9, 2, 6];
    v.push(7);
    v.extend([8, 10]);
    v.sort();
    v.dedup();
    v.retain(|&x| x > 3);
    let sum: i32 = v.iter().sum();
    let safe_get: Option<&i32> = v.get(100); // None, not panic

    // ============ HashMap<K, V> ============
    let mut map: HashMap<&str, Vec<i32>> = HashMap::new();
    map.entry("alice").or_insert_with(Vec::new).push(95);
    map.entry("alice").or_insert_with(Vec::new).push(87);
    map.entry("bob").or_insert_with(Vec::new).push(91);

    for (name, scores) in &map {
        let avg: f64 = scores.iter().sum::<i32>() as f64 / scores.len() as f64;
        println!("{}: avg {:.1}", name, avg);
    }

    // ============ Box<T> — heap allocation ============
    let boxed: Box<i32> = Box::new(42);
    println!("Boxed: {}", *boxed); // deref coercion

    // Box enables recursive types
    enum Tree {
        Leaf(i32),
        Node(Box<Tree>, Box<Tree>),
    }
    let tree = Tree::Node(
        Box::new(Tree::Leaf(1)),
        Box::new(Tree::Leaf(2)),
    );
}`}</code>

      {/* Concurrency */}
      <h2 style={h2Style}>
        {isZh ? '并发：线程、Arc、Mutex 与通道' : 'Concurrency: Threads, Arc, Mutex, and Channels'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? 'Rust 的所有权系统在编译时防止数据竞争。类型系统确保对共享状态的不安全并发访问在没有显式同步的情况下是不可能的。'
          : "Rust's ownership system prevents data races at compile time. The type system ensures that unsafe concurrent access to shared state is impossible without explicit synchronization."}
      </p>

      <code style={codeStyle}>{`use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc;

fn main() {
    // ============ Basic threads ============
    let handle = thread::spawn(|| {
        println!("Hello from spawned thread!");
    });
    handle.join().unwrap();

    // move closure — take ownership of captured values
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("Thread has data: {:?}", data);
    });
    handle.join().unwrap();

    // ============ Arc<Mutex<T>> — shared mutable state ============
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        let h = thread::spawn(move || {
            let mut num = c.lock().unwrap(); // blocks until lock acquired
            *num += 1;
        }); // lock released automatically when num goes out of scope
        handles.push(h);
    }
    for h in handles { h.join().unwrap(); }
    println!("Counter: {}", *counter.lock().unwrap()); // 10

    // ============ Message passing with channels ============
    let (tx, rx) = mpsc::channel::<String>();
    let tx2 = tx.clone();

    thread::spawn(move || {
        tx.send(String::from("Message from thread 1")).unwrap();
    });
    thread::spawn(move || {
        tx2.send(String::from("Message from thread 2")).unwrap();
    });

    // rx is an iterator over received values
    for _ in 0..2 {
        let msg = rx.recv().unwrap(); // blocks until message arrives
        println!("Received: {}", msg);
    }
}`}</code>

      {/* Comparison Table */}
      <h2 style={h2Style}>
        {isZh ? 'Rust vs C++ vs Go 对比' : 'Rust vs C++ vs Go Comparison'}
      </h2>
      <p style={paragraphStyle}>
        {isZh
          ? 'Rust 在系统编程领域占据独特位置。以下是与两种最常见替代品的比较：'
          : 'Rust occupies a unique space in the systems programming landscape. Here is how it compares to the two most common alternatives:'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Rust</th>
              <th style={thStyle}>C++</th>
              <th style={thStyle}>Go</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{isZh ? '内存管理' : 'Memory management'}</td>
              <td style={tdStyle}>{isZh ? '所有权（编译时）' : 'Ownership (compile-time)'}</td>
              <td style={tdStyle}>{isZh ? '手动 + RAII' : 'Manual + RAII'}</td>
              <td style={tdStyle}>{isZh ? '垃圾回收' : 'Garbage collected'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '内存安全' : 'Memory safety'}</td>
              <td style={tdAltStyle}>{isZh ? '强（编译时保证）' : 'Strong (compile-time guaranteed)'}</td>
              <td style={tdAltStyle}>{isZh ? '弱（程序员负责）' : 'Weak (programmer responsibility)'}</td>
              <td style={tdAltStyle}>{isZh ? '强（GC 保证）' : 'Strong (GC guaranteed)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '性能' : 'Performance'}</td>
              <td style={tdStyle}>{isZh ? '极快（媲美 C）' : 'Blazing fast (C-comparable)'}</td>
              <td style={tdStyle}>{isZh ? '极快（C 级别）' : 'Blazing fast (C-level)'}</td>
              <td style={tdStyle}>{isZh ? '快（GC 暂停）' : 'Fast (GC pauses)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '并发' : 'Concurrency'}</td>
              <td style={tdAltStyle}>{isZh ? '编译时数据竞争预防' : 'Compile-time data race prevention'}</td>
              <td style={tdAltStyle}>{isZh ? '不安全（无保证）' : 'Unsafe (no guarantees)'}</td>
              <td style={tdAltStyle}>{isZh ? 'Goroutines（运行时调度）' : 'Goroutines (runtime scheduler)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '学习曲线' : 'Learning curve'}</td>
              <td style={tdStyle}>{isZh ? '陡峭（借用检查器）' : 'Steep (borrow checker)'}</td>
              <td style={tdStyle}>{isZh ? '非常陡峭' : 'Very steep'}</td>
              <td style={tdStyle}>{isZh ? '平缓' : 'Gentle'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '编译速度' : 'Compile speed'}</td>
              <td style={tdAltStyle}>{isZh ? '慢（增量编译可改善）' : 'Slow (incremental improves)'}</td>
              <td style={tdAltStyle}>{isZh ? '慢（取决于模板）' : 'Slow (template-dependent)'}</td>
              <td style={tdAltStyle}>{isZh ? '极快' : 'Very fast'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '包管理' : 'Package manager'}</td>
              <td style={tdStyle}>{isZh ? 'Cargo（优秀）' : 'Cargo (excellent)'}</td>
              <td style={tdStyle}>{isZh ? '无官方（vcpkg/conan）' : 'No official (vcpkg/conan)'}</td>
              <td style={tdStyle}>{isZh ? 'Go modules（内置）' : 'Go modules (built-in)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '空安全' : 'Null safety'}</td>
              <td style={tdAltStyle}>{isZh ? 'Option<T>（无 null）' : 'Option<T> (no null)'}</td>
              <td style={tdAltStyle}>{isZh ? '无（std::optional 可选）' : 'None (std::optional optional)'}</td>
              <td style={tdAltStyle}>{isZh ? '无（nil 存在）' : 'None (nil exists)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '异常处理' : 'Error handling'}</td>
              <td style={tdStyle}>{isZh ? 'Result<T,E>（显式）' : 'Result<T,E> (explicit)'}</td>
              <td style={tdStyle}>{isZh ? '异常（throw/catch）' : 'Exceptions (throw/catch)'}</td>
              <td style={tdStyle}>{isZh ? '多返回值（error 接口）' : 'Multiple returns (error interface)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '适用场景' : 'Best for'}</td>
              <td style={tdAltStyle}>{isZh ? 'OS、嵌入式、WebAssembly、CLI' : 'OS, embedded, WebAssembly, CLI'}</td>
              <td style={tdAltStyle}>{isZh ? '游戏引擎、驱动、高性能' : 'Game engines, drivers, HPC'}</td>
              <td style={tdAltStyle}>{isZh ? '微服务、网络、DevOps 工具' : 'Microservices, networking, DevOps'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{isZh ? '常见问题解答（FAQ）' : 'Frequently Asked Questions'}</h2>

      {faqSchema.mainEntity.map((faq, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#0f172a',
              marginTop: 0,
              marginBottom: '0.6rem',
            }}
          >
            {faq.name}
          </h3>
          <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.7' }}>
            {faq.acceptedAnswer.text}
          </p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结：Rust 值得学习吗？' : 'Conclusion: Is Rust Worth Learning?'}</h2>
      <p style={paragraphStyle}>
        {isZh
          ? 'Rust 不仅仅是另一门系统编程语言——它代表了软件工程的范式转变。通过在编译时而非运行时强制保证内存安全和线程安全，Rust 让开发者能够编写出其他语言难以实现的既安全又高效的代码。'
          : 'Rust is not just another systems programming language — it represents a paradigm shift in software engineering. By enforcing memory and thread safety at compile time rather than at runtime, Rust enables developers to write code that is both safe and performant in ways that are difficult or impossible to achieve in other languages.'}
      </p>
      <p style={paragraphStyle}>
        {isZh
          ? '学习曲线确实存在，主要体现在理解借用检查器上。但一旦你内化了所有权模型，你会发现它不仅能防止错误，还能帮助你更清晰地思考程序的结构和数据流。Rust 的编译器错误是出了名的有帮助，常常直接告诉你如何修复问题。'
          : 'The learning curve is real, primarily around understanding the borrow checker. But once you internalize the ownership model, you will find that it not only prevents bugs but helps you think more clearly about the structure and data flow of your programs. Rust\'s compiler errors are famously helpful, often telling you exactly how to fix the issue.'}
      </p>
      <p style={paragraphStyle}>
        {isZh
          ? '如果你在 C++ 中遇到内存安全问题，在 Go 中遇到性能瓶颈，或者在构建任何需要可靠、高效和并发的系统——Rust 是你值得认真考虑的选择。'
          : 'If you are hitting memory safety issues in C++, performance ceilings in Go, or building any system where reliability, efficiency, and concurrency matter — Rust is worth serious consideration. The investment in learning pays dividends in code quality and confidence.'}
      </p>

      {/* Resources */}
      <h2 style={h2Style}>{isZh ? '学习资源' : 'Learning Resources'}</h2>
      <ul style={{ color: '#374151', lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>
          <strong>The Rust Book</strong> —{' '}
          <code style={inlineCodeStyle}>doc.rust-lang.org/book</code>{' '}
          {isZh ? '（官方免费教程，最佳入门资料）' : '(official free, the best starting point)'}
        </li>
        <li>
          <strong>Rustlings</strong> —{' '}
          <code style={inlineCodeStyle}>github.com/rust-lang/rustlings</code>{' '}
          {isZh ? '（小型互动练习）' : '(small interactive exercises)'}
        </li>
        <li>
          <strong>Rust by Example</strong> —{' '}
          <code style={inlineCodeStyle}>doc.rust-lang.org/rust-by-example</code>{' '}
          {isZh ? '（代码示例学习）' : '(learn by reading examples)'}
        </li>
        <li>
          <strong>The Rustonomicon</strong> —{' '}
          {isZh ? '（unsafe Rust 的黑暗艺术）' : '(the dark arts of unsafe Rust)'}
        </li>
        <li>
          <strong>crates.io</strong> —{' '}
          {isZh ? '（Rust 的包注册中心）' : '(the Rust package registry)'}
        </li>
        <li>
          <strong>Rust Playground</strong> —{' '}
          <code style={inlineCodeStyle}>play.rust-lang.org</code>{' '}
          {isZh ? '（浏览器中运行 Rust）' : '(run Rust in your browser)'}
        </li>
      </ul>
    </article>
  );
}
