# Pets

This document outlines a draft specification for interoperable pets in virtual worlds.

## Overview

The goal of this specification is to provide enough information about a pet, while still affording platforms a high degree of flexibility in how they operate in their virtual worlds.

This document aims to follow in the success of VRM avatars, which provides a well defined avatar specification that still allows platforms to differentiate, innovate and express themselves independently.

> It has been observed that the key to profound interoperability is to formalize the essence of an object, without going off the rails. It would be futile to have many identical platforms with zero differentiation.
>
> Ashxn

## JSON

A pet file is written in json and describes the behavior of a unique pet that can be used within a virtual world that supports them.

To aid platforms in determining what a file is before loading it, a pet file must be named with the double extension `.pet.json`, for example `tubby.pet.json`.

Using JSON allows for maximum portability. Platforms can choose exactly how they accept a pet file into their engine, eg:-

- Drag & Drop
- File Pickers
- NFT Metadata

## Example

The following is an example pet file:

```json
{
  "spec": "M3_pet",
  "version": [1, 0, 0],
  "name": "Doggo",
  "description": "A little purple doggo",
  "model": "https://domain.com/doggo.glb",
  "scale": 1,
  "idle": {
    "animation": "idle"
  },
  "move": {
    "animation": "run",
    "speed": 3
  },
  "sit": {
    "animation": "sit"
  },
  "action1": {
    "animation": "bark",
    "sound": "https://domain.com/bark.mp3"
  },
  "action2": {
    "animation": "flip",
    "sound": "https://domain.com/flip.mp3"
  }
}
```

## Schema

### .spec

The name of the spec. This should always be `M3_pet`.

### .version

The version of the pet spec being used.

### .name

A short name of the pet.

### .description (optional)

A description of the pet.

### .model

A fully qualified URL to a gltf-binary file with the extension `.glb`.

Note: IPFS is not currently supported, but may be added in a future version.

### .scale (optional)

An integer scale to be applied to the model.

Note: It's recommended to scale your model to real-world units instead.

### .idle

Describes the idle state of the pet, eg standing and looking around.

`.idle.animation`: The name of the idle animation included in the model.

### .move

Describes the moving state of the pet, eg walking, running or flying.

`.move.animation`: The name of the move animation included in the model.

`.move.speed`: The speed that the pet should move, in meters per second.

### .sit (optional)

Describes the sitting state of the pet, eg sitting or lying down.

`.sit.animation`: The name of the sit animation included in the model.

If this field is not defined, platforms will ignore all sitting functionality.

### .action{n} (optional)

Describes one or more action states of the pet, eg barking or doing a backflip.

Platforms will generally pick one of these at random to execute, eg when interacting with the pet or on a timer.

`.action{n}.animation`: The name of the animation included in the model.

`.action{n}.sound`: (optional) A fully qualified URL to an MP3 sound file to play.

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
