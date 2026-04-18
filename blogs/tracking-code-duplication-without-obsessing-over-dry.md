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

Over time, I started to think DRY is often over-applied, especially at the architectural level.
It works great for simple utilities, but once you start forcing it into evolving parts of a system, it can make things worse.

Duplication isn’t always the problem. Premature abstraction is.

When you duplicate code during early development, you're often still figuring things out. Forcing an abstraction too soon means you’re guessing what the common pattern should be and that guess is often wrong. You end up with brittle, confusing structures that need to be undone later.

So instead of aggressively removing duplication, I started doing something simpler: **I track it**.

## Why I Stopped Fighting Duplication

### The Rule of Three

There's a simple idea in software design that changed how I write code: **the rule of three**.

If you see something twice, leave it alone. When you see it a third (or even fourth) time, that’s when you start thinking about abstraction.

As developers, we often assume we know how code will evolve. We design for that imagined future but we’re frequently wrong. Once an abstraction is in place, it becomes harder to change because it carries implicit assumptions about how the system should work.

The rule of three pushes back on this instinct: tolerate some duplication, let patterns emerge naturally, and refactor when the shape of the problem is clearer.

### Abstractions Have Momentum

Here’s the real problem with premature abstraction: **once it exists, it sticks**.

You introduce a helper, a service, or some reusable component because you assume it’ll be needed everywhere. 
Later, someone comes along with a slightly different use case and tries to force it into the existing abstraction—because it’s already there.

So the abstraction grows: more parameters, more conditions, more edge cases.

It becomes harder to understand, harder to change, and ironically, less reusable.

A wrong abstraction doesn’t just sit there—it shapes future code in the wrong direction.


[//]: # (### Wrong Abstractions Increase Cost of Change)

[//]: # ()
[//]: # (A poorly chosen abstraction doesn’t just hurt readability—it increases the cost of every future change.)

[//]: # ()
[//]: # (Every developer who touches that code has to understand it, work around it, and often extend it in ways it wasn’t designed for.)

[//]: # ()
[//]: # (Fixing it later is possible—but it’s rarely trivial.)

### Duplication Helps You See the System More Clearly

At an architectural level, a bit of duplication can actually improve understanding.

It allows patterns to emerge naturally. By the time you’re ready to extract something, you’re no longer guessing—you’re responding to something real.

### Sometimes the Fix Is to Remove the Abstraction

If an abstraction turns out to be wrong, the best move is often to remove it.

Reintroduce the duplication. Let the code breathe again. Then, with better context, decide what the right abstraction should be.

## How I Track Duplication

Instead of removing duplication immediately, I make it visible.

I use **DUP** tags in comments and attach a label to it to mark duplicated logic. In my case I use UUID, so I don't have to think about a name. 
For larger sections, I wrap them in a region-style block with the same identifier.

### Single-line DUP tag
    
```php
public function processPayment(PaymentData $data): void
{
    // DUP: 57518c0e-4457-466e-b379-a56d25c59bb9
    if ($data->amount <= 0 || empty($data->paymentMethod) || !$data->userVerified) {
        throw new Exception('Invalid payment state');
    }

    // ...
}

public function previewPayment(PaymentData $data): array
{
    // DUP: 57518c0e-4457-466e-b379-a56d25c59bb9
    if ($data->amount <= 0 || empty($data->paymentMethod) || !$data->userVerified) {
        throw new Exception('Invalid payment state');
    }

    // ...
}
```
    
### Region-style DUP block
    
The main benefit here is 
[code folding](https://www.jetbrains.com/help/phpstorm/working-with-source-code.html#code_folding), 
plus clearer grouping of duplicated logic inside larger blocks.
    
```php
public function checkout(PaymentData $data): void
{
    // Some other code...

    // region DUP: 119f6849-88b1-48fd-bdb1-1320081e4d2c
    if ($data->amount <= 0) {
        throw new Exception('Invalid amount');
    }

    if (empty($data->paymentMethod)) {
        throw new Exception('Payment method required');
    }

    if (!$data->userVerified) {
        throw new Exception('User not verified');
    }
    // endregion

    // Some other code...
}

public function retryPayment(PaymentData $data): void
{
    // region DUP: 119f6849-88b1-48fd-bdb1-1320081e4d2c
    if ($data->amount <= 0) {
        throw new Exception('Invalid amount');
    }

    if (empty($data->paymentMethod)) {
        throw new Exception('Payment method required');
    }

    if (!$data->userVerified) {
        throw new Exception('User not verified');
    }
    // endregion

    // Some other code...
}
```

If you’re using a JetBrains IDE, you can also use 
[editor-fold](https://www.jetbrains.com/help/phpstorm/code-folding-settings.html#fold-by-default-section:~:text=...%7D%0A%7D-,Custom%20folding%20regions,-Folds%20regions%20that):

```php
public function checkout(PaymentData $data): void
{
    // Some other code...
        
    //<editor-fold desc="DUP: 3b8e1f2a-77d4-4a91-9c2b-123456789abc">
    // ...
    //</editor-fold>
    
     // Some other code...
}
```
    
This gives me a simple way to search, group, and reason about related code without forcing an abstraction too early.

To find duplicates at scale, use your IDE's global search (Cmd+Shift+F on Mac, Ctrl+Shift+F on most others) and search for the UUID. This makes it trivial to jump between all instances of duplicated logic across the codebase.

You can use the [Randomness](https://plugins.jetbrains.com/plugin/9836-randomness) plugin to generate UUIDs directly in the editor.

## Final thoughts

We need to be less afraid of duplication.

I still refactor, but not immediately. I wait until the pattern stabilizes, the duplication becomes painful, and the right abstraction is obvious rather than guessed.

At that point, the abstraction tends to be simpler, more accurate, and easier to maintain.

DRY isn’t wrong, but it’s often applied too early.

Duplication itself isn’t the real problem. Untracked, misunderstood duplication is.

That’s why I prefer a simpler approach: make duplication visible, give it context, and let it evolve before trying to eliminate it.

**Track first. Refactor later.**
