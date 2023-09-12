# Pets

This document outlines a draft specification for interoperable pets in virtual worlds.

## Overview

The goal of this specification is to provide enough information about a pet, while still affording platforms a high degree of flexibility in how they operate in their virtual worlds.

This document aims to follow in the success of VRM avatars, which provides a well defined avatar specification that still allows platforms to differentiate, innovate and express themselves independently.

> The key to profound interoperability is to formalize the "essence" of an object, without going off the rails. It would be futile to have many identical platforms with zero differentiation.
> – Ashxn

## JSON

A pet spec is written in json and describes the behavior of a unique pet that can be used within a virtual world that supports them.

When used as a pure json file, it should be named with the double extensions `.pet.json`, for example `tubbycat.pet.json`.

Using JSON allows for maximum portability. Platforms can choose however they wish to accept a pet spec into their engine, eg:-

- By dragging and dropping a `*.pet.json` file or a json string
- By using a file upload button
- By embedding the spec into NFT metadata

## Example

The following is an example pet spec:

```json
{
  "type": "M3_pet",
  "version": [0, 1, 0],
  "name": "Wolf",
  "description": "A little blue wolf",
  "model": "https://domain.com/wolf.glb",
  "speed": 3,
  "near": 1,
  "far": 3,
  "emotes": [
    {
      "name": "Bark",
      "animation": "bark",
      "audio": "https://domain.com/bark.mp3"
    },
    {
      "name": "Flip",
      "animation": "flip",
      "audio": "https://domain.com/flip.mp3"
    }
  ]
}
```

## `type`

The spec that this json adheres to. This should always be `M3_pet`.

## `version`

The version of the pet spec being used.

## `name`

A short name for the pet, eg `Wolf`.

This may be used in UI or as a name tag above the pet in-world.

## `description`

A description of the pet that may be used in UI or when inspecting a pet.

## `model`

A fully qualified URL to a gltf-binary file with the extension `.glb`. IPFS urls are not currently supported, but may be added in a future version.

Models should use a real-world scale, in meters.

The models origin is used as the ground reference for the pet.

Any kind of skeleton and animations supported by GLTF may be used.

The model must include three animations used for different behaviors:

1. An animation named `idle` is used when the pet is idle, eg standing and looking around.
2. An animation named `move` that is used when the pet is moving, eg running.
3. An animation named `stay` that is used when the pet has no objectives or has been ordered to stay, eg sitting.

## `speed`

The speed at which the pet moves. Generally this would be synchronised to match the `move` animation speed.

## `near`

The near distance that the pet should stop at when following a target. This will also vary depending on the size of the pet.

## `far`

The distance that a pets target must move away before the pet begins following it.

## `emotes`

Describes additional, optional, emotes that a pet may express.

Platforms may execute emotes differently, for example on a timer or when interacting with the pet.

Each emote includes:

1. (required) The name of the `animation` to play. The animation is played just once.
2. (optional) The URL of an `audio` clip to play. This must be a fully qualified URL to a `.mp3` file.

## TODOS

- [ ] Skinned meshes are notoriously hard to raycast against, how do we hitbox a pet? Custom mesh embedded?
- [ ] Write some implementation notes, specifically how hyperfy has used this
- [ ] Open source our pet spec validation js method
- [ ] Add some example pets (json + files)
- [ ] Consider something like \*.verse.json as an abstract for all interoperable objects, with the only requirement being `type` and `version` fields. Each spec defines all other fields independently.

---

## FAQ

### Why not use a new file extension like `.pet`?

There are only so many 3 or 4 letter extension combinations that can exist.

By being explicit, a `*.pet.json` file is understood instantly and is a highly portable manifest file for interoperable objects like pets.

### Why not use a GLTF extension?

While GLTF has fast become the most portable way to interoperate 3D models, there are a few reasons why we think its best to use JSON for spec files:

1. It's much easier for developers and creators to write a json file than it is to inject or read a GLB extension. Anyone should be able to create their own pets easily.
2. Platforms should be able to determine support for an object BEFORE downloading all of the assets such as 3D models and audio etc.
3. JSON is universal while GLTF is still maturing. This leaves the spec open to add support for future formats.
4. Not all interoperable objects require 3D models, and 3D models are not always the "main" part of an interoperable object.

### Why are there no skeleton requirements? / Why are animations embedded?

Unlike avatars, pets can vary widely and come in all different shapes and sizes. From a simple rock pet to an eight-legged octopus, each has the ability to have its own personality embedded into the model itself.

### Why can I not control the scale, offset or animation mappings via the json spec?

Clear separation of concerns. The `model` attribute points to a GLB model which defines all information relating to the 3D model itself.

While being able to overwrite these in the spec would be useful, it blurs the lines of responsibility.

Emote animations are a quasi-exception to this rule, since pets can have a variable number of custom animations, they need to be explicitly defined in the spec itself.
