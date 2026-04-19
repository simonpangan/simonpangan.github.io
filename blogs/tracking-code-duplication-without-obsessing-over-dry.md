---
title: Tracking Code Duplication Without Obsessing Over DRY
aside: false
head:
  - - meta
    - name: description
      content: A pragmatic approach to handling code duplication—track it first, refactor later, and avoid premature abstractions.
  - - meta
    - name: keywords
      content: DRY, code duplication, refactoring, software design, clean code, PHP, Laravel.
  - - meta
    - property: og:title
      content: Tracking Code Duplication Without Obsessing Over DRY
  - - meta
    - property: og:description
      content: A practical approach to managing duplication without premature abstraction.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:card
      content: summary
---
# Tracking Code Duplication Without Obsessing Over DRY

Published on: April 19, 2026

<hr class="mb-0"/>
<br />

I used to follow the DRY principle pretty strictly. If I saw duplication, I removed it immediately.

I don’t do that anymore.

Over time, I realized DRY is often over-applied especially in architecture. 
It works well for stable utilities, but forcing it into fast-evolving parts of a system can make code harder to change.

Duplication isn’t always the problem. Premature abstraction is.

So instead of aggressively removing duplication, I started doing something simpler: **I track it**.


## Why I Stopped Fighting Duplication


### Duplication Helps You See the System More Clearly

At an architectural level, a bit of duplication can actually improve understanding.

There's a simple idea in software design that changed how I write code: **the rule of three**.

If you see something twice, leave it alone. When you see it a third (or even fourth) time, that’s when you start thinking about abstraction.

As developers, we often assume we know how code will evolve. 
We design for that imagined future but sometimes that code isn't needed. 
Once an abstraction is in place, it becomes harder to change because we assume that's how it will be used. 
Additionally, many programmers don't stay in a codebase long enough to see it evolve.

The rule of three pushes back on this instinct: tolerate some duplication, let patterns emerge naturally, and **refactor when the shape of the problem is clearer**.

### Abstractions Have Momentum

Here’s the real problem with premature abstraction: **once it exists, it sticks**.

You introduce a helper, a service, or some reusable component because you assume it’ll be needed everywhere. 
Later, someone comes along with a slightly different use case and tries to force it into the existing abstraction—because it’s already there.

So the abstraction grows: more parameters, more conditions, more edge cases.

It becomes harder to understand, harder to change, and ironically, less reusable.

A wrong abstraction doesn’t just sit there—it shapes future code in the wrong direction.


### Sometimes the Fix Is to Remove the Abstraction

If an abstraction turns out to be wrong, the best move is often to remove it. Reintroduce the duplication. 
Let the code breathe again. Then, with better context, decide what the right abstraction should be.

## How I Track Duplication

Instead of removing duplication immediately, I make it visible.

I mark duplicated logic with a `DUP` comment and a UUID. 
UUIDs keep identifiers unique without forcing me to invent names.
For larger sections, I wrap them in a region-style block with the same identifier.

### Single-line DUP tag
    
```php

//ActivityLogResource.php
public function toArray(Request $request): array
{
    //DUP: 2bc036c1-c80a-49d5-8a90-85850993cb9d
    return [
        'id' => $this->id,
        'name' => $this->module_label,
        'event' => $this->event_label,
        'description' => $this->short_description,
        'user' => $this->when(
            LogCauser::AUTHENTICATED_USER->equals($this->causer_type),
            new UserLogResource($this->whenLoaded('causer'))
        ),
        'agent' => $this->agent(),
        'created_at' => $this->created_at->format('d M Y H:i:s'),
    ];
}

//ActivityLogNotification.php
private function payload(): array
{
    //DUP: 2bc036c1-c80a-49d5-8a90-85850993cb9d
    return [
        'id' => $this->activityLog->id,
        'module' => $this->activityLog->module_label,
        'event' => $this->activityLog->event_label,
        'description' => $this->activityLog->description,
        'user' => LogCauser::AUTHENTICATED_USER->equals($this->activityLog->causer_type)
            ? $this->user($this->activityLog->causer)
            : null,
        'agent' => $this->agent(),
        'created_at' => $this->activityLog->created_at->format('d M Y H:i:s'),
    ];
}
```
    
### Region-style DUP block
    
The main benefit here is 
[code folding](https://www.jetbrains.com/help/phpstorm/working-with-source-code.html#code_folding), 
plus clearer grouping of duplicated logic inside larger blocks.
    
```php

//PublishedPostsController.php
public function index(): JsonResponse
{
    // Some other code...

    // region DUP: 119f6849-88b1-48fd-bdb1-1320081e4d2c
    $posts = Post::query()
        ->where('status', 'published')
        ->latest()
        ->paginate(10);
    // endregion

    // Some other code...
}

//AnotherController.php
public function index(): JsonResponse
{
    // region DUP: 119f6849-88b1-48fd-bdb1-1320081e4d2c
    $posts = Post::query()
        ->where('status', 'published')
        ->latest()
        ->paginate(10);
    // endregion

    // Some other code...
}
```

If you’re using a JetBrains IDE, you can also use 
[editor-fold](https://www.jetbrains.com/help/phpstorm/code-folding-settings.html#fold-by-default-section:~:text=...%7D%0A%7D-,Custom%20folding%20regions,-Folds%20regions%20that):

```php
public function index(): JsonResponse
{
    // Some other code...
        
    //<editor-fold desc="DUP: 3b8e1f2a-77d4-4a91-9c2b-123456789abc">
    // ...
    //</editor-fold>
    
     // Some other code...
}
```

This gives me a simple way to search, group, and reason about related code without forcing an abstraction too early. 
To find duplicates at scale, use your IDE's global search (Cmd+Shift+F on Mac, Ctrl+Shift+F on most others) and search for the UUID.

If you use JetBrains IDEs, the [Randomness](https://plugins.jetbrains.com/plugin/9836-randomness) plugin can generate UUIDs directly in the editor. Use an equivalent extension in other editors.

## Final thoughts

We need to be less afraid of duplication.

I still refactor, but not immediately. 
I wait until the pattern stabilizes, the duplication becomes painful, and the right abstraction is obvious rather than guessed. 
At that point, the abstraction tends to be simpler, more accurate, and easier to maintain.
Until then, I make duplication visible, give it context, and let it evolve.

Of course, I do make exceptions for cases such as security, compliance-critical logic, and other areas where I feel duplication shouldn’t remain for long.

But for most code, patience leads to better abstractions.

**Track first. Refactor later.**
