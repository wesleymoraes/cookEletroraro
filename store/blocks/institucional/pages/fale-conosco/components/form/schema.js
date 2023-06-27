fetch("/api/dataentities/faleconosco[INSERT-DATA]/schemas/faleconosco[INSERT-DATA]", {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    title: "Fale Conosco",
    type: "object",
    properties: {
      name: {
        type: "string",
        title: "Nome",
      },
      email: {
        type: "string",
        format: "email",
        title: "E-mail",
      },
      telephone: {
        type: "string",
        format: "telephone",
        title: "Telefone",
        description: "(22) 01234-5555",
      },
      message: {
        type: "string",
        title: "Mensagem",
      },
    },
    required: ["name", "email", "telephone", "message"],
    "v-indexed": ["name", "email"],
    "v-security": {
      publicJsonSchema: true,
      allowGetAll: true,
      publicRead: ["name", "email", "telephone", "subject", "message"],
      publicWrite: ["name", "email", "telephone", "subject", "message"],
      publicFilter: ["name", "email", "telephone", "subject", "message"],
    },
    "v-triggers": [
      {
        name: "send-email",
        active: true,
        condition: "email is not null",
        action: {
          type: "email",
          provider: "default",
          subject: "{!subject}",
          to: [
            "[INSERT-DATA]"
          ],
          replyTo: "{!email}",
          body: "email:{!email} <br/> nome:{!name} <br/>Telefone:{!telephone}<br/> Mensagem:{!message}",
        },
      },
    ],
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
