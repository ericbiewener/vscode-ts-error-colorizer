type Foo = { foo: number }
type Bar = { bar: number }

declare function go(foo: Foo)
declare const bar: Bar

go(bar)
