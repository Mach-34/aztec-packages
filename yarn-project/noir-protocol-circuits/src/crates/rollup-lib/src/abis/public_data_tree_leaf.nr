use dep::std::cmp::Eq;
use dep::types::traits::{Empty, Hash};

struct PublicDataTreeLeafPreimage {
    slot : Field,
    value: Field,
    next_slot :Field,
    next_index : u32,
}

impl Empty for PublicDataTreeLeafPreimage {
    fn empty() -> Self {
        Self {
            slot: 0,
            value: 0,
            next_slot: 0,
            next_index: 0,
        }
    }
}

impl Hash for PublicDataTreeLeafPreimage {
    fn hash(self) -> Field {
        if self.is_empty() {
            0
        } else {
            dep::std::hash::pedersen_hash([self.slot, self.value, (self.next_index as Field), self.next_slot])
        }
    }
}

impl PublicDataTreeLeafPreimage {
    pub fn is_empty(self) -> bool {
        (self.slot == 0) & (self.value == 0) & (self.next_slot == 0) & (self.next_index == 0)
    }
}

struct PublicDataTreeLeaf {
    slot: Field,
    value: Field,
}

impl Eq for PublicDataTreeLeaf {
    fn eq(self, other: Self) -> bool {
        (self.slot == other.slot) & (self.value == other.value)
    }
}

impl Empty for PublicDataTreeLeaf  {    
    fn empty() -> Self {
        Self {
            slot: 0,
            value: 0,
        }
    }
}

impl PublicDataTreeLeaf {
    pub fn is_empty(self) -> bool {
        (self.slot == 0) & (self.value == 0)
    }
}
