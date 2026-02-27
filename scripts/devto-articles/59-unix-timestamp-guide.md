---
title: "Unix Timestamp Converter: Convert to Date Online — Complete Guide"
tags: unix, timestamp, javascript, devtools
canonical_url: https://viadreams.cc/en/blog/unix-timestamp-online-guide
published: true
---

Convert Unix timestamps to dates and back. Complete guide for JavaScript, Python, Go, and databases.

## What is a Unix Timestamp?

Unix time = seconds elapsed since **1970-01-01 00:00:00 UTC** (the Unix epoch). Current value is ~1.7 billion seconds. JavaScript uses milliseconds (13 digits), while most systems use seconds (10 digits).

## Get Current Timestamp

```javascript
// JavaScript (milliseconds)
Date.now()                           // 1706745600000
Math.floor(Date.now() / 1000)        // 1706745600 (seconds)
```

```python
# Python
import time
time.time()       # 1706745600.123 (float)
int(time.time())  # 1706745600
```

```go
// Go
time.Now().Unix()      // seconds
time.Now().UnixMilli() // milliseconds
```

```bash
# Bash
date +%s  # 1706745600
```

## Convert Timestamp to Date

```javascript
// JavaScript
new Date(1706745600 * 1000).toISOString()     // "2024-02-01T00:00:00.000Z"
new Date(1706745600 * 1000).toLocaleString()  // local timezone
```

```python
# Python
from datetime import datetime, timezone
datetime.fromtimestamp(1706745600)            # local time
datetime.utcfromtimestamp(1706745600)         # UTC (deprecated)
datetime.fromtimestamp(1706745600, tz=timezone.utc)  # UTC (preferred)
```

```go
// Go
t := time.Unix(1706745600, 0)
fmt.Println(t.Format(time.RFC3339))  // "2024-02-01T00:00:00Z"
```

## Convert Date to Timestamp

```javascript
new Date('2024-02-01').getTime() / 1000     // 1706745600
Date.UTC(2024, 1, 1) / 1000                 // 1706745600 (UTC)
```

```python
from datetime import datetime, timezone
datetime(2024, 2, 1, tzinfo=timezone.utc).timestamp()  # 1706745600.0
```

## Milliseconds vs Seconds

| Digits | Type | Example |
|--------|------|---------|
| 10 | Seconds | 1706745600 |
| 13 | Milliseconds | 1706745600000 |

```javascript
// Auto-detect
function normalizeTimestamp(ts) {
  return ts > 1e10 ? Math.floor(ts / 1000) : ts;
}
```

## Database Timestamps

```sql
-- MySQL
SELECT UNIX_TIMESTAMP();                    -- current timestamp
SELECT FROM_UNIXTIME(1706745600);          -- to datetime

-- PostgreSQL
SELECT EXTRACT(EPOCH FROM NOW());           -- current timestamp
SELECT TO_TIMESTAMP(1706745600);           -- to timestamp

-- SQLite
SELECT strftime('%s', 'now');              -- current timestamp
```

## Y2K38 Problem

32-bit signed integers overflow at **2147483647** (2038-01-19 03:14:07 UTC). Modern languages (Python, Go, 64-bit C) and PostgreSQL are already safe. Fix MySQL/MariaDB: use `BIGINT` instead of `INT` for timestamp columns.

## Quick Tool

Use **[DevToolBox Unix Timestamp Converter](https://viadreams.cc/en/tools/unix-timestamp-converter)** — instantly convert between Unix timestamps and human-readable dates.

---

*Convert Unix timestamps instantly with [DevToolBox's free Timestamp Converter](https://viadreams.cc/en/tools/unix-timestamp-converter).*