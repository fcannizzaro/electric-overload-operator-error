# electric-overload-operator-error

## Setup

```bash
docker compose up -d
bun i
bun push
bun run src/randomize-data.ts
bun dev
```

## Error

```json
{
    "message": "Invalid request",
    "errors": {
        "subset": {
            "where": [
                "At location 12: Could not select an operator overload"
            ]
        }
    }
}    
```
