
fn main() {
    let xs: [Field; 1] = [3];
    let ys: [u32; 1] = [3];
    foo(xs, ys);

    assert_eq(15, sum(Data { a: 5, b: 10 }));
    assert_eq(15, sum_static(Data { a: 5, b: 10 }));
}

fn foo<T, U>(x: T, u: U) where T: Into<U>, U: Eq {
    assert(x.into() == u);
}

trait Into<T> {
    fn into(self) -> T;
}

impl<T, U, N> Into<[U; N]> for [T; N] where T: Into<U> {
    fn into(self) -> [U; N] {
        self.map(|x: T| x.into())
    }
}

impl Into<u32> for Field {
    fn into(self) -> u32 {
        self as u32
    }
}

/// Serialize example

trait Serializable<N> {
    fn serialize(self) -> [Field; N];
}

struct Data {
    a: Field,
    b: Field,
}

impl Serializable<2> for Data {
    fn serialize(self) -> [Field; 2] {
        [self.a, self.b]
    }
}

fn sum<T, M>(data: T) -> Field where T: Serializable<M> {
    let serialized = data.serialize();
    serialized.fold(0, |acc, elem| acc + elem)
}

// Test static trait method syntax
fn sum_static<T, M>(data: T) -> Field where T: Serializable<M> {
    let serialized = Serializable::serialize(data);
    serialized.fold(0, |acc, elem| acc + elem)
}
