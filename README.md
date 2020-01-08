# APITown

Simple OpenAPI Viewer trying to love the WEB a little bit more.

Focussing on a resource-centric visualisation the viewer allows to link directly to resources.
It optionally interprets additional API extensions and uses them to bring your API closer
to a documentation for your REST API.

Implemented for OpenAPI 3

## Usage

```
npm install apitown
npx apitown --serve ./example-specs/:/example-specs --serve ./some-other-specs/:/other-specs  --port 5002
```

Go to the served APITown instance and provide a path to an OpenAPI spec

```
open http://localhost:5002/example-specs/petstore-example.3.0.json
```

## CLI Options

* `--port`, `-p` : port of the serving application
* `--serve` : provided in the format of `fileOrFolder:mountPath`. A static folder or file will be served at `mountPath`. Multiple folders can be served by providing multiple occurances of `--serve`.

## Features

* Grouping the API Documentation by Resources (OpenAPI paths)
* Dereferencing also deep nested OpenAPI Documents with support for relative and absolute Specification Documents. (Using https://github.com/mechanoid/skeme)
* Adding some Open API Extensions to help documenting REST API


## API extensions

### Resource Id

As in Open API is more centred about Operations, a path has sadly no real Id apart from the path itself.
In many API documentation styles and hypermedia approaches you have a Link Relation describing a resource.
APITown provides additionally a Resource Name, that is used to give a resource a natural language name.

The Id of a Resource is build from Link Relation, if given, Resource-Name if no Link Relation is given, and in case
both is missing, from the path.

The Resource Id can be used to target a resource via adding the [Resource Id](#resource-id) as Anchor to the Viewer URL.

```
http://localhost:5002/?spec=example-specs/petstore-example.3.0.json#{resource-id} // provided APITown runs on localhost
```


In general it is recommended to use a technical Link Relation as Identifier.

### New Properties

#### `x-link-rel`

A property extension to a [Path Item Object](http://spec.openapis.org/oas/v3.0.2#pathItemObject)
Assign a link-relation to this resource. This property is used as primary Resource Id if given.

#### `x-link-rel-aliases`

A property extension to a [Path Item Object](http://spec.openapis.org/oas/v3.0.2#pathItemObject)
possibility to show different Link Relations pointing to the same Resource.

(Not yet implemented)

#### `x-resource-name`

A property extension to a [Path Item Object](http://spec.openapis.org/oas/v3.0.2#pathItemObject)
Adds a natural Language Name for a Resource. This is used e.g. in Headlines or in the Navigation



## Not (yet) supported OpenAPI Features

* Response Object Links (they are Operation centric and not targeting REST Resources)
