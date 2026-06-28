
{
  "entities": {
    "Subscriber": {
      "title": "Subscriber",
      "description": "A user who has subscribed to the CPRA newsletter. Data is sensitive and should only be readable by administrators.",
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "description": "The email address of the subscriber."
        },
        "subscribedAt": {
          "type": "string",
          "format": "date-time",
          "description": "The timestamp when the user subscribed."
        }
      },
      "required": ["email", "subscribedAt"]
    },
    "ContactMessage": {
      "title": "ContactMessage",
      "description": "A message sent from the contact form. These are private communications intended for CPRA staff eyes only.",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The full name of the sender."
        },
        "email": {
          "type": "string",
          "format": "email",
          "description": "The email address of the sender."
        },
        "subject": {
          "type": "string",
          "description": "The subject of the message."
        },
        "message": {
          "type": "string",
          "description": "The content of the message."
        },
        "sentAt": {
          "type": "string",
          "format": "date-time",
          "description": "The timestamp when the message was sent."
        }
      },
      "required": ["name", "email", "subject", "message", "sentAt"]
    }
  },
  "auth": {
    "providers": ["google"]
  },
  "firestore": {
    "/newsletter_subscribers/{subscriberId}": {
      "schema": "Subscriber",
      "description": "Collection of newsletter subscribers. Write: Public, Read: Authorized Admin Staff."
    },
    "/contact_messages/{messageId}": {
      "schema": "ContactMessage",
      "description": "Collection of messages sent via the contact form. Write: Public, Read: Authorized Admin Staff."
    }
  }
}
