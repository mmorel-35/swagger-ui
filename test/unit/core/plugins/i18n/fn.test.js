import { translate } from "core/plugins/i18n/fn"

describe("i18n fn - translate", () => {
  const enMessages = {
    "button.cancel": "Cancel",
    "button.execute": "Execute",
    "errors.jump_to_line": "Jump to line {{line}}",
    "label.name": "Name",
  }

  describe("key lookup", () => {
    it("returns the locale message when key exists in locale messages", () => {
      const frMessages = { "button.cancel": "Annuler" }
      expect(translate(frMessages, enMessages, "button.cancel")).toBe("Annuler")
    })

    it("falls back to english messages when key is missing from locale messages", () => {
      const frMessages = {}
      expect(translate(frMessages, enMessages, "button.cancel")).toBe("Cancel")
    })

    it("returns the raw key when key is missing from both locale and fallback messages", () => {
      expect(translate({}, {}, "unknown.key")).toBe("unknown.key")
    })

    it("handles null localeMsgs gracefully by falling back to english", () => {
      expect(translate(null, enMessages, "button.cancel")).toBe("Cancel")
    })

    it("handles undefined localeMsgs gracefully by falling back to english", () => {
      expect(translate(undefined, enMessages, "button.cancel")).toBe("Cancel")
    })

    it("handles null fallbackMsgs gracefully by returning the key", () => {
      expect(translate(null, null, "button.cancel")).toBe("button.cancel")
    })
  })

  describe("variable interpolation", () => {
    it("interpolates {{varName}} placeholders with vars", () => {
      const result = translate(enMessages, enMessages, "errors.jump_to_line", { line: 42 })
      expect(result).toBe("Jump to line 42")
    })

    it("converts var values to strings", () => {
      const msgs = { "msg": "Value is {{val}}" }
      expect(translate(msgs, msgs, "msg", { val: 123 })).toBe("Value is 123")
    })

    it("leaves unknown placeholders as-is", () => {
      const msgs = { "msg": "Hello {{name}} and {{other}}" }
      expect(translate(msgs, msgs, "msg", { name: "World" })).toBe(
        "Hello World and {{other}}"
      )
    })

    it("returns the message unchanged when vars is not provided", () => {
      const result = translate(enMessages, enMessages, "button.cancel")
      expect(result).toBe("Cancel")
    })

    it("returns the message unchanged when vars is null", () => {
      const result = translate(enMessages, enMessages, "button.cancel", null)
      expect(result).toBe("Cancel")
    })
  })

  describe("locale override", () => {
    it("uses locale message over fallback when both have the key", () => {
      const deMessages = { "button.cancel": "Abbrechen" }
      expect(translate(deMessages, enMessages, "button.cancel")).toBe("Abbrechen")
    })

    it("uses english fallback for keys missing in locale", () => {
      const deMessages = { "button.cancel": "Abbrechen" }
      expect(translate(deMessages, enMessages, "button.execute")).toBe("Execute")
    })
  })
})
