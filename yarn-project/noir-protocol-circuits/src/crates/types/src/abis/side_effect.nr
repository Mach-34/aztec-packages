use crate::constants::{GENERATOR_INDEX__SIDE_EFFECT};
use dep::std::cmp::Eq;
use crate::traits::{Empty, Hash};

trait Ordered {
    fn counter(self) -> u32;
}

struct SideEffect{
    value: Field,
    counter: u32,
}

impl Ordered for SideEffect {
    fn counter(self) -> u32 {
        self.counter
    }
}

impl Eq for SideEffect {
    fn eq(self, side_effect: SideEffect) -> bool {
        (self.value == side_effect.value)
        & (self.counter == side_effect.counter)
    }
}

impl Empty for SideEffect {
    fn empty() -> Self {
        SideEffect {
            value: 0,
            counter: 0,
        }
    }
}

impl Hash for SideEffect {
    fn hash(self) -> Field {
        dep::std::hash::pedersen_hash_with_separator(
            self.serialize() , GENERATOR_INDEX__SIDE_EFFECT)
    }
}

impl SideEffect {
    pub fn serialize(self) -> [Field; 2] {
        [self.value, self.counter as Field]
    }

    pub fn deserialise(values: [Field; 2]) -> Self {
        Self {
            value: values[0],
            counter: values[1] as u32,
        }
    }

    pub fn is_empty(self) -> bool {
        (self.value == 0)
        & (self.counter == 0)
    }
}

struct SideEffectLinkedToNoteHash{
    value: Field,
    note_hash: Field,
    counter: u32,
}

impl Ordered for SideEffectLinkedToNoteHash {
    fn counter(self) -> u32 {
        self.counter
    }
}

impl Eq for SideEffectLinkedToNoteHash {
    fn eq(self, side_effect: SideEffectLinkedToNoteHash) -> bool {
        (self.value == side_effect.value)
            & (self.note_hash == side_effect.note_hash) 
            & (self.counter == side_effect.counter)
    }
}

impl Empty for SideEffectLinkedToNoteHash {
    fn empty() -> Self {
        SideEffectLinkedToNoteHash {
            value: 0,
            note_hash: 0,
            counter: 0,
        }
    }
}

impl Hash for SideEffectLinkedToNoteHash {
    fn hash(self) -> Field {
        dep::std::hash::pedersen_hash_with_separator(
            self.serialize(),
        GENERATOR_INDEX__SIDE_EFFECT)
    }
}

impl SideEffectLinkedToNoteHash{
    pub fn serialize(self) -> [Field; 3] {
        [self.value, self.note_hash, self.counter as Field]
    }

    pub fn deserialise(values: [Field; 3]) -> Self {
        Self {
            value: values[0],
            note_hash: values[1],
            counter: values[2] as u32,
        }
    }

    pub fn is_empty(self) -> bool {
        (self.value == 0)
        &  (self.note_hash == 0)
        & (self.counter == 0)
    }
}

