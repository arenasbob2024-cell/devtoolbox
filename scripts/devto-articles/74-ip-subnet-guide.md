---
title: "IP Subnet Calculator: CIDR Notation & Subnetting Complete Guide"
tags: networking, javascript, python, webdev
canonical_url: https://viadreams.cc/en/blog/ip-subnet-calculator-online-guide
published: true
---

# IP Subnet Calculator: CIDR Notation & Subnetting Complete Guide

Understanding subnetting is a core skill for every developer who works with networking, cloud infrastructure, or DevOps. This guide walks through CIDR notation, subnet masks, and practical code examples in JavaScript and Python.

## What Is CIDR Notation?

CIDR stands for **Classless Inter-Domain Routing**. It expresses an IP address combined with a routing prefix length.

```
192.168.1.0/24
```

The `/24` is the **prefix length** — it means the first 24 bits are the network portion, leaving 8 bits for host addresses.

| CIDR | Subnet Mask     | Usable Hosts |
|------|-----------------|--------------|
| /8   | 255.0.0.0       | 16,777,214   |
| /16  | 255.255.0.0     | 65,534       |
| /24  | 255.255.255.0   | 254          |
| /25  | 255.255.255.128 | 126          |
| /28  | 255.255.255.240 | 14           |
| /30  | 255.255.255.252 | 2            |
| /32  | 255.255.255.255 | 1 (host)     |

> Rule of thumb: every increment of 1 in the prefix halves the number of available hosts.

## Subnet Mask vs. Wildcard Mask

- **Subnet mask**: identifies the network portion — used in traditional routing (e.g., `255.255.255.0`)
- **Wildcard mask**: the inverse of the subnet mask — used in ACLs and OSPF (e.g., `0.0.0.255` for /24)

```
Subnet mask:   255.255.255.0  → binary 11111111.11111111.11111111.00000000
Wildcard mask:   0.0.0.255    → binary 00000000.00000000.00000000.11111111
```

## JavaScript: Calculate Network & Broadcast from CIDR

Here is a pure function — no dependencies needed:

```js
function parseSubnet(cidr) {
  const [ip, prefix] = cidr.split('/');
  const prefixLen = parseInt(prefix, 10);

  const ipParts = ip.split('.').map(Number);
  const ipInt = ipParts.reduce((acc, octet) => (acc << 8) | octet, 0) >>> 0;

  const mask = prefixLen === 0 ? 0 : (~0 << (32 - prefixLen)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;
  const firstHost = prefixLen < 31 ? (network + 1) >>> 0 : network;
  const lastHost  = prefixLen < 31 ? (broadcast - 1) >>> 0 : broadcast;
  const totalHosts = prefixLen >= 31 ? Math.pow(2, 32 - prefixLen) : broadcast - network - 1;

  const intToIp = n =>
    [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');

  return {
    network:       intToIp(network),
    broadcast:     intToIp(broadcast),
    firstHost:     intToIp(firstHost),
    lastHost:      intToIp(lastHost),
    subnetMask:    intToIp(mask),
    wildcardMask:  intToIp(~mask >>> 0),
    totalHosts,
    prefixLength:  prefixLen,
  };
}

console.log(parseSubnet('192.168.1.0/24'));
// {
//   network: '192.168.1.0',
//   broadcast: '192.168.1.255',
//   firstHost: '192.168.1.1',
//   lastHost: '192.168.1.254',
//   subnetMask: '255.255.255.0',
//   wildcardMask: '0.0.0.255',
//   totalHosts: 254,
//   prefixLength: 24
// }
```

## Python: ipaddress Module

Python's standard library `ipaddress` module makes subnet work trivial:

```python
import ipaddress

net = ipaddress.IPv4Network('192.168.1.0/24', strict=False)

print(f"Network:       {net.network_address}")
print(f"Broadcast:     {net.broadcast_address}")
print(f"Subnet mask:   {net.netmask}")
print(f"Wildcard mask: {net.hostmask}")
print(f"Total hosts:   {net.num_addresses - 2}")
print(f"Prefix length: {net.prefixlen}")

# Iterate usable hosts
hosts = list(net.hosts())
print(f"First host: {hosts[0]}")
print(f"Last host:  {hosts[-1]}")

# Check membership
ip = ipaddress.IPv4Address('192.168.1.42')
print(f"{ip} in network: {ip in net}")  # True
```

Checking if two subnets overlap:

```python
a = ipaddress.IPv4Network('10.0.0.0/8')
b = ipaddress.IPv4Network('10.5.0.0/16')
print(a.overlaps(b))  # True
```

## VLSM: Variable Length Subnet Masking

VLSM lets you divide a block into subnets of different sizes — useful when departments have different host requirements.

Example: allocate from `10.1.0.0/16`

| Dept    | Required Hosts | Assigned Subnet    | Prefix |
|---------|----------------|--------------------|--------|
| Servers | 500            | 10.1.0.0/23        | /23    |
| Office  | 100            | 10.1.2.0/25        | /25    |
| IoT     | 30             | 10.1.2.128/27      | /27    |
| Links   | 2              | 10.1.2.160/30      | /30    |

Always assign from largest to smallest to minimize waste.

## Docker Networking

Docker uses `172.17.0.0/16` for its default bridge network, giving containers addresses like `172.17.0.2`, `172.17.0.3`, etc.

```bash
# Inspect Docker network ranges
docker network inspect bridge | grep Subnet

# Create a custom subnet
docker network create --subnet=192.168.100.0/24 my-net

# Run container on that subnet with a fixed IP
docker run --network my-net --ip 192.168.100.10 nginx
```

Common Docker subnet ranges:
- Default bridge: `172.17.0.0/16`
- User-defined networks: `172.18.0.0/16` onwards
- Host-only: `192.168.0.0/20` (Docker Desktop on Mac)

## AWS VPC Basics

AWS VPCs work directly with CIDR blocks:

```
VPC:             10.0.0.0/16      (65,536 addresses)
Public subnet:   10.0.1.0/24     (254 usable hosts)
Private subnet:  10.0.2.0/24     (254 usable hosts)
DB subnet:       10.0.3.0/24     (254 usable hosts)
```

AWS reserves 5 addresses per subnet (network, VPC router, DNS, future, broadcast), so a `/24` yields **251** usable IPs.

Tip: Use `/16` for the VPC and `/24` for each subnet — easy mental math and plenty of room to grow.

## Quick Reference: Common Subnet Table

| Prefix | Subnet Mask       | Hosts    | Use Case              |
|--------|-------------------|----------|-----------------------|
| /8     | 255.0.0.0         | 16,777,214 | Large private cloud |
| /16    | 255.255.0.0       | 65,534   | VPC / large LAN       |
| /24    | 255.255.255.0     | 254      | Standard office LAN   |
| /25    | 255.255.255.128   | 126      | Medium segment        |
| /26    | 255.255.255.192   | 62       | Small segment         |
| /27    | 255.255.255.224   | 30       | IoT / device group    |
| /28    | 255.255.255.240   | 14       | Small office          |
| /30    | 255.255.255.252   | 2        | Point-to-point link   |
| /32    | 255.255.255.255   | 1        | Host route            |

## Quick Tool

Use **[DevToolBox IP Calculator](https://viadreams.cc/en/tools/ip-calculator)** — calculate subnet ranges, broadcast addresses, and CIDR instantly.

---

*Calculate subnets with [DevToolBox's free IP Calculator](https://viadreams.cc/en/tools/ip-calculator).*
