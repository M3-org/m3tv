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

Using JSON allows for maximum portability. Platforms can choose exactly how they accept a pet file into their engine, eg:-

- Drag & Drop
- File Pickers
- NFT Metadata

## Example

The following is an example pet file:

```json
{
  "name": "m3/pet",
  "version": [1, 0, 0],
  "model": "https://domain.com/pet.glb",
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

### .name

The name of the spec. This should always be `m3/pet`.

### .version

The version of the pet spec being used.

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
