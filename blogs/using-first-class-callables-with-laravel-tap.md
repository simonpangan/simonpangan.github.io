---
title: Using first-class callables with Laravel's `tap()`
aside: false
head:
  - - meta
    - name: description
      content: Use PHP's first-class callable syntax with Laravel's tap() to make large Eloquent queries cleaner and easier to read.
  - - meta
    - name: keywords
      content: Laravel, Eloquent, Query Builder, PHP, tap, first-class callables, clean code, readability
  - - meta
    - property: og:title
      content: Using first-class callables with Laravel's tap()
  - - meta
    - property: og:description
      content: Use PHP's first-class callable syntax with Laravel's tap() to make large Eloquent queries cleaner and easier to read.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:card
      content: summary
---

# Using first-class callables with Laravel's `tap()`

Published on: August 23, 2026

<hr class="mb-0"/>
<br />

A while back, I wrote about [using `tap()` to organize large Laravel queries](/blogs/organizing-large-laravel-queries-with-tap).
The idea was simple: instead of mixing relationships, joins, and filters into one big query method,
use `tap()` to group them into separate, well-named methods without breaking the fluent chain.

Since then, I found a small variation worth sharing: passing methods to `tap()` using PHP's
first-class callable syntax instead of wrapping them in a closure.

## A quick recap

In the original approach, `tap()` took a closure, and the closure called out to other methods:

```php
->tap(function (Builder $q) {
    $this->joins($q);
    $this->filters($q);
})
```

This works well and is still a perfectly good way to do it, especially when you want to group
several method calls into a single `tap()`.

## Using first-class callable syntax

PHP 8.1 introduced [first-class callable syntax](https://www.php.net/manual/en/functions.first_class_callable_syntax.php),
which lets you reference a method as a callable using `(...)`, without wrapping it in a closure.

Since `tap()` just needs a callable, this means you can pass the method directly:

```php
public function get(): Collection
{
    return Crew::query()
        ->select($this->select())
        ->where(function (Builder $q) {
            $q->active()
                ->alive()
                ->noWithdrawal();
        })
        ->tap($this->relationships(...))
        ->tap($this->joins(...))
        ->tap($this->filters(...))
        ->orderByRaw('
            crews.last_name, 
            crews.first_name, 
            crews.middle_name
        ')
        ->get();
}

private function relationships(Builder $q): void
{
    $q->with([
        'rank:id,alias',
        //...
    ]);
}

private function joins(Builder $q): void
{
    $q->join('crew_addresses', function (JoinClause $qq) {
        $qq->on('crew_addresses.crew_id', '=', 'crews.id');
        //...
    });
    
    //...
}

private function filters(Builder $q): void
{
    if ($this->filters->has('region_id')) {
        $q->where('crew_addresses.region_id', $this->filters->get('region_id'));
    }
    
    //...
}
```

No closure, no extra indentation level, just the method reference itself. `$this->joins(...)` is
shorthand for "give me a callable pointing to this instance's `joins` method," and Laravel's `tap()`
happily accepts it, since it works with any `callable`, not specifically a `Closure`.