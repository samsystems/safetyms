export const RankSchema = {
  "title": "Rank schema",
  "version": 0,
  "description": "describes a simple RANk",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "primary": true
    },
    "name": {
      "type": "string"
    }
  },
  "required": ["name"]
};