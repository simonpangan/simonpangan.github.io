---
title: A Simple Naming Convention for Nested Eloquent Closures
aside: false
head:
  - - meta
    - name: description
      content: A simple naming convention that improves readability of deeply nested Laravel Eloquent and Query Builder closures using short, incremental variable names.
  - - meta
    - name: keywords
      content: Laravel, Eloquent, Query Builder, PHP, whereHas, nested closures, clean code, readability, naming conventions
  - - meta
    - property: og:title
      content: A Simple Naming Convention for Nested Eloquent Closures
  - - meta
    - property: og:description
      content: Improve readability in complex Laravel Eloquent queries by using short, incremental variable names for nested closures.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:card
      content: summary
---
# A Simple Naming Convention for Nested Eloquent Closures

<br />

If you use Laravel, chances are you work with Eloquent and the Query Builder a lot. As queries grow more complex, especially with nested closures like `whereHas`, readability can quickly become a problem. While working on a large Laravel codebase, I started experimenting with a small naming convention that made deeply nested queries much easier to reason about.

## The Idea

Instead of reusing the same variable name (commonly `$query`) at every nesting level, or prefixing variables based on the relationship or purpose (like `$roleQuery`), I use **short, distinct variable names** where each deeper level simply adds another letter:

```php
$q->whereHas('role', function (Builder $qq) {
    $qq->where('code', Role::SUPER_ADMIN);
});
```

This creates an immediate visual cue for how deep you are in the query structure.

## Why This Helps

- **Clear scope separation** – It’s immediately obvious which query belongs to which nesting level.
- **Lower cognitive load** – No need to mentally track whether  `$query`  refers to the parent or the current closure.
- **Better visual scanning** – The structure of the query becomes easier to follow when scrolling.
- **Less noise** – Shorter variable names reduce clutter while keeping intent clear.

This small convention becomes especially valuable in large codebases where queries are revisited and modified over time.

## **Real-World Example**

Here’s a real example from my current project that uses this naming convention in a deeply nested query:

```php
private function getUsersToNotify(): Collection
{
    return User::query()
        ->select('id')
        ->where('status', true)
        ->whereKeyNot($this->causer->id)
        ->where(function (Builder $q) {
            $q->whereHas('role', function (Builder $qq) {
                $qq->where('code', Role::SUPER_ADMIN);
            });

            $q->orWhere(function (Builder $qq) {
                $qq->where(function (Builder $qqq) {
                    $this->filterByCauserCompanies($qqq);
                });
                $qq->whereHas('role', function (Builder $qqq) {
                    $qqq->whereIn('code', [
                        Role::DIRECTOR,
                        Role::GENERAL_MANAGER,
                        Role::MANAGER,
                        Role::SUPERINTENDENT,
                        Role::OFFICE_STAFF,
                        Role::OFFICE_SUPERUSER,
                    ]);
                });
            });
        })
        ->get();
}
```

In practice, this version is much easier to read and reason about—especially when coming back to it weeks or months later.

## Final Thoughts

This convention may not be for everyone, and that’s perfectly fine. What matters most is choosing an approach that improves clarity and consistency for you and your team. Personally, I’ve found that using short, incremental variable names is a **small tweak with a big impact**—making deeply nested Eloquent queries easier to read, scan, and maintain over time. Even minor naming adjustments like this can save you a lot of mental overhead when revisiting complex logic later.
