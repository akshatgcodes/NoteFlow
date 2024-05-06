---
title: Binary Search Notes
slug: binary-search-notes
created: 2026-09-15T20:16:17
tags: DSA, Python
---

# Binary Search

Binary search is a classic algorithm for finding an item in a sorted array
in O(log n) time complexity. It works by repeatedly halving the search
range.

## Data Structure

Works on any sorted **data structure** that supports random access, such
as an array.

```python
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

This is a common warm-up problem on leetcode and a good example of
recursion vs. iteration tradeoffs.
