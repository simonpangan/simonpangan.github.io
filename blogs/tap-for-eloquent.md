---
title: Organizing large Laravel queries with tap()
aside: false
head:
  - - meta
    - name: description
      content: A simple way to organize large Laravel queries by using tap() to group relationships, joins, and filters into clear sections.
  - - meta
    - name: keywords
      content: Laravel, Eloquent, Query Builder, PHP, tap, clean code, readability
  - - meta
    - property: og:title
      content: Organizing large Laravel queries with tap()
  - - meta
    - property: og:description
      content: A simple way to organize large Laravel queries by using tap() to group relationships, joins, and filters into clear sections.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:card
      content: summary
---

# Organizing large Laravel queries with tap()

Published on: July 18, 2026

<hr class="mb-0"/>
<br />

Large Laravel queries can become difficult to read. As the query grows, it is common to have relationships, 
joins, filters, and other conditions all mixed together in one method. 
Eventually, the query becomes difficult to scan and understand.

There are many ways to organize a large Laravel query.
You could extract parts of the query into reusable local scopes, 
create reusable query components, or move the query into a dedicated query class or repository.

These approaches can all be useful depending on the situation.
But sometimes, you don't need another abstraction. 
Sometimes, you simply want to keep the query together while making the code easier to read.

This is where Laravel's `tap()` method can be useful as a way 
to group related query modifications without breaking the fluent chain.

## The Idea

Laravel's `tap()` method lets you pass the current query builder to a closure, 
perform additional operations on it, 
and then continue chaining on the same builder.

For example:
```php
private function get(): Collection
{
    return Crew::query()
        ->where('active', true)
        ->tap(function (Builder $q) {
            $this->filters($q);
            $this->joins($q);
        })
        ->get();
}

private function filters(Builder $q): void
{
    if (/* ... */) {
        $q->whereNull('deleted_at');
    }
    
    //...
}

private function filters(Builder $q): void
{
    //...
}
```

The query is still built using the same query builder instance and remains part of the same fluent chain.
`tap()` gives us a place to group additional query modifications without interrupting the chain.

This becomes useful when the query gets larger.

## Real-World Example

Here is an example from a real project.

Instead of putting relationships, joins, and filters directly inside the main method, 
I use `tap()` to group eager loading, joins, and filters:
 
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
        ->tap(function (Builder $q) {
            $this->withRelationships($q);
            $this->joins($q);
            $this->filters($q);
        })
        ->orderByRaw('
            crews.last_name, 
            crews.first_name, 
            crews.middle_name
        ')
        ->get();
}
```
The `get()` method is now easier to read because the implementation details are moved into separate methods.

Those methods contain the actual query logic:
    
```php
private function withRelationships(Builder $q): void
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

All of these methods still modify the same query builder. 
The `tap()` simply gives us a clean place to organize these sections:

```php
->tap(function (Builder $q) {
    $this->withRelationships($q);
    $this->joins($q);
    $this->filters($q);
})
```

## Final Thoughts

There are many ways to organize large Laravel queries, and `tap()` is just one of them.

You don't always need another abstraction to organize a large query. 
Sometimes, you can keep the query together and use `tap()` to group its different parts.

The main query stays easy to read, while the more complicated relationships, joins, and filters are moved into their own methods.

For me, that's the main value of this pattern. The query remains one query, but the code becomes easier to read and maintain.