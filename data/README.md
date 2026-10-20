# Understanding events.json

This JSON array contains event objects with these fields:

| Field | Meaning |
| --- | --- |
| `id` | Unique positive integer used in URLs such as `/api/events/1` |
| `title` | Event name |
| `category` | Group used for filtering and category counts |
| `date` | Human-readable schedule string, not a parsed date |
| `location` | Event venue |
| `capacity` | Total seats |
| `registered` | Seats already taken |
| `organizer` | Hosting club or department |

The service adds `seatsLeft = capacity - registered` to responses without modifying
this file. Event 1 has `30 - 24 = 6` seats left; event 4 is full and has zero.
Restart after editing the data because it loads once at startup. Comments cannot
be placed inside JSON, so the field explanations live in this companion file.
