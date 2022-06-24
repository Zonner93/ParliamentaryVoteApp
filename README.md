## Endpoints
---
### Create candidate
#### POST */api/candidates*
#### Request body example:
```json
{
    "politicalGroup": "Paria XYZ",
    "listPosition": 1,
    "firstName": "Jan",
    "lastName": "Kowalskia",
    "personalIdNumber": "123456789"
}
```
---
### Get all candidates
#### GET */api/candidates/all*
---

#### Create candidate
#### POST */api/candidates/{id}*
#### Path variable:
#### {id} - candidate id.

---

### Delete candidate
#### DELETE */api/candidates/{id}*
#### Path variable:
#### {id} - candidate id.
---
